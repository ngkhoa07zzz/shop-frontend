import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import CheckoutSteps from '../components/Checkout/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
import { Button, Form } from 'react-bootstrap';
import { Store } from '../store/Store';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'Paypal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);
  const submitHandler = async (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_PAYMENT_METHOD',
      payload: paymentMethodName,
    });
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethodName));
    navigate('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className={cx('small-container')}>
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Phương thức thanh toán</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Paypal"
              label="Paypal"
              value="Paypal"
              checked={paymentMethodName === 'Paypal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Cash"
              label="Cash"
              value="Cash"
              checked={paymentMethodName === 'Cash'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Tiếp tục</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
