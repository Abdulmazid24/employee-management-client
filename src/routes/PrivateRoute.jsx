import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }
  if (user) {
    return children;
  }
  return (
    <Navigate to="/login" state={{ from: location }} replace="true"></Navigate>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.element,
};
export default PrivateRoute;
