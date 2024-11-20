import { Box, Chip, Pagination, Skeleton, Typography } from '@mui/material';
import CardWrapper from '../../../components/shared/card';
import { useState } from 'react';
import queryKeys from '../../../constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { useNavigateToListDetail } from '../../../utils/navigateUtils';
import fetchLists from '../../../services/getLists';
import apis from '../../../constants/apis';

export default function PersonalList() {
  const [page, setPage] = useState(1);
  const limit = 7;

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.PERSONAL_LISTS, page, limit],
    queryFn: () => fetchLists(apis.list.getPersonalLists, page, limit),
  });

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const navigateToListDetail = useNavigateToListDetail();

  if (isLoading || isError) {
    return (
      <CardWrapper
        sx={{
          p: 0,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
        }}
      >
        <Box
          width="100%"
          padding={1}
          gap={1}
          display="flex"
          flexDirection="column"
        >
          {[...Array(limit)].map((_, index) => (
            <Box
              key={index}
              width="100%"
              padding={1}
              borderLeft={4}
              borderColor="skyblue"
              borderRadius={2}
              display="flex"
              flexDirection="column"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <Box display="flex" justifyContent="space-between">
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton
                  variant="rounded"
                  width="10%"
                  height={24}
                  sx={{ marginTop: 1 }}
                />
              </Box>
              <Box display="flex" justifyContent="flex-start" gap={2}>
                <Skeleton
                  variant="rounded"
                  width="10%"
                  height={20}
                  sx={{ marginTop: 1 }}
                />
                <Skeleton
                  variant="rounded"
                  width="10%"
                  height={20}
                  sx={{ marginTop: 1 }}
                />
                <Skeleton
                  variant="rounded"
                  width="10%"
                  height={20}
                  sx={{ marginTop: 1 }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </CardWrapper>
    );
  }
  if (isError) return <p>Error loading lists...</p>;

  const lists = data?.data?.lists;
  const totalPages = data?.data?.totalPages;

  return (
    <CardWrapper sx={{ backgroundColor: 'transparent', p: 0 }}>
      <Box
        width="100%"
        gap={1}
        display="flex"
        flexDirection="column"
      >
        {lists &&
          lists.map((list, index) => (
            <Box
              key={index}
              width="100%"
              padding={1}
              borderLeft={4}
              borderColor="skyblue"
              borderRadius={2}
              display="flex"
              flexDirection="column"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                },
              }}
              onClick={() => navigateToListDetail(list.listID)}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                paddingBottom={1}
              >
                <Typography
                  sx={{ fontFamily: 'sans-serif', fontWeight: '600' }}
                >
                  {list.name}
                </Typography>
                {list.isPublic ? (
                  <Chip
                    label="public"
                    color="warning"
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Chip
                    label="private"
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>
              <Box display="flex" justifyContent="flex-start" gap={1}>
                {list.tags.map((tag, tagIndex) => (
                  <Chip
                    key={tagIndex}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      color: 'white',
                    }}
                  />
                ))}
              </Box>
            </Box>
          ))}
      </Box>
      {totalPages && totalPages > 1 && (
        <Box width="100%" mt={2} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: 'skyblue',
                  color: 'black',
                },
              },
              '& .MuiPaginationItem-icon': {
                color: 'white',
              },
            }}
          />
        </Box>
      )}
    </CardWrapper>
  );
}
