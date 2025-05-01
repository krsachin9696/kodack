import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const UnprotectedRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default UnprotectedRoute;
