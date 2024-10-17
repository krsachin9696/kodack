import { createBrowserRouter } from 'react-router-dom';
import AboutUs from '../pages/about-us';
import ContactUs from '../pages/contact-us';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import Signup from '../pages/signup';
import ProtectedRoute from '../components/base/protectedRoutes';
import UnprotectedRoute from '../components/base/unprotectRoute';
import NotFound from '../pages/not-found';
import Home from '../pages/home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        // path: 'profile/:username',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/',
    element: <UnprotectedRoute />,
    children: [
      {
        index: true,
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'home',
        element: <Home />,
      },
    ],
  },
  {
    path: 'contactus',
    element: <ContactUs />,
  },
  {
    path: 'about',
    element: <AboutUs />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
