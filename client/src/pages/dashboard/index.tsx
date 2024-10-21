
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Box, Grid2, Typography, Avatar, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LaunchIcon from '@mui/icons-material/Launch';
import LeetcodeInfo from './components/LeetcodeInfo';
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
          gap: 1,
        }}
      >
        <Grid2
          container
          spacing={{ xs: 1, md: 1 }}
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
        <Grid2
          container
          width="100%"
          minHeight="50vh"
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 1, sm: 8, md: 6, lg: 12 }}
          sx={{ display: 'flex' }}
        >
          <Grid2 size={{ xs: 12, sm: 8, md: 6 }}>
            <CardWrapper>
              {/* Content for the first card */}
              Some content here
            </CardWrapper>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 8, md: 6 }}>
            <CardWrapper>
              {/* Content for the second card */}
              Another piece of content
            </CardWrapper>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default Dashboard;
