const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Base de données simple (en mémoire)
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
];

// Route pour obtenir tous les éléments (Read)
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Route pour obtenir un élément par son ID (Read)
app.get('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(item => item.id === itemId);

  if (!item) {
    return res.status(404).json({ message: 'Élément non trouvé' });
  }

  res.json(item);
});

// Route pour créer un nouvel élément (Create)
app.post('/api/items', (req, res) => {
  const { name } = req.body;
  const newItem = { id: items.length + 1, name };

  items.push(newItem);

  res.status(201).json(newItem);
});

// Route pour mettre à jour un élément par son ID (Update)
app.put('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(item => item.id === itemId);

  if (!item) {
    return res.status(404).json({ message: 'Élément non trouvé' });
  }

  item.name = req.body.name;

  res.json(item);
});

// Route pour mettre à jour partiellement un élément par son ID (Patch)
app.patch('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(item => item.id === itemId);

  if (!item) {
    return res.status(404).json({ message: 'Élément non trouvé' });
  }

  if (req.body.name) {
    item.name = req.body.name;
  }

  res.json(item);
});

// Route pour supprimer un élément par son ID (Delete)
app.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter(item => item.id !== itemId);

  res.json({ message: 'Élément supprimé avec succès' });
});

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
