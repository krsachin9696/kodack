import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Navbar from '../shared/navbar';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return isAuthenticated ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );

};

export default ProtectedRoute;




// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';
// import Navbar from '../shared/navbar';

// const Sidebar = () => {
//   return (
//     <div>
//       <h3>Sidebar</h3>
//       <ul>
//         <li><a href="/profile">Profile</a></li>
//         <li><a href="/settings">Settings</a></li>
//         <li><a href="/help">Help</a></li>
//         {/* Add more links as needed */}
//       </ul>
//     </div>
//   );
// };

// const ProtectedRoute = () => {
//   const isAuthenticated = useSelector(
//     (state: RootState) => state.auth.isAuthenticated,
//   );

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//       <Navbar />
//       <div style={{ display: 'flex', flex: '1' }}>
//         <div style={{ flex: '1', padding: '20px' }}>
//           <Outlet />
//         </div>
//         <div style={{ width: '250px', padding: '20px', borderLeft: '1px solid #ccc' }}>
//           <Sidebar />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProtectedRoute;
