# flyingroach33 games

A clean, brown-themed game website hosting HTML games.

## How to add your games

1. Open the `public/games` directory.
2. Upload your HTML files (e.g., `1.html`, `2.html`, `mygame.html`).
3. Upload your corresponding PNG thumbnails with the same name (e.g., `1.png`, `2.png`, `mygame.png`).
4. The site will automatically detect them and generate the game list when you build or start the development server.

## How to run locally

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. The `prebuild` script will automatically run and generate the `games.json` file based on the contents of the `public/games` directory.

This site is ready to be deployed to Netlify via GitHub. 
When Netlify runs `npm run build`, it will automatically run the `prebuild` script which scans the `public/games` directory and generates the `src/data/games.json` file.

Enjoy your arcade!
