const express = require('express');
const books = require('./data/books');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
  const selectedBook = books.find((b) => b._id === req.params.id);
  res.json(selectedBook);
});

app.listen(8080, () => {
  console.log('Listening');
});
