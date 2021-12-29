import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import books from '../books';

const BookScreen = () => {
  const params = useParams();
  const featuredBook = books.find((b) => b._id === params.id);
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={featuredBook.image} alt={featuredBook.title} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{featuredBook.title}</h3>
              <h5> by {featuredBook.author}</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={featuredBook.rating}
                text={`${featuredBook.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${featuredBook.price}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price</Col>
                  <Col>
                    <strong>${featuredBook.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    {featuredBook.countInStock > 0
                      ? 'In Stock'
                      : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='d-grid gap-2'>
                  <Button
                    type='button'
                    disabled={featuredBook.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BookScreen;
