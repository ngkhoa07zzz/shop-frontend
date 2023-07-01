import classNames from 'classnames/bind';
import Styles from './defaultLayout.module.scss';
import Header from './Header/Header';
// import Sidebar from './Sidebar/Sidebar';

const cx = classNames.bind(Styles);
function defaultLayout({ children }) {
  return (
    <div className={cx('wapper')}>
      <Header />
      <div className={cx('container')}>
        {/* <Sidebar /> */}
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
}

export default defaultLayout;
