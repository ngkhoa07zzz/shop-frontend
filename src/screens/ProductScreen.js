import axios from 'axios';
import classNames from 'classnames/bind';
import React, { useContext, useEffect, useReducer } from 'react';
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './Product.module.scss';
import Rating from '../components/Product/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/Loading/LoadingBox';
import MessageBox from '../components/Loading/MessageBox';
import { getError } from '../utils/Error';
import { Store } from '../store/Store';

const cx = classNames.bind(styles);

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    product: [],
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Mặt hàng này đã hết');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Row>
      <Col md={6}>
        <img
          className={cx('img-large')}
          src={product.image}
          alt={product.name}
        />
      </Col>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            <h1>${product.name}</h1>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating
              rating={product.rating}
              numReviews={product.numReviews}
            ></Rating>
          </ListGroup.Item>
          <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
          <ListGroup.Item>
            Description:
            <p>{product.description}</p>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Giá:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tình trạng:</Col>
                  <Col>
                    {product.countInStock > 0 ? (
                      <Badge bg="success">Còn hàng</Badge>
                    ) : (
                      <Badge bg="danger">Hết hàng</Badge>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      className={cx('btn-add-to-cart')}
                      onClick={addToCartHandler}
                      variant="primary"
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </div>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
