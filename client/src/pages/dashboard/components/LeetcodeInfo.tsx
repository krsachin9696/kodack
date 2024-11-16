import { Box, Typography, Grid2, Avatar, Skeleton } from '@mui/material';
import ProblemSolvedChart from './Chart';
import { useQuery } from '@tanstack/react-query';
import CardWrapper from '../../../components/shared/card';
import { fetchLeetcodeData } from '../services/fetchLeetcodeData';

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

export interface LeetcodeData {
  solved: SolvedData;
  badges: BadgesData;
}

const LeetcodeInfo = ({ username }: { username: string }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [`LeetcodeData`],
    queryFn: () => fetchLeetcodeData(username),
  });

  if (isLoading || isError || !data)
    return (
      <Grid2
        container
        height="100%"
        spacing={{ xs: 1, md: 2 }}
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

  const { solved, badges } = data;
  const solvedKeys: SolvedKeys[] = ['easySolved', 'mediumSolved', 'hardSolved'];

  return (
    <Grid2
      container
      height="100%"
      spacing={{ xs: 1, md: 2 }}
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
                  alt={badge.displayName}
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
              ({badges.badges[0]?.displayName || 'No Badge Available'})
            </Typography>
          </div>
        </CardWrapper>
      </Grid2>
    </Grid2>
  );
};

export default LeetcodeInfo;
