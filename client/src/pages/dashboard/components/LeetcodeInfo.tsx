import {
  Box,
  Typography,
  Grid2,
  CircularProgress,
  Avatar,
} from '@mui/material';
import ProblemSolvedChart from './Chart';

const LeetcodeInfo = () => {

  return (
    <>
      <Grid2
        container
        height="100%"
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
        sx={{ display: 'flex' }}
      >
        <Grid2 size={{ xs: 1, sm: 8, md: 6 }}>
          <Box
            height="100%"
            sx={{
              // p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0, 0)',
              color: 'white',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <ProblemSolvedChart/>
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 1, sm: 8, md: 6 }}>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0)',
              color: 'white',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              height: '100%'
            }}
          >
            dfgsf
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
};

export default LeetcodeInfo;
