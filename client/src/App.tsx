import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './store/authSlice';
import { RouterProvider } from 'react-router-dom';
import { RootState } from './store';
import { getUser } from './services';
import { router } from './routes/routes';

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
        else if (response.status === 401) {
          
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Check if user is not authenticated
    if (!isAuthenticated) {
      fetchUserData(); 
    }
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
