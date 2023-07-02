import React, { useEffect, useReducer } from 'react';
// import { Link } from 'react-router-dom';
import logger from 'use-reducer-logger';
import { Col, Row } from 'react-bootstrap';
import classNames from 'classnames/bind';
// import data from './data';
import styles from './Home.module.scss';
import axios from 'axios';
import Product from '../components/Product/Product';
import { Helmet } from 'react-helmet-async';

const cx = classNames.bind(styles);
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: '',
    products: [],
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>TNC Store</title>
      </Helmet>
      <h1 className={cx('title')}>Sản phẩm đang bán</h1>
      <div className={cx('products')}>
        {loading ? (
          <div>Loading ...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
