import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import axios from 'axios';
import apis from '../constants/apis';

const logoutUser = async () => {
  const response = await axios.post(apis.user.logout, {}, {
    withCredentials: true, 
  });

  return response.data;
};

const useLogout = () => {
  const dispatch = useDispatch();

  const { mutate: logoutMutate, status, error } = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      dispatch(logout());
    },
    onError: () => {
      console.error('Logout error');
    },
  });

  const handleLogout = () => {
    logoutMutate();
  };

  return { handleLogout, logoutStatus: status, error: error };
};

export default useLogout;
