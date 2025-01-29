import { createBrowserRouter } from 'react-router';
import Layout from '../pages/Layout.tsx';
import Error from '../pages/Error.tsx';
import Home from '../pages/Home.tsx';
import Transactions from '../pages/Transactions.tsx';
import Categories from '../pages/Categories.tsx';
import SignUp from '../pages/SignUp.tsx';
import SignIn from '../pages/SignIn.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'transactions',
        element: <Transactions />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
    ],
  },
]);
