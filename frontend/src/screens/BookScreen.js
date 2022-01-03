import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';

const BookScreen = () => {
  const [featuredBook, setBook] = useState([]);

  const params = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      const { data } = await axios.get(`/api/books/${params.id}`);
      setBook(data);
    };
    fetchBook();
  }, []);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={4}>
          <Image src={featuredBook.image} alt={featuredBook.title} fluid />
        </Col>
        <Col md={4}>
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
