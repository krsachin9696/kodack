import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './store/authSlice';
import { RouterProvider } from 'react-router-dom';
import { RootState } from './store';
import { getUser } from './services';
import { router } from './routes/routes';
import { toast } from 'sonner';
import { Box } from '@mui/material';
import HashLoader from "react-spinners/ClipLoader";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser();
        if (response.status === 200) {
          const userData = response.data.user;
          dispatch(login(userData));
        }
      } catch (error) {
        if (isAuthenticated) {
          toast.info('You have been logged out, please log in again !');
          dispatch(logout());
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch, isAuthenticated]);

  if (loading) {
    return (
      <Box className="min-h-screen flex px-[10%]">
        <Box className="hidden md:flex w-1/2 text-white flex-col p-10 bg-[url('/bgsvg.svg')] bg-no-repeat bg-contain bg-center">
          <h1 className=" font-protest font-bold text-6xl mb-10 text-blue-400 p-10">
            KODACK
          </h1>
        </Box>
        <Box>
          <HashLoader color="#209bff" size={100} />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
