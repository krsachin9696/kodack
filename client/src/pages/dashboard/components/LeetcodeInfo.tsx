import {
  Box,
  Typography,
  Grid2,
  CircularProgress,
  Avatar,
} from '@mui/material';

const LeetcodeInfo = () => {

  return (
    <>
      {/* <Box sx={{ flexGrow: 1, p: 1 }}> */}
        <Grid2
          container
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
          sx={{ display: 'flex' }}
        >
          <Grid2 size={{ xs: 1, sm: 8, md: 4 }}>
            <Box
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0, 0)',
                color: 'white',
                justifyContent: 'center',
              }}
            >

              dfgsf
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 1, sm: 8, md: 8 }}>
            <Box
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                color: 'white',
                justifyContent: 'center',
              }}
            >

              dfgsf
            </Box>
          </Grid2>
        </Grid2>
      {/* </Box> */}
    </>
  );
};

export default LeetcodeInfo;

// const solved = 803;
//   const total = 3323;
//   const percentage = (solved / total) * 100;

//   const problemStats = {
//     easy: 276,
//     medium: 439,
//     hard: 88,
//     easyTotal: 830,
//     mediumTotal: 1738,
//     hardTotal: 755,
//   };

//   const badges = [
//     { id: 1, label: '50 Days Badge 2024', src: '/path-to-badge1.png' },
//     { id: 2, label: 'Another Badge', src: '/path-to-badge2.png' },
//     { id: 3, label: 'Third Badge', src: '/path-to-badge3.png' },
//   ];

{
  /* <Grid2 container spacing={2}>
        <Grid2 >
          <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
            <Box position="relative" display="inline-flex">
              <CircularProgress
                variant="determinate"
                value={percentage}
                size={100}
                thickness={6}
                sx={{
                  color: percentage > 70 ? '#00c853' : '#ff9800', // Adjust color based on percentage
                }}
              />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="caption" component="div" color="white">
                  {`${solved}/${total}`}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Typography textAlign="center">Solved Problems</Typography>
          <Typography textAlign="center">35 Attempting</Typography>
        </Grid2>

        <Grid2>
          <Typography variant="body1">Problem Breakdown</Typography>
          <Box sx={{ mt: 1 }}>
            <Typography sx={{ color: '#00c853' }}>Easy: {problemStats.easy}/{problemStats.easyTotal}</Typography>
            <Typography sx={{ color: '#ff9800' }}>Medium: {problemStats.medium}/{problemStats.mediumTotal}</Typography>
            <Typography sx={{ color: '#d32f2f' }}>Hard: {problemStats.hard}/{problemStats.hardTotal}</Typography>
          </Box>
        </Grid2>
        
        <Grid2 >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            {badges.map((badge) => (
              <Box key={badge.id} sx={{ textAlign: 'center' }}>
                <Avatar
                  alt={badge.label}
                  src={badge.src}
                  sx={{ width: 60, height: 60 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {badge.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid2>
      </Grid2> */
}
