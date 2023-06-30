import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './Header.module.scss';
import images from '../../../../assets/images';
import { Suggestion } from '../../../Suggestions';
import ListItems from '../../../ListItems';

const cx = classNames.bind(styles);
function Header() {
  const [searchResults, setsearchResults] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setsearchResults([]);
    }, 3000);
  }, []);
  return (
    <header className={cx('header-content')}>
      <div className={cx('container')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="TCN logo" />
        </div>
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
        <div className={cx('cart')}></div>
        {/*Content */}
      </div>
    </header>
  );
}

export default Header;
