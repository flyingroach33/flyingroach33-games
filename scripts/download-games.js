import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gamesDir = path.join(__dirname, '../public/games');

async function downloadFile(url, dest) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
  console.log(`Downloaded ${url} to ${dest}`);
}

async function main() {
  if (!fs.existsSync(gamesDir)) {
    fs.mkdirSync(gamesDir, { recursive: true });
  }

  const repoOwner = 'bubbls';
  const repoName = 'youtube-playables';
  const rawBaseUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main`;
  const metadataUrl = `${rawBaseUrl}/all-playables-formatted.json`;

  console.log('Fetching game metadata...');
  let gamesMetadata = [];
  try {
    const metaResponse = await fetch(metadataUrl);
    if (metaResponse.ok) {
      gamesMetadata = await metaResponse.json();
      console.log(`Loaded metadata for ${gamesMetadata.length} games.`);
      console.log('Sample metadata entry:', JSON.stringify(gamesMetadata[0], null, 2));
    }
  } catch (e) {
    console.error('Failed to load metadata, falling back to directory listing:', e.message);
  }

  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/`;
  console.log('Fetching repository contents...');
  const response = await fetch(apiUrl);
  if (!response.ok) {
    console.error('Failed to fetch repo contents:', response.statusText);
    return;
  }

  const contents = await response.json();
  const directories = contents.filter(item => item.type === 'dir' && !item.name.startsWith('.'));

  console.log(`Found ${directories.length} game directories.`);

  for (const dir of directories) {
    const gameId = dir.name;
    const meta = gamesMetadata.find(m => {
      if (m.id === gameId) return true;
      const slug = m.title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      return slug === gameId;
    });
    
    const htmlUrl = `${rawBaseUrl}/${gameId}/index.html`;
    let thumbUrl = meta?.image_url || meta?.thumbnailUrl || `${rawBaseUrl}/${gameId}/thumbnail.png`;
    
    // If thumbUrl is relative, make it absolute
    if (thumbUrl && !thumbUrl.startsWith('http')) {
      thumbUrl = `${rawBaseUrl}/${gameId}/${thumbUrl}`;
    }

    const htmlDest = path.join(gamesDir, `${gameId}.html`);
    const thumbDest = path.join(gamesDir, `${gameId}.png`);

    try {
      console.log(`Downloading ${gameId}...`);
      await downloadFile(htmlUrl, htmlDest);
      
      if (thumbUrl) {
        try {
          await downloadFile(thumbUrl, thumbDest);
        } catch (e) {
          console.log(`Failed to download thumbnail from ${thumbUrl}, trying fallback...`);
          try {
            await downloadFile(`${rawBaseUrl}/${gameId}/thumbnail.png`, thumbDest);
          } catch (e2) {
            console.log(`No thumbnail found for ${gameId}`);
          }
        }
      }
    } catch (error) {
      console.error(`Error downloading ${gameId}:`, error.message);
    }
  }

  console.log('Download complete.');
}

main().catch(console.error);
