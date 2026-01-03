const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // if you use public folder

const API_KEY = 'gifted';

// Search endpoint
app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get(`https://api.giftedtech.co.ke/api/search/yts?apikey=${API_KEY}&query=${encodeURIComponent(query)}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// Download MP3
app.get('/api/download/mp3', async (req, res) => {
  const { url, quality } = req.query;
  try {
    const response = await axios.get(`https://api.giftedtech.co.ke/api/download/ytmp3?apikey=${API_KEY}&url=${encodeURIComponent(url)}&quality=${quality}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Download MP3 failed' });
  }
});

// Download MP4
app.get('/api/download/mp4', async (req, res) => {
  const { url, quality } = req.query;
  try {
    const response = await axios.get(`https://api.giftedtech.co.ke/api/download/ytmp4?apikey=${API_KEY}&url=${encodeURIComponent(url)}&quality=${quality}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Download MP4 failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
