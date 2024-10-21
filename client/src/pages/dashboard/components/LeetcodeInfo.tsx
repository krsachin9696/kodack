import { Box, Typography, Grid2, Avatar, Skeleton } from '@mui/material';
import ProblemSolvedChart from './Chart';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface Badge {
  id: string;
  displayName: string;
  icon: string;
  creationDate: string;
}

interface BadgesData {
  badgesCount: number;
  badges: Badge[];
}

export interface SolvedData {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

interface LeetcodeData {
  solved: SolvedData;
  badges: BadgesData;
}

// Dummy Data
// const dummyData = {
//   solved: {
//     solvedProblem: 803,
//     easySolved: 276,
//     mediumSolved: 439,
//     hardSolved: 88,
//   },
//   badges: {
//     badgesCount: 15,
//     badges: [
//       {
//         id: '4888387',
//         displayName: '50 Days Badge 2024',
//         icon: 'https://assets.leetcode.com/static_assets/marketing/2024-50-lg.png',
//         creationDate: '2024-09-07',
//       },
//       {
//         id: '2887088',
//         displayName: 'Annual Badge 2023',
//         icon: 'https://assets.leetcode.com/static_assets/marketing/lg2023.png',
//         creationDate: '2023-12-16',
//       },
//       {
//         id: '2887087',
//         displayName: '50 Days Badge 2023',
//         icon: 'https://assets.leetcode.com/static_assets/marketing/lg50.png',
//         creationDate: '2023-12-16',
//       },
//     ],
//   },
// };

// Fetching only the relevant data from the APIs
const fetchLeetcodeData = async (username: string): Promise<LeetcodeData> => {
  console.log('ye function call ho rha hai', username);
  const baseUrl = `https://alfa-leetcode-api.onrender.com/${username}`;

  // Fetching the solved and badges data
  const [solvedResponse, badgesResponse] = await Promise.all([
    axios.get(`${baseUrl}/solved`),
    axios.get(`${baseUrl}/badges`),
  ]);

  // Destructuring only the necessary data
  const { solvedProblem, easySolved, mediumSolved, hardSolved } =
    solvedResponse.data;
  const { badgesCount, badges } = badgesResponse.data;

  // Returning the required data
  return {
    solved: {
      solvedProblem,
      easySolved,
      mediumSolved,
      hardSolved,
    },
    badges: {
      badgesCount,
      badges: badges.slice(0, 3),
    },
  };
};

const LeetcodeInfo = ({ username }: { username: string }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [`LeetcodeData`],
    queryFn: () => fetchLeetcodeData(username),
  });

  if (isLoading || isError)
    return (
      <>
        <Grid2
          container
          height="100%"
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 1, sm: 8, md: 12, lg: 12 }}
          sx={{ display: 'flex' }}
        >
          {/* Chart Section */}
          <Grid2 size={{ xs: 1, sm: 8, md: 12, lg: 5 }}>
            <Box
              height="100%"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '5px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
                justifyContent: 'space-around',
              }}
            >
              <Skeleton
                variant="circular"
                width={100}
                height={100}
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
              />
              <Box
                // width='100%'
                gap={2}
                sx={{
                  mb: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <Skeleton
                  variant="rounded"
                  width={100}
                  height={50}
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
                />
                <Skeleton
                  variant="rounded"
                  width={100}
                  height={50}
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
                />
                <Skeleton
                  variant="rounded"
                  width={100}
                  height={50}
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
                />
              </Box>
            </Box>
          </Grid2>

          {/* Badges Section */}
          <Grid2 size={{ xs: 1, sm: 8, md: 12, lg: 7 }}>
            <Box
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '5px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <div className="flex items-start flex-col w-full">
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  }}
                  width="100%"
                />
              </div>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                  height: '100%',
                }}
              >
                <Skeleton
                  variant="circular"
                  width={100}
                  height={100}
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
                />
                <Skeleton
                  variant="circular"
                  width={100}
                  height={100}
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
                />
                <Skeleton
                  variant="circular"
                  width={100}
                  height={100}
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
                />
              </Box>
              <div className="flex items-start flex-col w-full">
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={50}
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
                />
              </div>
            </Box>
          </Grid2>
        </Grid2>
      </>
    );
  if (isError) return <Typography>Error fetching Leetcode data</Typography>;

  console.log(data, 'this is data');
  if (!data) return <Typography>No data available</Typography>;
  const { solved, badges } = data;

  return (
    <>
      <Grid2
        container
        height="100%"
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 1, sm: 8, md: 12, lg: 12 }}
        sx={{ display: 'flex' }}
      >
        {/* Chart Section */}
        <Grid2 size={{ xs: 1, sm: 8, md: 12, lg: 5 }}>
          <Box
            height="100%"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '5px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              justifyContent: 'center',
            }}
          >
            <ProblemSolvedChart solved={solved} />
            <Box
              // width='100%'
              gap={2}
              sx={{
                mb: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <Box
                sx={{
                  p: 0.2,
                  pl: 2,
                  pr: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: '5px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }}
              >
                <div className="text-label-3 text-sm text-green-400 font-bold">
                  Easy
                </div>
                <div className="text-label-3 text-sm">{solved.easySolved}</div>
              </Box>
              <Box
                sx={{
                  p: 0.2,
                  pl: 2,
                  pr: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: '5px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }}
              >
                <div className="text-label-3 text-sm text-yellow-600 font-bold">
                  Med.
                </div>
                <div className="text-label-3 text-sm">
                  {solved.mediumSolved}
                </div>
              </Box>
              <Box
                sx={{
                  p: 0.2,
                  pl: 2,
                  pr: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: '5px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }}
              >
                <div className="text-label-3 text-sm text-red-500 font-bold">
                  Hard
                </div>
                <div className="text-label-3 text-sm">{solved.hardSolved}</div>
              </Box>
            </Box>
          </Box>
        </Grid2>

        {/* Badges Section */}
        <Grid2 size={{ xs: 1, sm: 8, md: 12, lg: 7 }}>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '5px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <div className="flex items-start flex-col w-full">
              <div className="text-label-3 text-xs text-gray-300">Badges</div>
              <Typography variant="h6" sx={{ marginTop: '0px' }}>
                ({badges.badgesCount})
              </Typography>
            </div>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                height: '100%',
              }}
            >
              {badges.badges.map((badge: Badge, index: number) => (
                <Box
                  key={badge.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    src={badge.icon}
                    alt="B"
                    sx={{
                      mb: 2,
                      width: index === 1 ? 95 : 70,
                      height: index === 1 ? 95 : 70,
                    }}
                  />
                </Box>
              ))}
            </Box>
            <div className="flex items-start flex-col w-full">
              <div className="text-label-3 text-xs text-gray-300">
                Most Recent Badge
              </div>
              <Typography variant="h6" sx={{ marginTop: '0px' }}>
                ({badges.badges[0].displayName})
              </Typography>
            </div>
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
};

export default LeetcodeInfo;
