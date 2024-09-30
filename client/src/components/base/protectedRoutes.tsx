import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../utils/authUtils';

const ProtectedRoute = () => {
  // If the user is authenticated, render the child components (via Outlet)
  // Otherwise, redirect them to the login page
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
