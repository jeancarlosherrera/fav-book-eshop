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

// Delete individual book - DELETE /api/books/:id
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    await book.remove();
    res.json({ message: 'Book removed' });
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

export { getBooks, getBookById, deleteBook };
