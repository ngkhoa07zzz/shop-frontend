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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Header.module.scss';
import images from '../../../../assets/images';
import { Suggestion } from '../../../Suggestions';
import ListItems from '../../../ListItems';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Form, NavDropdown } from 'react-bootstrap';
import { Store } from '../../../../store/Store';
import { LinkContainer } from 'react-router-bootstrap';
// import { Value } from 'sass';

const cx = classNames.bind(styles);
function Header() {
  const navigate = useNavigate();
  const [searchResults, setsearchResults] = useState([]);
  const [query, setQuery] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
    e.target.reset();
  };

  useEffect(() => {
    setTimeout(() => {
      setsearchResults([]);
    }, 3000);
  }, []);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/#signout';
  };
  console.log(userInfo);

  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />
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
            <Form className={cx('search')} onSubmit={submitHandler}>
              <input
                placeholder="Nhập sản phẩm cần tìm ..."
                spellCheck={false}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className={cx('clear')}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
              <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
              <Button className={cx('btn-search')} type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            </Form>
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
          <div>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="admin-nav-dropdown">
                <LinkContainer to="/admin/dashboard">
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/productlist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
