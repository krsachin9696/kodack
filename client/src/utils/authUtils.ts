import { RootState } from '../store'; // Adjust the path as necessary
import { useSelector } from 'react-redux';

export const isAuthenticated = () => {
  return useSelector((state: RootState) => state.auth.isAuthenticated);
};
