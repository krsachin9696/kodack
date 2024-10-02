// src/components/UnprotectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '../../utils/authUtils'

const UnprotectedRoute = () => {
  // If the user is authenticated, redirect to the dashboard
  // Otherwise, render the child components (via Outlet)
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/" />
}

export default UnprotectedRoute
