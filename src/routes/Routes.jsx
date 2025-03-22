import { createBrowserRouter } from 'react-router-dom';
import MainLayouts from '../layouts/MainLayouts';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../layouts/Dashboard';
import WorkSheet from '../pages/dashboard/EmployeeDashboard/WorkSheet';
import PaymentHistory from '../pages/dashboard/PaymentHistory/PaymentHistory';
import AllEmployeeList from '../pages/dashboard/AdminDashboard/AllEmployeeList';
import AdminRoutes from './AdminRoutes';
import Payroll from '../pages/dashboard/AdminDashboard/Payroll';
import ContactUs from '../pages/ContactUs';
import EmployeeList from '../pages/dashboard/HRDashboard/EmployeeList';
import EmployeeDetails from '../pages/dashboard/HRDashboard/EmployeeDetails';
import ProgressPage from '../pages/dashboard/HRDashboard/ProgressPage';

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
        path: '/contactUs',
        element: <ContactUs></ContactUs>,
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
      // Admin Routes only
      {
        path: 'all-employee-list',
        element: (
          <AdminRoutes>
            <AllEmployeeList></AllEmployeeList>
          </AdminRoutes>
        ),
      },
      {
        path: 'payroll',
        element: <Payroll></Payroll>,
      },
      // HR routes only
      {
        path: 'employee-list',
        element: <EmployeeList></EmployeeList>,
      },
      {
        path: 'employee-details/:slug',
        element: <EmployeeDetails></EmployeeDetails>,
      },
      {
        path: 'progress',
        element: <ProgressPage></ProgressPage>,
      },
    ],
  },
]);
