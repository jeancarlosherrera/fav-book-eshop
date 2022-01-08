import asyncHandler from 'express-async-handler';
import Book from '../models/bookModel.js';

// Get all books - GET /api/books
const getBooks = asyncHandler(async (req, res) => {
  const allBooks = await Book.find({});
  res.json(allBooks);
});

// Get individual book - GET /api/books/:id
const getBookById = asyncHandler(async (req, res) => {
  const selectedBook = await Book.findById(req.params.id);
  if (selectedBook) {
    res.json(selectedBook);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

export { getBooks, getBookById };
