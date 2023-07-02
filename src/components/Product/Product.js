import classNames from 'classnames/bind';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

import styles from './Product.module.scss';

const cx = classNames.bind(styles);

function Product(props) {
  const { product } = props;
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
        <Button className={cx('btn-buy')}>Mua ngay</Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
