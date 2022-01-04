import express from 'express';
import asyncHandler from 'express-async-handler';
import Book from '../models/bookModel.js';
const router = express.Router();

// Fetch all products
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const allBooks = await Book.find({});
    res.json(allBooks);
  })
);

// Fetch single product
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const selectedBook = await Book.findById(req.params.id);
    if (selectedBook) {
      res.json(selectedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  })
);

export default router;
