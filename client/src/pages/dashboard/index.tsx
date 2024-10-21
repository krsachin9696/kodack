import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  Box,
  Grid2,
  Typography,
  Avatar,
  IconButton,
  Chip,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LaunchIcon from '@mui/icons-material/Launch';
import LeetcodeInfo from './components/LeetcodeInfo';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Divider from '@mui/material/Divider';

import CardWrapper from '../../components/shared/card';

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const socialLinks = {
    linkedin: 'k',
    github: 'k',
    twitter: null,
    portfolio: 'k',
    leetcode: null,
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Grid2
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
          sx={{ display: 'flex' }}
        >
          <Grid2 size={{ xs: 12, sm: 8, md: 4 }}>
            <CardWrapper>
              <Avatar
                src="https://assets.leetcode.com/users/avatars/avatar_1666705889.png"
                sx={{ width: 100, height: 100 }}
              />
              <Typography variant="h6">{user?.name}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                @{user?.username}
              </Typography>
              <Typography variant="body2" sx={{ color: 'gray' }}>
                {user?.email}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <IconButton
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: socialLinks?.linkedin ? 'inherit' : 'gray' }}
                >
                  <LinkedInIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
                <IconButton
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: socialLinks?.github ? 'inherit' : 'gray' }}
                >
                  <GitHubIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
                <IconButton
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: socialLinks?.twitter ? 'inherit' : 'gray' }}
                >
                  <TwitterIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
                <IconButton
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: socialLinks?.leetcode ? 'inherit' : 'gray' }}
                >
                  <LaunchIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
              </Box>
            </CardWrapper>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
            <LeetcodeInfo username={user?.username || ''} />
          </Grid2>
        </Grid2>

        {/* List */}
        <Grid2
          container
          width="100%"
          minHeight="50vh"
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 1, sm: 8, md: 6, lg: 12 }}
          sx={{ display: 'flex' }}
        >
          <Grid2 size={{ xs: 12, sm: 8, md: 6 }}>
            <CardWrapper
              sx={{
                p: 0,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Box marginBottom={1} width="100%">
                <Box
                  padding={2}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  paddingBottom={1}
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    // justifyContent="space-between"
                    gap={1}
                  >
                    <ListAltIcon />
                    <Typography sx={{ fontWeight: 600 }}>
                      Personal Lists
                    </Typography>
                  </Box>
                  <Box>
                    <AddCircleOutlinedIcon />
                  </Box>
                </Box>
                <Box width="100%">
                  <Divider
                    variant="fullWidth"
                    sx={{ border: '0.01px solid', borderColor: 'gray' }}
                  />
                </Box>
              </Box>

              <Box width="100%" padding={1} gap={2}>
                {/* private lists over here */}
                <Box
                  width="100%"
                  padding={2}
                  borderLeft={4}
                  borderColor="skyblue"
                  borderRadius={2}
                  display="flex"
                  flexDirection="column"
                >
                  <Typography sx={{ fontFamily: 'sans-serif'}}>A2Z DSA Sheet.</Typography>
                  <Box>
                    <Chip
                      label="array"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                    <Chip
                      label="recursion"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                    <Chip
                      label="dp"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                  </Box>
                </Box>
                <Box
                  width="100%"
                  padding={2}
                  borderLeft={4}
                  borderColor="skyblue"
                  borderRadius={2}
                  display="flex"
                  flexDirection="column"
                >
                  <Typography sx={{ fontFamily: 'sans-serif'}}>A2Z DSA Sheet.</Typography>
                  <Box>
                    <Chip
                      label="array"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                    <Chip
                      label="recursion"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                    <Chip
                      label="dp"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                  </Box>
                </Box>
                <Box
                  width="100%"
                  padding={2}
                  borderLeft={4}
                  borderColor="skyblue"
                  borderRadius={2}
                  display="flex"
                  flexDirection="column"
                >
                  <Typography sx={{ fontFamily: 'sans-serif'}}>A2Z DSA Sheet.</Typography>
                  <Box>
                    <Chip
                      label="array"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                    <Chip
                      label="recursion"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                    <Chip
                      label="dp"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                  </Box>
                </Box>
                <Box
                  width="100%"
                  padding={2}
                  borderLeft={4}
                  borderColor="skyblue"
                  borderRadius={2}
                  display="flex"
                  flexDirection="column"
                >
                  <Typography sx={{ fontFamily: 'sans-serif'}}>A2Z DSA Sheet.</Typography>
                  <Box>
                    <Chip
                      label="array"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                    <Chip
                      label="recursion"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                    <Chip
                      label="dp"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                  </Box>
                </Box>
                <Box
                  width="100%"
                  padding={2}
                  borderLeft={4}
                  borderColor="skyblue"
                  borderRadius={2}
                  display="flex"
                  flexDirection="column"
                >
                  <Typography sx={{ fontFamily: 'sans-serif'}}>A2Z DSA Sheet.</Typography>
                  <Box>
                    <Chip
                      label="array"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                    <Chip
                      label="recursion"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                    <Chip
                      label="dp"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                  </Box>
                </Box>
                <Box
                  width="100%"
                  padding={2}
                  borderLeft={4}
                  borderColor="skyblue"
                  borderRadius={2}
                  display="flex"
                  flexDirection="column"
                >
                  <Typography sx={{ fontFamily: 'sans-serif'}}>A2Z DSA Sheet.</Typography>
                  <Box>
                    <Chip
                      label="array"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                    <Chip
                      label="recursion"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                    <Chip
                      label="dp"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                  </Box>
                </Box>
                <Box
                  width="100%"
                  padding={2}
                  borderLeft={4}
                  borderColor="skyblue"
                  borderRadius={2}
                  display="flex"
                  flexDirection="column"
                >
                  <Typography sx={{ fontFamily: 'sans-serif'}}>A2Z DSA Sheet.</Typography>
                  <Box>
                    <Chip
                      label="array"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                    <Chip
                      label="recursion"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                    <Chip
                      label="dp"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                  </Box>
                </Box>
                <Box
                  width="100%"
                  padding={2}
                  borderLeft={4}
                  borderColor="skyblue"
                  borderRadius={2}
                  display="flex"
                  flexDirection="column"
                >
                  <Typography sx={{ fontFamily: 'sans-serif'}}>A2Z DSA Sheet.</Typography>
                  <Box>
                    <Chip
                      label="array"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                    <Chip
                      label="recursion"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                    <Chip
                      label="dp"
                      size="small"
                      sx={{ backgroundColor: 'yourColor', color: 'white' }}
                    />
                  </Box>
                </Box>
              </Box>
            </CardWrapper>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 8, md: 6 }}>
            <CardWrapper
              sx={{
                p: 0,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Box marginBottom={1} width="100%">
                <Box
                  padding={2}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  paddingBottom={1}
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    // justifyContent="space-between"
                    gap={1}
                  >
                    <ListAltIcon />
                    <Typography sx={{ fontWeight: 600 }}>
                      Public Lists
                    </Typography>
                  </Box>
                  <Box>
                    <AddCircleOutlineOutlinedIcon />
                  </Box>
                </Box>
                <Box width="100%">
                  <Divider
                    variant="fullWidth"
                    sx={{ border: '0.01px solid', borderColor: 'gray' }}
                  />
                </Box>
              </Box>

              <Box padding={2}>public lists over here</Box>
            </CardWrapper>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default Dashboard;
