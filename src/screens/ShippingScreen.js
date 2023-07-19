import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import styles from './Shipping.module.scss';
import { Store } from '../store/Store';
import CheckoutSteps from '../components/Checkout/CheckoutSteps.js';

const cx = classNames.bind(styles);

export default function ShippingScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(
    shippingAddress.phoneNumber || ''
  );
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [note, setNote] = useState(shippingAddress.note || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [navigate, userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        phoneNumber,
        address,
        note,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({ fullName, phoneNumber, address, note })
    );
    navigate('/payment');
  };
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className={cx('small-container')}>
        <h1 className={cx('title')}>Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="tel"
              value={phoneNumber}
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="note">
            <Form.Label>Ghi chú</Form.Label>
            <Form.Control
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Form.Group>
          <div className={cx('mb-3')}>
            <Button variant="primary" type="submit">
              Xác nhận mua hàng
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
