import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes FIRST
  app.get('/api/games', (req, res) => {
    try {
      const gamesPath = path.join(process.cwd(), 'public/games.json');
      if (fs.existsSync(gamesPath)) {
        const games = JSON.parse(fs.readFileSync(gamesPath, 'utf-8'));
        res.json(games);
      } else {
        res.json([]);
      }
    } catch (error) {
      console.error('Error reading games.json:', error);
      res.status(500).json({ error: 'Failed to load games' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
