import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);
export default function Sidebar() {
  return (
    <aside className={cx('category-sidebar')}>
      <h2>Sidebar</h2>;
    </aside>
  );
}
