// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';
// import useLogout from '../../hooks/logout';
// import { useQuery } from '@tanstack/react-query';
// import queryKeys from '../../constants/queryKeys';
// import getUserData from '../../services/getUser';

// const Dashboard = () => {
//   const isAuthenticated = useSelector(
//     (state: RootState) => state.auth.isAuthenticated
//   );

//   const { handleLogout, logoutStatus, error } = useLogout();

//   const { isLoading, isError, data } = useQuery({
//     queryKey: [queryKeys.GET_USER_DATA],
//     queryFn: () => getUserData(),
//   });

//   if(isLoading) {
//     return (<>fetching user data...</>)
//   }

//   if (isError) {
//     return <>Error fetching User Data... </>
//   };

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {isAuthenticated ? (
//         <div>
//           <h2>Welcome, {data?.data.user.name}!</h2>
//           <p>Email: {data?.data.user.email}</p>
//           <p>Username: {data?.data.user.username}</p>
//           <p onClick={handleLogout} >
//             {logoutStatus === 'pending' ? 'Logging out...' : 'Logout'}
//           </p>
//           {error && <p style={{ color: 'red' }}>{error.message}</p>}
//         </div>
//       ) : (
//         <h2>Please log in to access your dashboard.</h2>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import type { Router } from '@toolpad/core';

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        height: '91.4vh'
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function DashboardLayoutNavigationHeadings(props: DemoProps) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/lion');

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: any) => setPathname(String(path)),
    };
  }, [pathname]);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={[
        {
          kind: 'header',
          title: 'Animals',
        },
        {
          segment: 'lion',
          title: 'Lion',
          icon: <DescriptionIcon />,
        },
        {
          kind: 'header',
          title: 'Movies',
        },
        {
          segment: 'lord-of-the-rings',
          title: 'Lord of the Rings',
          icon: <DescriptionIcon />,
        },
      ]}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'KODACK',
      }}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}
