import classNames from 'classnames/bind';
import styles from './ListItems.module.scss';

const cx = classNames.bind(styles);

function ListItems() {
  return (
    <div className={cx('sugget-product')}>
      <img
        className={cx('image-product')}
        src="https://www.tncstore.vn/image/catalog/laptop/Lenovo/IdeaPad%203%2014IAU7%2082RJ001BVN/laptop-lenovo-ideapad3-14iau7-82rj001bvn-1.jpg"
        alt="Laptop"
      />
      <div className={cx('info')}>
        <h4 className={cx('name-product')}>
          Laptop Lenovo IdeaPad 3 14IAU7 82RJ009MVN (Core i3-1215U/ 8GB/ 256GB/
          14 inch FHD/ Win 11/ Xanh)
        </h4>
        <span className={cx('price')}>10.690.000 đ</span>
      </div>
    </div>
  );
}

export default ListItems;
