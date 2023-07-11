import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';
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
  { path: '/payment', component: PaymentMethodScreen },
  { path: '/placeorder', component: PlaceOrderScreen },
  { path: '/order/:id', component: OrderScreen },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
