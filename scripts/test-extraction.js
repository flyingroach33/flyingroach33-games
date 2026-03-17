import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gamesDir = path.join(__dirname, '../public/games');

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

  if (extractedTitle) {
    let title = decodeURIComponent(extractedTitle)
      .replace(/<[^>]*>/g, '')
      .replace(/Unity WebGL Player\s*\|\s*/i, '')
      .replace(/[_-]/g, ' ')
      .replace(/%20/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim();
    
    if (/^\d+$/.test(title) || title.length < 2) {
        return null; // Signal failure
    }
    return title;
  }
  return null;
}

const files = fs.readdirSync(gamesDir).filter(f => f.endsWith('.html'));
const results = [];
const failures = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(gamesDir, file), 'utf-8');
  const title = extractTitle(file, content);
  if (title) {
    results.push({ file, title });
  } else {
    failures.push(file);
  }
});

console.log(`Total HTML files: ${files.length}`);
console.log(`Successfully extracted: ${results.length}`);
console.log(`Failed (numeric or empty): ${failures.length}`);
console.log("\nFirst 50 failures:");
console.log(failures.slice(0, 50));
