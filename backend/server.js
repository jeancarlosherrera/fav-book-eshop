import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import books from './data/books.js';

dotenv.config();

// MongoDB Connection
connectDB().catch((err) => console.log(err));
async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB Connected');
}

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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} `
  );
});
