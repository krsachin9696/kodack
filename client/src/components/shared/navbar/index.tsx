import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  Paper,
  AppBar,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useLogout from '../../../hooks/logout';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store'; 

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { handleLogout } = useLogout();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfileButton = () => {
    
    setAnchorEl(null);
  }

  const handleLogoutButton = () => {
    handleLogout();
    setAnchorEl(null);
  };

  // const drawer = (
  //   <div className='bg-transparent text-white'>
  //     <Toolbar sx={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
  //       <Typography
  //         variant='h4'
  //         noWrap
  //         component='a'
  //         color='primary'
  //         sx={{
  //           ml: 2,
  //           fontFamily: 'Protest Strike, sans-serif',
  //           fontWeight: 'semi-bold',
  //         }}
  //       >
  //         KODACK
  //       </Typography>
  //     </Toolbar>
  //     <Divider />

  //   </div>
  // );

  const drawer = (
    <Box>
      <Toolbar
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '6px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography
          variant="h4"
          noWrap
          component={Link}
          to="/"
          color="primary"
          sx={{
            ml: 2,
            fontFamily: 'Protest Strike, sans-serif',
            fontWeight: 'semi-bold',
          }}
        >
          KODACK
        </Typography>
      </Toolbar>
      <Divider />

      <Paper
        variant="elevation"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '6px',
          backdropFilter: 'blur(10px)',
          color: 'white',
        }}
      >
        <Typography variant="body1">Content for the first div</Typography>
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '6px',
          backdropFilter: 'blur(10px)',
          color: 'white',
        }}
      >
        <Typography variant="body1">Content for the second div</Typography>
      </Paper>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'center',
              display: { xs: 'flex', sm: 'none' },
            }}
          >
            <Typography
              variant="h4"
              noWrap
              component={Link}
              to="/"
              color="primary"
              sx={{
                fontFamily: 'Protest Strike, sans-serif',
                fontWeight: 'semi-bold',
              }}
            >
              KODACK
            </Typography>
          </Box>
          <Avatar
            alt={user?.name || 'User'}
            src="/path/to/profile-pic.jpg"
            onClick={handleAvatarClick}
            sx={{ cursor: 'pointer' }}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
            <MenuItem onClick={handleLogoutButton}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: 'rgba(255, 255, 255, 0.0)',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: 'rgba(255, 255, 255, 0.0)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
