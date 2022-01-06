import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listBookDetails } from '../actions/bookActions';

const BookScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const bookDetails = useSelector((state) => state.bookDetails);
  const { loading, error, featuredBook } = bookDetails;

  useEffect(() => {
    dispatch(listBookDetails(params.id));
  }, [dispatch, params]);

  if (!featuredBook) return null;

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
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
      )}
    </>
  );
};

export default BookScreen;
