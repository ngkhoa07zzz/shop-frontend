import CartScreen from '../screens/CartScreen';
import DashboardScreen from '../screens/DashboardScreen';
import HomeScreen from '../screens/HomeScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import OrderListScreen from '../screens/OrderListScreen';
import OrderScreen from '../screens/OrderScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';
import ProductEditScreen from '../screens/ProductEditScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductScreen from '../screens/ProductScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import ShippingScreen from '../screens/ShippingScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';

const publicRoutes = [
  { path: '/', component: HomeScreen },
  { path: '/product/:slug', component: ProductScreen },
  { path: '/cart', component: CartScreen },
  { path: '/search', component: SearchScreen },
  { path: '/signin', component: SigninScreen },
  { path: '/signup', component: SignupScreen },
  { path: '/profile', component: ProfileScreen },
  { path: '/shipping', component: ShippingScreen },
  { path: '/payment', component: PaymentMethodScreen },
  { path: '/placeorder', component: PlaceOrderScreen },
  { path: '/order/:id', component: OrderScreen },
  { path: '/orderhistory', component: OrderHistoryScreen },
];

const privateRoutes = [
  { path: '/admin/dashboard', component: DashboardScreen },
  { path: '/admin/productlist', component: ProductListScreen },
  { path: '/admin/product/:id', component: ProductEditScreen },
  { path: '/admin/orderlist', component: OrderListScreen },
];

export { publicRoutes, privateRoutes };
