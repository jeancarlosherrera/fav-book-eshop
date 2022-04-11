import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listBookDetails, updateBook } from '../actions/bookActions';
import { BOOK_UPDATE_RESET } from '../constants/bookConstants';

const BookEditScreen = () => {
  const params = useParams();
  const navigate = useNavigate();

  const bookId = params.id;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState(0);
  const [firstEdition, setFirstEdition] = useState(0);
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);

  const dispatch = useDispatch();

  const bookDetails = useSelector((state) => state.bookDetails);
  const { loading, error, featuredBook } = bookDetails;

  const bookUpdate = useSelector((state) => state.bookUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = bookUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BOOK_UPDATE_RESET });
      navigate('/admin/booklist');
    } else {
      if (!featuredBook.title || featuredBook._id !== bookId) {
        dispatch(listBookDetails(bookId));
        setTitle(featuredBook.title);
        setAuthor(featuredBook.author);
        setPages(featuredBook.pages);
        setFirstEdition(featuredBook.firstEdition);
        setPrice(featuredBook.price);
        setCountInStock(featuredBook.countInSock);
        setImage(featuredBook.image);
        setSynopsis(featuredBook.synopsis);
        setRating(featuredBook.rating);
        setNumReviews(featuredBook.numReviews);
      }
    }
  }, [dispatch, navigate, bookId, featuredBook, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateBook({
        _id: bookId,
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
      })
    );
  };

  return (
    <>
      <Link to='/admin/booklist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Book</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='author'>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter author'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='pages'>
              <Form.Label>Pages</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter pages'
                value={pages}
                onChange={(e) => setPages(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='firstEdition'>
              <Form.Label>First Edition</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter first edition'
                value={firstEdition}
                onChange={(e) => setFirstEdition(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='synopsis'>
              <Form.Label>Synopsis</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter synopsis'
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='rating'>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter rating'
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='numReviews'>
              <Form.Label>Number of Reviews</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter number of reviews'
                value={numReviews}
                onChange={(e) => setNumReviews(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button className='mt-3' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default BookEditScreen;
