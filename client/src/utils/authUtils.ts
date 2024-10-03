import { RootState } from '../store'; // Adjust the path as necessary
import { useSelector } from 'react-redux';

export const isAuthenticated = () => {
  const authState = useSelector((state: RootState) => state.auth);
  return authState.isAuthenticated;
};
