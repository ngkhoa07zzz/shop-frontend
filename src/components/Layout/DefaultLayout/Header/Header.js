import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '../../../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Header() {
  return (
    <header className={cx('header-content')}>
      <div className={cx('container')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="TCN logo" />
        </div>
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
        <div className={cx('cart')}></div>
        {/*Content */}
      </div>
    </header>
  );
}

export default Header;
