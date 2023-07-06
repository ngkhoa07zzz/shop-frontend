import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import ShippingScreen from '../screens/ShippingScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';

const publicRoutes = [
  { path: '/', component: HomeScreen },
  { path: '/product/:slug', component: ProductScreen },
  { path: '/cart', component: CartScreen },
  { path: '/signin', component: SigninScreen },
  { path: '/signup', component: SignupScreen },
  { path: '/shipping', component: ShippingScreen },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
