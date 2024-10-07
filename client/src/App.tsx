// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from './store/authSlice';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes/routes';

const App: React.FC = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     dispatch(login(JSON.parse(storedUser)));
  //   }
  // }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
