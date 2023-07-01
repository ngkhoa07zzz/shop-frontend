import React from 'react';
import data from './data';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
export default function HomeScreen() {
  return (
    <div>
      <h1 className={cx('title')}>Sản phẩm đang bán</h1>
      <div className={cx('products')}>
        {data.products.map((product) => (
          <div className={cx('product')} key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img
                className={cx('image')}
                src={product.image}
                alt={product.name}
              />
            </Link>
            <div className={cx('product-info')}>
              <Link to={`/product/${product.slug}`}>
                <p>{product.name}</p>
                <p>
                  <strong>${product.price}</strong>
                </p>
              </Link>
              <button>Mua Ngay</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
