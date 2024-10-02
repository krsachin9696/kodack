import { createBrowserRouter } from 'react-router-dom'
import Contact from '../pages/contact'
import Dashboard from '../pages/dashboard'
import Login from '../pages/login'
import Signup from '../pages/signup'
// import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from '../components/base/protectedRoutes'
import UnprotectedRoute from '../components/base/unprotectRoute'
import NotFound from '../pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        // path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: 'contact',
        element: <Contact />,
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
    ],
  },
  {
    path: '*',
    element: <NotFound/>
  }
])
