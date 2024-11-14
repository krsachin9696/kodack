import React, { useState } from 'react';
import { Box, Typography, Chip, IconButton, Divider, Skeleton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CustomModal from '../../../components/base/customModal';
import EditListDetail from './EditListDetail'; // Edit modal component
import { useQuery } from '@tanstack/react-query';
import fetchListDetail from '../services/getListDetail'; // Assuming the service path is correct
import queryKeys from '../../../constants/queryKeys';

interface ListDetailProps {
  listID: string;
}

const ListDetail: React.FC<ListDetailProps> = ({ listID }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Use query to fetch the list details
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.LIST_DETAILS, listID],
    queryFn: () => fetchListDetail(listID),
  });

  // Handle loading and error states
  if (isLoading) {
    return (
      <Box padding={3}>
        <Skeleton variant="text" width="60%" height={40} />
        <Skeleton variant="rectangular" width="100%" height={120} sx={{ marginTop: 2 }} />
        <Skeleton variant="text" width="50%" height={20} sx={{ marginTop: 2 }} />
        <Skeleton variant="rounded" width="20%" height={40} sx={{ marginTop: 2 }} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box padding={3}>
        <Typography color="error">Error loading list details...</Typography>
      </Box>
    );
  }
  
  // Destructure the data received from the query
  const list = data?.data;

  if (!list) {
    return (
      <Box padding={3}>
        <Typography>No list data found.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box padding={3}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" fontWeight="bold">{list.listName}</Typography>
          <IconButton
            color="primary"
            onClick={() => setModalOpen(true)}
            sx={{ marginLeft: 2 }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box marginTop={2} display="flex" gap={1}>
          {list.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            />
          ))}
        </Box>
        <Box marginTop={2}>
          <Typography variant="body1">{list.description}</Typography>
        </Box>
      </Box>
      <Divider sx={{ marginY: 2 }} />
      <CustomModal open={modalOpen} setOpen={setModalOpen} name="Edit List">
        <EditListDetail list={list} onClose={() => setModalOpen(false)} />
      </CustomModal>
    </>
  );
};

export default ListDetail;
