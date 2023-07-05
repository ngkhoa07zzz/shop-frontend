import classNames from 'classnames/bind';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

import styles from './Product.module.scss';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../../store/Store';

const cx = classNames.bind(styles);

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
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
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title className={cx('card-title')}>{product.name}</Card.Title>
        </Link>
        <Card.Text className={cx('card-text')}>${product.price}</Card.Text>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        {product.countInStock === 0 ? (
          <Button className={cx('btn-out-of-stock')} variant="danger" disabled>
            Hết hàng
          </Button>
        ) : (
          <Button
            className={cx('btn-buy')}
            onClick={() => addToCartHandler(product)}
          >
            Mua ngay
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
