import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './store/authSlice';
import { RouterProvider } from 'react-router-dom';
import { RootState } from './store';
import { getUser } from './services';
import { router } from './routes/routes';
import { toast } from 'sonner';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const fetchUserData = async () => {

      try {
        const response = await getUser();
        if (response.status === 200) {
          const userData = response.data.user;
          dispatch(login(userData));
        }
      } catch (error) {
        if(isAuthenticated) {
          toast.info('You have been logged out, please log in again !');
          dispatch(logout());
        }
      }
    };

    fetchUserData(); 
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
