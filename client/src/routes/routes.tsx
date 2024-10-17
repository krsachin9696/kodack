// import { createBrowserRouter } from 'react-router-dom'
// import AboutUs from '../pages/about-us'
// import ContactUs from '../pages/contact-us'
// import Dashboard from '../pages/dashboard'
// import Login from '../pages/login'
// import Signup from '../pages/signup'
// // import AuthLayout from '../layouts/AuthLayout';
// import ProtectedRoute from '../components/base/protectedRoutes';
// import UnprotectedRoute from '../components/base/unprotectRoute';
// import NotFound from '../pages/not-found';
// import LandingPage from '../pages/home'

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <ProtectedRoute />,
//     children: [
//       {
//         index: true,
//         // path: "dashboard",
//         element: <Dashboard />,
//       },
//       {
//         path: 'about',
//         element: <AboutUs />,
//       },
//     ],
//   },
//   {
//     path: '/',
//     element: <UnprotectedRoute />,
//     children: [
//       { 
//         index: true,
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
//       }
//     ],
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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <UnprotectedRoute />, // Only render this route for unauthenticated users
    children: [
      {
        index: true,
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
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />, // Render these routes only for authenticated users
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'about',
        element: <AboutUs />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
