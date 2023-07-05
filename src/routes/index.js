import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import SigninScreen from '../screens/SigninScreen';

const publicRoutes = [
  { path: '/', component: HomeScreen },
  { path: '/product/:slug', component: ProductScreen },
  { path: '/cart', component: CartScreen },
  { path: '/signin', component: SigninScreen },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
