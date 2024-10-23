import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import LeetcodeInfo from './components/LeetcodeInfo';
import { Box, Grid2 } from '@mui/material';
import ListSection from './components/ListSection';
import UserProfile from './components/userProfile';

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const socialLinks = {
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    twitter: null,
    portfolio: 'https://johndoe.com',
    leetcode: 'https://leetcode.com/johndoe',
  };

  const personalLists = [
    {
      name: 'A2Z DSA Sheet',
      tags: ['array', 'recursion', 'dp'],
      isPublic: false,
    },
    {
      name: 'Algorithm Study Plan',
      tags: ['dynamic programming', 'greedy'],
      isPublic: true,
    },
  ];

  const publicLists = [
    {
      name: 'Interview Preparation',
      tags: ['array', 'strings', 'searching'],
      isPublic: true,
    },
    {
      name: 'Competitive Programming',
      tags: ['graphs', 'trees', 'backtracking'],
      isPublic: true,
    },
  ];

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
          <ListSection title="Personal Lists" lists={personalLists} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 8, md: 6 }}>
          <ListSection title="Public Lists" lists={publicLists} />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Dashboard;
