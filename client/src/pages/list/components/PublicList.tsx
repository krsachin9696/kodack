import {
  Box,
  Button,
  Chip,
  Pagination,
  Skeleton,
  Typography,
} from '@mui/material';
import CardWrapper from '../../../components/shared/card';
import { useState } from 'react';
import queryKeys from '../../../constants/queryKeys';
import { useMutation, useQuery } from '@tanstack/react-query';
import fetchPublicLists, { AccessStatus } from '../services/getPublicLists';
import { toast } from 'sonner';
import requestAccessService from '../services/requestAccess';
import { useNavigateToListDetail } from '../../../utils/navigateUtils';

export default function PublicList() {
  const [page, setPage] = useState(1);
  const limit = 7;

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.PUBLIC_LISTS, page, limit],
    queryFn: () => fetchPublicLists(page, limit),
    
  });

  
  const { mutate: handleRequestAccess } = useMutation({
    mutationFn: (listID: string) => requestAccessService({listID}),
    mutationKey: [queryKeys.REQUEST_ACCESS],
    onSuccess: (data) => {
      console.log(data)
      toast.info("Access Request sent successfully!");
    },
    onError: () => {
      toast.error('Some error occurred');
    },
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

  const lists = data?.lists;
  const totalPages = data?.page;

  return (
    <CardWrapper sx={{ backgroundColor: 'transparent', p: 0 }}>
      <Box width="100%" gap={1} display="flex" flexDirection="column">
        {lists &&
          lists.map((list, index) => {
            // Convert status to lowercase
            
            const statusLabel =
              list.accessStatus !== null
                ? (String(list.accessStatus)).toLowerCase()
                : 'unknown';

            // Map status to colors
            const statusColors: {
              [key in AccessStatus]: 'primary' | 'secondary' | 'error';
            } = {
              [AccessStatus.PENDING]: 'secondary',
              [AccessStatus.APPROVED]: 'primary',
              [AccessStatus.REJECTED]: 'error',
            };
            return (
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
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  },
                }}
                //onClick={() => navigateToListDetail(list.listID)}
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
                  {list.accessStatus !== null ? (
                    <Chip
                      label={statusLabel}
                      color={statusColors[list.accessStatus]}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleRequestAccess(list.listID)}
                      sx={{
                        padding: '2px 4px',
                        borderRadius: '4px',
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: 'rgba(135, 206, 250, 0.2)',
                        },
                      }}
                    >
                      Request Access
                    </Button>
                  )}
                </Box>
                <Box display="flex" justifyContent="space-between" gap={1}>
                  <Box>
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
                  <Typography variant="body2" sx={{ color: 'gray' }}>
                    {list.owner}
                  </Typography>
                </Box>
              </Box>
            );
          })}
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
