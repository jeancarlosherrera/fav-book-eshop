import { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart } from '../actions/cartActions';

const CartScreen = () => {
  const params = useParams();
  const location = useLocation();
  const id = params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty, params, location]);

  return <div>Cart</div>;
};

export default CartScreen;
