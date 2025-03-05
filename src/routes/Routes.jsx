import { createBrowserRouter } from 'react-router-dom';
import MainLayouts from '../layouts/MainLayouts';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ErrorPage from '../pages/ErrorPage';
import Contact from '../pages/Contact';
import Home from '../pages/Home';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../layouts/Dashboard';
import WorkSheet from '../pages/dashboard/EmployeeDashboard/WorkSheet';
import PaymentHistory from '../pages/dashboard/PaymentHistory/PaymentHistory';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayouts></MainLayouts>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/contact',
        element: <Contact></Contact>,
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: 'work-sheet',
        element: <WorkSheet></WorkSheet>,
      },
      {
        path: 'payment-history',
        element: <PaymentHistory></PaymentHistory>,
      },
    ],
  },
]);
