import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import useLogout from '../../hooks/logout';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '../../constants/queryKeys';
import getUserData from '../../services/getUser';

const Dashboard = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const { handleLogout, logoutStatus, error } = useLogout();

  const { isLoading, isError, data } = useQuery({
    queryKey: [queryKeys.GET_USER_DATA],
    queryFn: () => getUserData(),
  });

  if(isLoading) {
    return (<>fetching user data...</>)
  }

  if (isError) {
    return <>Error fetching User Data... </>
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {isAuthenticated ? (
        <div>
          <h2>Welcome, {data?.data.user.name}!</h2>
          <p>Email: {data?.data.user.email}</p>
          <p>Username: {data?.data.user.username}</p>
          <p onClick={handleLogout} >
            {logoutStatus === 'pending' ? 'Logging out...' : 'Logout'}
          </p>
          {error && <p style={{ color: 'red' }}>{error.message}</p>}
        </div>
      ) : (
        <h2>Please log in to access your dashboard.</h2>
      )}
    </div>
  );
};

export default Dashboard;
