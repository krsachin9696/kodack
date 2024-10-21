import { Box, Typography, Grid2, Avatar, Skeleton } from '@mui/material';
import ProblemSolvedChart from './Chart';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import CardWrapper from '../../../components/shared/card';

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

type SolvedKeys = keyof SolvedData;

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
      <Grid2
        container
        height="100%"
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 1, sm: 8, md: 12, lg: 12 }}
        sx={{ display: 'flex' }}
      >
        {/* Chart Section */}
        <Grid2 size={{ xs: 1, sm: 8, md: 12, lg: 5 }}>
          <CardWrapper>
            <Skeleton
              variant="circular"
              width={100}
              height={100}
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
            />
            <Box
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
          </CardWrapper>
        </Grid2>

        {/* Badges Section */}
        <Grid2 size={{ xs: 1, sm: 8, md: 12, lg: 7 }}>
          <CardWrapper>
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
          </CardWrapper>
        </Grid2>
      </Grid2>
    );

  if (isError) return <Typography>Error fetching Leetcode data</Typography>;
  if (!data) return <Typography>No data available</Typography>;

  const { solved, badges } = data;
  const solvedKeys: SolvedKeys[] = ['easySolved', 'mediumSolved', 'hardSolved'];

  return (
    <Grid2
      container
      height="100%"
      spacing={{ xs: 1, md: 1 }}
      columns={{ xs: 1, sm: 8, md: 12, lg: 12 }}
      sx={{ display: 'flex' }}
    >
      {/* Chart Section */}
      <Grid2 size={{ xs: 1, sm: 8, md: 12, lg: 5 }}>
        <CardWrapper>
          <ProblemSolvedChart solved={solved} />
          <Box
            gap={2}
            sx={{
              mb: 2,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            {solvedKeys.map((key) => (
              <Box
                key={key}
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
                }}
              >
                <div
                  className={`text-label-3 text-sm ${key === 'easySolved' ? 'text-green-400' : key === 'mediumSolved' ? 'text-yellow-600' : 'text-red-500'} font-bold`}
                >
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace('Solved', '')}
                </div>
                <div className="text-label-3 text-sm">{solved[key]}</div>
              </Box>
            ))}
          </Box>
        </CardWrapper>
      </Grid2>

      {/* Badges Section */}
      <Grid2 size={{ xs: 1, sm: 8, md: 12, lg: 7 }}>
        <CardWrapper>
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
        </CardWrapper>
      </Grid2>
    </Grid2>
  );
};

export default LeetcodeInfo;
