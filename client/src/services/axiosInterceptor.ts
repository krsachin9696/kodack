import axios from 'axios';
import { toast } from 'sonner';
import apis from '../constants/apis';
import { store } from '../store';
import { logout } from '../store/authSlice';

const axiosInstance = axios.create({
  baseURL: apis.baseURL,
  withCredentials: true,
});

// Axios interceptor to catch 401 Unauthorized errors
axiosInstance.interceptors.response.use(
  (response) => response, // Just return the response if no error
  async (error) => {
    const { response } = error;

    // Check for 401 Unauthorized status
    if (response?.status === 401) {
      // Handle logout logic
      toast.error('Session expired. Please log in again.');

      store.dispatch(logout());

      // Invoke the logout function
      // const { handleLogout } = useLogout();
      // handleLogout(); // This will handle the user logout
      

      // Optionally, redirect user to login page (if using React Router)
      // history.push('/login'); // Uncomment if using React Router
    }

    // Re-throw the error to be handled elsewhere in your application if necessary
    return Promise.reject(error);
  }
);

export default axiosInstance;
