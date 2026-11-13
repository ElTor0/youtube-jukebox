const express = require('express');
const app = express();
const http = require('http').createServer(app);

app.use(express.json());
app.use(express.static('public'));

let playlist = [];
let historial = [];

app.get('/api/state', (req, res) => {
  res.json({ playlist, historial });
});

app.post('/api/add', (req, res) => {
  const { title, videoId, user } = req.body;
  if (!videoId) return res.status(400).json({ error: 'Falta el videoId' });

  const item = { id: Math.random().toString(36).substring(7), title, videoId, user: user || 'Anónimo' };
  playlist.push(item);
  
  res.json({ success: true, playlist });
});

app.post('/api/next', (req, res) => {
  if (playlist.length > 0) {
    const finished = playlist.shift();
    historial.unshift(finished);
    if (historial.length > 10) historial.pop();
  }
  res.json({ success: true, playlist });
});

http.listen(3000, () => {
  console.log('Jukebox corriendo en http://localhost:3000');
});