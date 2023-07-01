import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';

const publicRoutes = [
  { path: '/', component: HomeScreen },
  { path: '/product/:slug', component: ProductScreen },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
