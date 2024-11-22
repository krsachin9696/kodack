import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import LeetcodeInfo from './components/LeetcodeInfo';
import { Box, Grid2 } from '@mui/material';
import UserProfile from './components/userProfile';
import PersonalListCard from './components/PersonalListCard';
import PublicListCard from './components/PublicListCard';

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const socialLinks = {
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    twitter: 'www.x.com',
    portfolio: undefined,
    leetcode: 'https://leetcode.com/johndoe',
  };

  return (
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
          <UserProfile user={user} socialLinks={socialLinks} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
          <LeetcodeInfo username={user?.username || ''} />
        </Grid2>
      </Grid2>

      {/* List Sections */}
      <Grid2
        container
        width="100%"
        minHeight="50vh"
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 1, sm: 8, md: 6, lg: 12 }}
        sx={{ display: 'flex' }}
      >
        <Grid2 size={{ xs: 12, sm: 8, md: 6 }}>
          <PersonalListCard />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 8, md: 6 }}>
          <PublicListCard />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Dashboard;
