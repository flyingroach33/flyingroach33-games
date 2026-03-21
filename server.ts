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
      console.log('Fetching games from:', gamesPath);
      if (fs.existsSync(gamesPath)) {
        const content = fs.readFileSync(gamesPath, 'utf-8');
        const games = JSON.parse(content);
        console.log(`Found ${games.length} games in games.json`);
        res.json(games);
      } else {
        console.warn('games.json not found at:', gamesPath);
        res.json([]);
      }
    } catch (error) {
      console.error('Error reading games.json:', error);
      res.status(500).json({ error: 'Failed to load games' });
    }
  });

  app.post('/api/v1/submit', express.json(), async (req, res) => {
    const { type, message, senderName } = req.body;
    console.log(`Received ${type} from ${senderName || 'Anonymous'}`);
    
    const FEEDBACK_WEBHOOK = "https://discord.com/api/webhooks/1483271485262139534/eR7uyXr1PaP7fmy9wlPTah3dRF5wfYrkcI5odf5OaHZy6gowxdypUL3PLmHfrYDdwcfj";
    const REQUEST_WEBHOOK = "https://discord.com/api/webhooks/1483271588026781736/FjL-MojzpJGJsNS4wF0fJtlwSKR87xS1-K-LBb8zVTnmngmZ5ZQV0nPrkctszSPc4UNt";
    
    const webhookUrl = type === 'feedback' ? FEEDBACK_WEBHOOK : REQUEST_WEBHOOK;

    try {
      const payload = {
        embeds: [{
          title: type === 'feedback' ? 'New Feedback' : 'New Game Request',
          description: message,
          color: type === 'feedback' ? 0x00ff00 : 0xffa500,
          fields: [
            {
              name: "Sent By",
              value: senderName || "Anonymous",
              inline: true
            }
          ],
          timestamp: new Date().toISOString(),
          footer: { text: 'flyingroach33 games' }
        }]
      };

      const axios = (await import('axios')).default;
      console.log(`Forwarding to Discord webhook...`);
      await axios.post(webhookUrl, payload);
      console.log(`Successfully sent to Discord`);
      res.json({ success: true });
    } catch (error) {
      console.error('Error proxying feedback to Discord:', error);
      res.status(500).json({ error: 'Failed to send feedback' });
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
