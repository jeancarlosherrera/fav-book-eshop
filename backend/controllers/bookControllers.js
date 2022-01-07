import asyncHandler from 'express-async-handler';
import Book from '../models/bookModel.js';

const getBooks = asyncHandler(async (req, res) => {
  const allBooks = await Book.find({});
  res.json(allBooks);
});

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
