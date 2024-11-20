import { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Divider,
  Pagination,
  Skeleton,
  Button,
} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import CardWrapper from '../../../components/shared/card';
import { useMutation, useQuery } from '@tanstack/react-query';
import queryKeys from '../../../constants/queryKeys';
import { Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import fetchLists from '../../../services/getLists';
import apis from '../../../constants/apis';
import { toast } from 'sonner';
import requestAccessService from '../../list/services/requestAccess';

const PublicListCard: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.PUBLIC_LISTS, page, limit],
    queryFn: () => fetchLists(apis.list.getPublicLists, page, limit),
  });

  const { mutate: handleRequestAccess } = useMutation({
    mutationFn: (listID: string) => requestAccessService({ listID }),
    mutationKey: [queryKeys.REQUEST_ACCESS],
    onSuccess: (data) => {
      toast.info('Access Request sent successfully!');
    },
    onError: () => {
      toast.error('Some error occurred');
    },
  });

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
        <Box marginBottom={1} width="100%">
          <CardWrapper
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 1,
            }}
          >
            <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
              <ListAltIcon />
              <Typography sx={{ fontWeight: 600 }} component={Link} to="/list">
                Public Lists
              </Typography>
            </Box>
            <Box>
              <AddCircleTwoToneIcon style={{ cursor: 'pointer' }} />
            </Box>
          </CardWrapper>
          <Divider
            variant="fullWidth"
            sx={{ border: '0.01px solid', borderColor: 'gray' }}
          />
        </Box>

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

  const lists = data?.data.lists;
  const totalPages = data?.data.totalPages;

  // Handle page change
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  return (
    <>
      <CardWrapper
        sx={{
          p: 0,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
        }}
      >
        <Box marginBottom={1} width="100%">
          <CardWrapper
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 1,
            }}
          >
            <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
              <ListAltIcon />
              <Typography sx={{ fontWeight: 600 }} component={Link} to="/list">
                Public Lists
              </Typography>
            </Box>
            <Link to="/list" style={{ textDecoration: 'none' }}>
              <Box style={{ cursor: 'pointer' }}>
                <KeyboardArrowRightIcon />
              </Box>
            </Link>
          </CardWrapper>
          <Divider
            variant="fullWidth"
            sx={{ border: '0.01px solid', borderColor: 'gray' }}
          />
        </Box>

        <Box
          width="100%"
          padding={1}
          gap={1}
          display="flex"
          flexDirection="column"
        >
          {lists &&
            lists.map((list, index) => {
              const statusLabel =
                list.accessStatus !== null
                  ? String(list.accessStatus).toLowerCase()
                  : 'unknown';

              function getStatusColor(
                status: string | undefined,
              ): 'primary' | 'warning' | 'error' | 'success' {
                if (status === 'approved') {
                  return 'success';
                } else if (status === 'pending') {
                  return 'warning';
                } else if (status === 'rejected') {
                  return 'error';
                }

                return 'primary';
              }

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
                    {list.accessStatus ? (
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
    </>
  );
};

export default PublicListCard;
