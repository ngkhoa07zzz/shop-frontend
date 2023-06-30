import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);
function Suggestion({ children }) {
  return <div className={cx('suggestion-inner')}>{children}</div>;
}

export default Suggestion;
