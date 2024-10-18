import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  Box,
  Grid2,
  Paper,
  Typography,
  Avatar,
  IconButton,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LaunchIcon from '@mui/icons-material/Launch';
import LeetcodeInfo from './components/LeetcodeInfo';

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const socialLinks = {
    linkedin: 'k',
    github: 'k',
    twitter: null,
    portfolio: 'k',
    leetcode: null,
  };

  // if(isLoading) {
  //   return (<>fetching user data...</>)
  // }

  // if (isError) {
  //   return <>Error fetching User Data... </>
  // };

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 1 }}>
        <Grid2
          container
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
          sx={{ display: 'flex' }}
        >
          <Grid2 size={{ xs: 1, sm: 8, md: 4 }} gridRow={{}}>
            <Paper
              variant="outlined"
              sx={{
                height: '100%',
                p: 2,
                // paddingTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '5px',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                flex: 1,
              }}
            >
              <Avatar
                // alt={name}
                // src={profilePhoto}
                src='https://assets.leetcode.com/users/avatars/avatar_1666705889.png'
                sx={{ width: 100, height: 100 }}
              />
              <Typography variant="h6">
                {user?.name}
              </Typography>
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
            </Paper>
          </Grid2>
          <Grid2 size={{ xs: 2, sm: 8, md: 8 }}>
            <Paper
              variant="outlined"
              sx={{
                height: '100%',
                borderRadius: '5px',
                backdropFilter: 'blur(10px)',
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.0)',
                // border: '1px solid rgba(255, 255, 255, 0.1)',
                flex: 1,
              }}
            >
              {/* section 2 */}
              <LeetcodeInfo username={user?.username || ""}/>
            </Paper>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default Dashboard;
