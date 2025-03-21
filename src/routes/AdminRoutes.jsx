import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';
import PropTypes from 'prop-types';

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Loading></Loading>;
  }
  if (user && isAdmin) {
    return children;
  }
  return (
    <Navigate to="/login" state={{ from: location }} replace="true"></Navigate>
  );
};

AdminRoutes.propTypes = {
  children: PropTypes.element,
};
export default AdminRoutes;
