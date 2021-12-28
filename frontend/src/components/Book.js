import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Book = ({ book }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/book/${book._id}`}>
        <Card.Img src={book.image} variant='top' style={{ height: '25rem' }} />
      </Link>
      <Card.Body>
        <Link to={`/book/${book._id}`}>
          <Card.Title as='div'>
            <strong>{book.title}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <div className='my-3'>{book.author}</div>
        </Card.Text>

        <Card.Text as='div'>
          <Rating value={book.rating} text={`${book.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as='h5'>${book.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Book;
