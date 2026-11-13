const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Memoria temporal para la lista de reproducción
let playlist = [];

// Ruta para obtener el estado actual de la música
app.get('/api/state', (req, res) => {
  res.json({ playlist });
});

// Ruta para agregar una canción a la cola
app.post('/api/add', (req, res) => {
  const { title, videoId, user } = req.body;
  if (videoId) {
    playlist.push({ title, videoId, user });
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, error: 'Video ID inválido' });
  }
});

// Ruta para pasar al siguiente tema cuando termina
app.post('/api/next', (req, res) => {
  if (playlist.length > 0) {
    playlist.shift(); // Saca la primera canción de la lista
  }
  res.json({ success: true, playlist });
});

app.listen(PORT, () => {
  console.log(`Jukebox andando en puerto ${PORT}`);
});