const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const DATA_DIR = path.join(__dirname, 'data');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

async function readJSON(name) {
  try {
    const content = await fs.readFile(path.join(DATA_DIR, name), 'utf8');
    return JSON.parse(content);
  } catch (err) {
    return null;
  }
}

async function writeJSON(name, data) {
  await fs.writeFile(path.join(DATA_DIR, name), JSON.stringify(data, null, 2), 'utf8');
}

app.get('/api/services', async (req, res) => {
  const data = await readJSON('services.json');
  if (!data) return res.status(500).json({ error: 'Data not available' });
  res.json(data);
});

app.get('/api/portfolio', async (req, res) => {
  const data = await readJSON('portfolio.json');
  if (!data) return res.status(500).json({ error: 'Data not available' });
  res.json(data);
});

app.get('/api/team', async (req, res) => {
  const data = await readJSON('team.json');
  if (!data) return res.status(500).json({ error: 'Data not available' });
  res.json(data);
});

app.get('/api/testimonials', async (req, res) => {
  const data = await readJSON('testimonials.json');
  if (!data) return res.status(500).json({ error: 'Data not available' });
  res.json(data);
});

app.get('/api/stats', async (req, res) => {
  const data = await readJSON('stats.json');
  if (!data) return res.status(500).json({ error: 'Data not available' });
  res.json(data);
});

app.post('/api/contact', async (req, res) => {
  const payload = req.body;
  if (!payload || !payload.name || !payload.email || !payload.message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const contacts = (await readJSON('contacts.json')) || [];
  const entry = {
    id: Date.now(),
    name: payload.name,
    email: payload.email,
    company: payload.company || '',
    service: payload.service || '',
    message: payload.message,
    createdAt: new Date().toISOString()
  };
  contacts.push(entry);
  await writeJSON('contacts.json', contacts);
  res.json({ success: true, entry });
});

// Fallback to index.html for SPA navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
