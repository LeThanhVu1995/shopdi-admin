import Auctions from '../pages/Auctions';
import Users from '../pages/Users';
import History from '../pages/Histiory';
import SignIn from '../pages/SignIn';
import Products from '../pages/Products';
import NotFound from '../pages/NotFound';
import Main from '../components/layout/Main';

export const routers = [
  {
    path: '/sign-in',
    key: 'signin',
    element: SignIn,
    exact: true,
    children: [],
    auth: false,
  },
  {
    element: Main,
    children: [
      {
        path: '/users',
        index: true,
        key: 'users',
        element: Users,
        auth: true,
      },
      {
        path: '/',
        index: true,
        key: 'index',
        element: Users,
        auth: true,
      },
      {
        path: '/products',
        exact: true,
        key: 'products',
        element: Products,
        auth: true,
      },
      {
        path: '/auctions',
        exact: true,
        key: 'auctions',
        element: Auctions,
        auth: true,
      },
      {
        path: '/history/:sku',
        exact: true,
        key: 'history',
        element: History,
        auth: true,
      },
    ],
  },
  {
    path: '*',
    element: NotFound,
  },
];
