// const Dashboard = () => {
//   return <>DashBoard</>
// }

// export default Dashboard

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/authSlice';

const Dashboard = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();

  const handlelogout = () => {
    dispatch(logout());
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {isAuthenticated ? (
        <div>
          <h2>Welcome, {user?.name}!</h2>
          <p>Email: {user?.email}</p>
          <p>Username: {user?.username}</p>
        </div>
      ) : (
        <h2>Please log in to access your dashboard.</h2>
      )}
      <p onClick={handlelogout}>Logout</p>
    </div>
  );
};

export default Dashboard;
