import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Divider,
  CircularProgress,
  Pagination,
} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import CardWrapper from '../../../components/shared/card';
import { useQuery } from '@tanstack/react-query';
import fetchPersonalLists from '../services/getPersonalLists';
// import fetchPublicLists from '../services/getPublicLists';

interface ListCardProps {
  title: string;
  queryKey: string;
  onAdd: () => void; // Prop for handling add action
}

const ListCard: React.FC<ListCardProps> = ({ title, queryKey, onAdd }) => {
  const [page, setPage] = React.useState(1);
  const limit = 5;

  // Determine the appropriate fetch function based on the title
  // const fetchLists = title === "Public Lists" ? fetchPublicLists : fetchPersonalLists;

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey, page, limit],
    queryFn: () => fetchPersonalLists(page, limit),
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <p>Error loading lists...</p>;

  const lists = data?.data.lists || [];
  const totalPages = data?.data.totalPages;

  // Handle page change
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
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
              <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
            </Box>
            <Box>
              <AddCircleTwoToneIcon
                onClick={onAdd} // Call onAdd when clicked
                style={{ cursor: 'pointer' }}
              />
            </Box>
          </CardWrapper>
          <Divider variant="fullWidth" sx={{ border: '0.01px solid', borderColor: 'gray' }} />
        </Box>

        <Box width="100%" padding={1} gap={1} display="flex" flexDirection="column">
          {lists.map((list, index) => (
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
              <Box display="flex" justifyContent="space-between" paddingBottom={1}>
                <Typography sx={{ fontFamily: 'sans-serif', fontWeight: '600' }}>
                  {list.name}
                </Typography>
                {title === "Public Lists" ? (
                  <Chip
                    label={list.access ? "granted" : "pending"}
                    color={list.access ? "warning" : "primary"}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Chip
                    label={list.isPublic ? "public" : "private"}
                    color={list.isPublic ? "warning" : "primary"}
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
    </>
  );
};

export default ListCard;
