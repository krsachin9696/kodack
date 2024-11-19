import { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Divider,
  Pagination,
  Skeleton,
} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import CardWrapper from '../../../components/shared/card';
import CustomModal from '../../../components/base/customModal';
import CreateList from './CreateList';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '../../../constants/queryKeys';
import { Link } from 'react-router-dom';
import apis from '../../../constants/apis';
import fetchLists from '../../../services/getLists';

const PersonalListCard: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.PERSONAL_LISTS, page, limit],
    queryFn: () => fetchLists(apis.list.getPersonalLists, page, limit),
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
              <Typography sx={{ fontWeight: 600 }}>Personal Lists</Typography>
            </Box>
            <Box>
              <AddCircleTwoToneIcon
                onClick={() => setModalOpen(true)}
                style={{ cursor: 'pointer' }}
              />
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
              <Typography sx={{ fontWeight: 600 }} component={Link} to='/list'>Personal Lists</Typography>
            </Box>
            <Box>
              <AddCircleTwoToneIcon
                onClick={() => setModalOpen(true)}
                style={{ cursor: 'pointer' }}
              />
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

      <CustomModal open={modalOpen} setOpen={setModalOpen} name="Create List">
      <CreateList onClose={() => setModalOpen(false)} />
      </CustomModal>
    </>
  );
};

export default PersonalListCard;
