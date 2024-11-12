import React, { useState } from 'react';
import { Box, Typography, Chip, Button, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CustomModal from '../../../components/base/customModal';
import EditListDetail from './EditListDetail'; // This will be your edit modal component

interface ListDetailProps {
  list: {
    name: string;
    description: string;
    tags: string[];
  };
}

const ListDetail: React.FC<ListDetailProps> = ({ list }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Box padding={3}>
        <Typography variant="h4" fontWeight="bold">{list.name}</Typography>
        <Box marginTop={2} display="flex" gap={1}>
          {list.tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
          ))}
        </Box>
        <Box marginTop={2}>
          <Typography variant="body1">{list.description}</Typography>
        </Box>
        <Box marginTop={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => setModalOpen(true)}
          >
            Edit
          </Button>
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
