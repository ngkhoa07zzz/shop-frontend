import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './Header.module.scss';
import images from '../../../../assets/images';
import { Suggestion } from '../../../Suggestions';
import ListItems from '../../../ListItems';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { Store } from '../../../../store/Store';
import { Value } from 'sass';

const cx = classNames.bind(styles);
function Header() {
  const [searchResults, setsearchResults] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setsearchResults([]);
    }, 3000);
  }, []);
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <header className={cx('header-content')}>
      <div className={cx('container')}>
        <Link to="/">
          <div className={cx('logo')}>
            <img src={images.logo} alt="TCN logo" />
          </div>
        </Link>
        <Tippy
          interactive
          visible={searchResults.length > 0}
          render={(attrs) => (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
              <Suggestion>
                <ListItems />
                <ListItems />
                <ListItems />
              </Suggestion>
            </div>
          )}
        >
          <div className={cx('search')}>
            <input placeholder="Nhập sản phẩm cần tìm ..." spellCheck={false} />
            <button className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
            <button className={cx('btn-search')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </Tippy>
        <Link to="/cart">
          <div className={cx('header-cart')}>
            <button className={cx('btn-cart')}>
              <FontAwesomeIcon
                className={cx('cart-icon')}
                icon={faCartShopping}
              />
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce(
                    (acc, value) => acc + value.quantity,
                    0
                  )}
                </Badge>
              )}
            </button>
          </div>
        </Link>
        {/*Content */}
      </div>
    </header>
  );
}

export default Header;
