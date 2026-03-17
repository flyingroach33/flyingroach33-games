import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gamesDir = path.join(__dirname, '../public/games');
const outputFile = path.join(__dirname, '../src/data/games.json');
const publicOutputFile = path.join(__dirname, '../public/games.json');

function extractTitle(file, htmlContent) {
  const base = path.basename(file, path.extname(file));
  
  // Try multiple regex patterns for title/name
  const patterns = [
    /<name[^>]*>([\s\S]*?)<\/name>/i,
    /<title[^>]*>([\s\S]*?)<\/title>/i,
    /<h1[^>]*>([\s\S]*?)<\/h1>/i,
    /productName\s*[:=]\s*["']([^"']+)["']/i,
    /gameName\s*[:=]\s*["']([^"']+)["']/i,
    /appName\s*[:=]\s*["']([^"']+)["']/i,
    /title\s*[:=]\s*["']([^"']+)["']/i
  ];

  let extractedTitle = "";
  for (const pattern of patterns) {
    const match = htmlContent.match(pattern);
    if (match && match[1].trim()) {
      const candidate = match[1].trim();
      const genericNames = [
        "YT Game Wrapper",
        "Unity WebGL Player",
        "GXC Game",
        "Created With GameMaker",
        "Flambe Game",
        "WebGL Template",
        "HTML Games V2"
      ];
      if (!genericNames.some(gn => candidate.includes(gn))) {
        extractedTitle = candidate;
        break;
      }
    }
  }

  if (!extractedTitle || /^\d+$/.test(extractedTitle)) {
    const swfMatch = htmlContent.match(/\/([^/]+)\.swf/i);
    if (swfMatch) {
      extractedTitle = swfMatch[1];
    } else {
      const baseMatch = htmlContent.match(/<base[^>]+href=["'][^"']+\/([^/]+)\/["']/i);
      const ghMatch = htmlContent.match(/cdn\.jsdelivr\.net\/gh\/([^/]+)\/([^/@]+)/i);
      
      if (baseMatch && baseMatch[1] && !/^\d+$/.test(baseMatch[1])) {
        extractedTitle = baseMatch[1];
      } else if (ghMatch && !/^\d+$/.test(ghMatch[2])) {
        extractedTitle = ghMatch[2];
      }
    }
  }

  let finalTitle = "";
  if (extractedTitle) {
    finalTitle = decodeURIComponent(extractedTitle)
      .replace(/<[^>]*>/g, '')
      .replace(/Unity WebGL Player\s*\|\s*/i, '')
      .replace(/[_-]/g, ' ')
      .replace(/%20/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim();
  }

  // Special case: "2048" is a valid game name
  if (!finalTitle || (/^\d+$/.test(finalTitle) && finalTitle !== "2048") || finalTitle.length < 2) {
    finalTitle = base.split(/[-_]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  if (/^\d+$/.test(finalTitle)) {
    finalTitle = `Game ${finalTitle}`;
  }

  return finalTitle;
}

function generateGamesList() {
  if (!fs.existsSync(gamesDir)) {
    console.log('Games directory not found, creating it...');
    fs.mkdirSync(gamesDir, { recursive: true });
  }

  console.log(`Scanning directory: ${gamesDir}`);
  const files = fs.readdirSync(gamesDir);
  console.log(`Found ${files.length} files in games directory.`);
  const gamesMap = new Map();

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const base = path.basename(file, ext);
    
    if (base.startsWith('.') || base === 'favicon') continue;

    if (!gamesMap.has(base)) {
      gamesMap.set(base, { id: base, title: `Game ${base}`, imageFile: null, htmlFile: null });
    }
    
    const game = gamesMap.get(base);
    
    if (ext === '.html') {
      const htmlContent = fs.readFileSync(path.join(gamesDir, file), 'utf-8');
      game.title = extractTitle(file, htmlContent);
      game.htmlFile = `/games/${file}`;
      console.log(`Registered HTML for game ${base}: ${game.title}`);
    } else if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext)) {
      game.imageFile = `/games/${file}`;
      console.log(`Registered Image for game ${base}: ${game.imageFile}`);
    }
  }

  const games = Array.from(gamesMap.values()).filter(g => {
    if (!g.htmlFile) {
      if (/^\d+$/.test(g.id)) return false;
      if (g.title.startsWith('Game ')) return false;
    }
    return true;
  });

  // Sort games by ID if they are numbers
  games.sort((a, b) => {
    const numA = parseInt(a.id, 10);
    const numB = parseInt(b.id, 10);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }
    return a.id.localeCompare(b.id);
  });

  const dataDir = path.dirname(outputFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(games, null, 2));
  fs.writeFileSync(publicOutputFile, JSON.stringify(games, null, 2));
  console.log(`Generated games.json with ${games.length} games.`);
}

generateGamesList();
