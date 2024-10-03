// const Dashboard = () => {
//   return <>DashBoard</>
// }

// export default Dashboard

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Dashboard = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

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
    </div>
  );
};

export default Dashboard;
