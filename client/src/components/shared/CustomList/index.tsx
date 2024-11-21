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
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import queryKeys from '../../../constants/queryKeys';
import fetchLists from '../../../services/getLists';
import { useNavigateToListDetail } from '../../../utils/navigateUtils';
import requestAccessService from '../../../services/requestAccess';

// Define the types for the props
interface CustomListProps {
  queryKey: string;
  apiEndpoint: string;
  isPersonalList?: boolean;
  limit: number;
}

const CustomList = ({
  queryKey,
  apiEndpoint,
  isPersonalList = false,
  limit,
}: CustomListProps) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [queryKey, page, limit],
    queryFn: () => fetchLists(apiEndpoint, page, limit),
  });

  const { mutate: handleRequestAccess } = useMutation({
    mutationFn: (listID: string) => requestAccessService({ listID }),
    mutationKey: [queryKeys.REQUEST_ACCESS],
    onSuccess: () => {
      toast.info('Access Request sent successfully!');
      refetch();
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
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
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

  const lists = data?.data?.lists;
  const totalPages = data?.data?.totalPages;

  return (
    <CardWrapper sx={{ backgroundColor: 'transparent', p: 0 }}>
      <Box width="100%" gap={1} display="flex" flexDirection="column">
        {lists &&
          lists.map((list, index) => {
            const statusLabel =
              list.accessStatus !== null
                ? String(list.accessStatus).toLowerCase()
                : 'unknown';

            const getStatusColor = (
              status: string | undefined,
            ): 'primary' | 'warning' | 'error' | 'success' => {
              if (status === 'approved') return 'success';
              if (status === 'pending') return 'warning';
              if (status === 'rejected') return 'error';
              return 'primary';
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
                  {isPersonalList ? (
                    <Chip
                      label={list.isPublic ? 'public' : 'private'}
                      color={list.isPublic ? 'warning' : 'primary'}
                      variant="outlined"
                      size="small"
                    />
                  ) : list.accessStatus !== null ? (
                    <Chip
                      label={statusLabel}
                      color={getStatusColor(statusLabel)}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequestAccess(list.listID);
                      }}                    
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
                {!isPersonalList ?? (
                  <Typography variant="body2" sx={{ color: 'gray' }}>
                    {list.owner}
                  </Typography>
                )}
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
              '& .MuiPaginationItem-icon': { color: 'white' },
            }}
          />
        </Box>
      )}
    </CardWrapper>
  );
};

export default CustomList;
