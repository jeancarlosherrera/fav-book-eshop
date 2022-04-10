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

// Create individual book - POST /api/books
const createBook = asyncHandler(async (req, res) => {
  const book = new Book({
    user: req.user._id,
    title: '1984',
    author: 'George Orwell',
    pages: 328,
    firstEdition: 1949,
    price: 12.99,
    countInStock: 8,
    image: '/images/1984.jpeg',
    synopsis: 'N/A',
    rating: 4.7,
    numReviews: 6,
  });

  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

// Update book - PUT /api/books/:id
const updateBook = asyncHandler(async (req, res) => {
  const {
    title,
    author,
    pages,
    firstEdition,
    price,
    countInStock,
    image,
    synopsis,
    rating,
    numReviews,
  } = req.body;

  const book = await Book.findById(req.params.id);

  if (book) {
    book.title = title;
    book.author = author;
    book.pages = pages;
    book.firstEdition = firstEdition;
    book.price = price;
    book.countInStock = countInStock;
    book.image = image;
    book.synopsis = synopsis;
    book.rating = rating;
    book.numReviews = numReviews;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

export { getBooks, getBookById, deleteBook, createBook, updateBook };
