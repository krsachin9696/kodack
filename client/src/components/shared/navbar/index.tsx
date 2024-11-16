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
import { useQuery } from '@tanstack/react-query';
import queryKeys from '../../../constants/queryKeys';
import fetchPersonalLists from './services/getPersonalLists';
import fetchPublicLists from './services/getPublicLists';
import CardWrapper from '../card';
import { ListAltOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

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
  const { id: listID } = useParams();
  console.log(listID);

  const page = 1;
  const limit = 5;

  const {
    data: personalListData,
    isLoading: personalListLoading,
    isError: personalListError,
  } = useQuery({
    queryKey: [queryKeys.PERSONAL_LISTS, page, limit],
    queryFn: () => fetchPersonalLists(page, limit),
  });

  const {
    data: publicListData,
    isLoading: publicListLoading,
    isError: publicListError,
  } = useQuery({
    queryKey: [queryKeys.PUBLIC_LISTS, page, limit],
    queryFn: () => fetchPublicLists(page, limit),
  });

  const personalLists = personalListData?.data.lists;
  const publicLists = publicListData?.data.lists;

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

  const handleLogoutButton = () => {
    handleLogout();
    setAnchorEl(null);
  };

  const drawer = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
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

      {/* Wrapper for Personal Lists and Public Lists */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Personal Lists Section */}
        <Paper
          variant="elevation"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '6px',
            backdropFilter: 'blur(10px)',
            color: 'white',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box marginBottom={1} width="100%">
            <CardWrapper
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 1,
              }}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={1}
              >
                <ListAltOutlined />
                <Typography
                  sx={{ fontWeight: 600 }}
                  component={Link}
                  to="/list"
                >
                  Personal Lists
                </Typography>
              </Box>
            </CardWrapper>
            <Divider
              variant="fullWidth"
              sx={{ border: '0.01px solid', borderColor: 'gray' }}
            />
          </Box>

          <Box
            width="100%"
            padding={1}
            gap={1}
            display="flex"
            flexDirection="column"
            sx={{ flex: 1 }}
          >
            {personalLists &&
              personalLists.map((list, index) => {
                const isActive = listID === list.listID;
                return (
                <Link
                  key={index}
                  to={`/list/${list.listID}`} 
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    key={index}
                    width="100%"
                    padding={1}
                    borderLeft={4}
                    borderColor="skyblue"
                    borderRadius={2}
                    display="flex"
                    flexDirection="column"
                    sx={{
                      backgroundColor: isActive ? 'rgba(135, 206, 235, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                      '&:hover': {
                        backgroundColor: isActive ? 'rgba(135, 206, 235, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                      },
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      paddingBottom={1}
                    >
                      <Typography
                        sx={{ fontFamily: 'sans-serif', fontWeight: '600' }}
                      >
                        {list.name}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              )})}
          </Box>
        </Paper>

        {/* Gap between Personal Lists and Public Lists */}
        <Box sx={{ height: '4px' }} />

        {/* Public Lists Section */}
        <Paper
          variant="outlined"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '6px',
            backdropFilter: 'blur(10px)',
            color: 'white',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box marginBottom={1} width="100%">
            <CardWrapper
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 1,
              }}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={1}
              >
                <ListAltOutlined />
                <Typography
                  sx={{ fontWeight: 600 }}
                  component={Link}
                  to="/list"
                >
                  Public Lists
                </Typography>
              </Box>
            </CardWrapper>
            <Divider
              variant="fullWidth"
              sx={{ border: '0.01px solid', borderColor: 'gray' }}
            />
          </Box>

          <Box
            width="100%"
            padding={1}
            gap={1}
            display="flex"
            flexDirection="column"
            sx={{ flex: 1 }}
          >
            {publicLists &&
              publicLists.map((list, index) => {
                const isActive = listID === list.listID;
                return (
                <Link
                  key={index}
                  to={`/list/${list.listID}`} 
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    key={index}
                    width="100%"
                    padding={1}
                    borderLeft={4}
                    borderColor="skyblue"
                    borderRadius={2}
                    display="flex"
                    flexDirection="column"
                    sx={{
                      backgroundColor: isActive ? 'rgba(135, 206, 235, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                      '&:hover': {
                        backgroundColor: isActive ? 'rgba(135, 206, 235, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                      },
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      paddingBottom={1}
                    >
                      <Typography
                        sx={{ fontFamily: 'sans-serif', fontWeight: '600' }}
                      >
                        {list.name}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              )})}
          </Box>
        </Paper>
      </Box>
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
            <MenuItem onClick={handleCloseMenu} component={Link} to="/">
              Profile
            </MenuItem>
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
