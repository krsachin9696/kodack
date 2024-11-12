// import { createBrowserRouter } from 'react-router-dom';
// import AboutUs from '../pages/about-us';
// import ContactUs from '../pages/contact-us';
// import Dashboard from '../pages/dashboard';
// import Login from '../pages/login';
// import Signup from '../pages/signup';
// import ProtectedRoute from '../components/base/protectedRoutes';
// import UnprotectedRoute from '../components/base/unprotectRoute';
// import NotFound from '../pages/not-found';
// import LandingPage from '../pages/landing-page'
// import ForgotPassword from '../pages/forgot-password'
// import ListPage from '../pages/list';
// import ListDetail from '../pages/list-detail';

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <ProtectedRoute />,
//     children: [
//       {
//         index: true,
//         // path: 'profile/:username',
//         element: <Dashboard />,
//       },
//       {
//         path: 'list',
//         element: <ListPage />
//       }
//     ],
//   },
//   {
//     path: '/',
//     element: <UnprotectedRoute />,
//     children: [
//       { 
//         // index: true,
//         path: 'landing',
//         element: <LandingPage />
//       },
//       {
//         path: 'login',
//         element: <Login />,
//       },
//       {
//         path: 'signup',
//         element: <Signup />,
//       },
//       {
//         path: 'contactus',
//         element: <ContactUs />,
//       },
//       {
//         path: 'forgot-password',
//         element: <ForgotPassword />,
//       },
//     ],
//   },
//   {
//     path: 'contactus',
//     element: <ContactUs />,
//   },
//   {
//     path: 'about',
//     element: <AboutUs />,
//   },
//   {
//     path: '*',
//     element: <NotFound />,
//   },
// ]);

import { createBrowserRouter } from 'react-router-dom';
import AboutUs from '../pages/about-us';
import ContactUs from '../pages/contact-us';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import Signup from '../pages/signup';
import ProtectedRoute from '../components/base/protectedRoutes';
import UnprotectedRoute from '../components/base/unprotectRoute';
import NotFound from '../pages/not-found';
import LandingPage from '../pages/landing-page';
import ForgotPassword from '../pages/forgot-password';
import ListPage from '../pages/list';
import ListDetail from '../pages/list-detail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'list',
        element: <ListPage />,
      },
      {
        path: 'list/:id',
        element: <ListDetail />,
      },
    ],
  },
  {
    path: '/',
    element: <UnprotectedRoute />,
    children: [
      {
        index: true,
        path: 'landing',
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'contactus',
        element: <ContactUs />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
    ],
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
