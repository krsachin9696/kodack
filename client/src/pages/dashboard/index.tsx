// // const Dashboard = () => {
// //   return <>DashBoard</>
// // }

// // export default Dashboard

// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../store';
// import { logout } from '../../store/authSlice';

// const Dashboard = () => {
//   const isAuthenticated = useSelector(
//     (state: RootState) => state.auth.isAuthenticated,
//   );
//   const user = useSelector((state: RootState) => state.auth.user);

//   const dispatch = useDispatch();

//   const handlelogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {isAuthenticated ? (
//         <div>
//           <h2>Welcome, {user?.name}!</h2>
//           <p>Email: {user?.email}</p>
//           <p>Username: {user?.username}</p>
//         </div>
//       ) : (
//         <h2>Please log in to access your dashboard.</h2>
//       )}
//       <p onClick={handlelogout}>Logout</p>
//     </div>
//   );
// };

// export default Dashboard;


import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import useLogout from '../../hooks/logout';

const Dashboard = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const { handleLogout, logoutStatus, error } = useLogout();

  return (
    <div>
      <h1>Dashboard</h1>
      {isAuthenticated ? (
        <div>
          <h2>Welcome, {user?.name}!</h2>
          <p>Email: {user?.email}</p>
          <p>Username: {user?.username}</p>
          <p onClick={handleLogout} style={{ cursor: 'pointer', color: 'blue' }}>
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
