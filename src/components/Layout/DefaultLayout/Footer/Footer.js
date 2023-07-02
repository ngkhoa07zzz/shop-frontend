import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);
export default function Footer() {
  return (
    <div className={cx('footer')}>
      <h2>Footer</h2>;
    </div>
  );
}
