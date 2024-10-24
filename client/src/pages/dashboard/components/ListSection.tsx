import { useState } from 'react';
import { Box, Typography, Chip, Divider, CircularProgress } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import CardWrapper from '../../../components/shared/card';
import CustomModal from '../../../components/base/customModal';
import CreateList from './CreateList';
import fetchPaginatedLists, { ListItemProps } from '../services/getPaginatedLists';
import { useQuery } from '@tanstack/react-query';

interface ListSectionProps {
  title: string;
  lists: ListItemProps[];
}

const ListSection: React.FC<ListSectionProps> = ({ title, lists }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['lists', page, limit],
    queryFn: () => fetchPaginatedLists(page, limit),
    // keepPreviousData: true,
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <p>Error loading lists...</p>;

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
      </CardWrapper>

      <CustomModal open={modalOpen} setOpen={setModalOpen} name="Create List">
        <CreateList />
      </CustomModal>
    </>
  );
};

export default ListSection;
