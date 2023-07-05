import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet-async';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareMinus,
  faSquarePlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import styles from './Cart.module.scss';
import MessageBox from '../components/Loading/MessageBox';
import { Store } from '../store/Store';

const cx = classNames.bind(styles);

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Mặt hàng này đã hết');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1 className={cx('title')}>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-item-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() => {
                          updateCartHandler(item, item.quantity - 1);
                        }}
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <FontAwesomeIcon icon={faSquareMinus} />
                      </Button>{' '}
                      <span>{item.quantity}</span>
                      <Button
                        onClick={() => {
                          updateCartHandler(item, item.quantity + 1);
                        }}
                        variant="light"
                      >
                        <FontAwesomeIcon icon={faSquarePlus} />
                      </Button>
                    </Col>
                    <Col md={3}>{item.price} đ</Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => removeItemHandler(item)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Tổng chi phí (
                    {cartItems.reduce((acc, value) => acc + value.quantity, 0)}{' '}
                    sản phẩm):{' '}
                    {cartItems.reduce(
                      (acc, value) => acc + value.quantity * value.price,
                      0
                    )}{' '}
                    đ
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      onClick={checkoutHandler}
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                    >
                      Xác nhận thanh toán
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
