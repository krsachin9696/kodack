import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Navbar from '../shared/navbar';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return isAuthenticated ? (
    <Navbar/>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;