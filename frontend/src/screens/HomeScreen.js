import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Book from '../components/Book';
import axios from 'axios';

const HomeScreen = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await axios.get('/api/books');
      setBooks(data);
    };
    fetchBooks();
  }, []);

  // useEffect(() => {
  //   axios.get('/api/books').then((res) => {
  //     setBooks(res.data);
  //   });
  // }, []);

  return (
    <>
      <h1>Featured Books</h1>
      <Row>
        {books.map((book) => (
          <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
            <Book book={book} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
