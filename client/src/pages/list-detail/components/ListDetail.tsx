import React, { useState } from 'react';
import { Box, Typography, Chip, IconButton, Divider, Skeleton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CustomModal from '../../../components/base/customModal';
import EditListDetail from './EditListDetail'; // Edit modal component
// import { useQuery } from '@tanstack/react-query';
// import getListDetail from '../services/getListDetail'; // Assuming the service path is correct
// import queryKeys from '../../../constants/queryKeys';

interface ListDetailProps {
  listDetailData: {
    listID: string;
    listName: string;
    description: string;
    tags: string[];
    isOwner: boolean;
    accessStatus: AccessStatus;
  };
}

const ListDetail = ({ listDetailData }: ListDetailProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  // console.log(listDetailData, 'listDetail Data')

  return (
    <>
      <Box padding={3}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" fontWeight="bold">{listDetailData.listName}</Typography>
          {listDetailData.isOwner && <IconButton
            color="primary"
            onClick={() => setModalOpen(true)}
            sx={{ marginLeft: 2 }}
          >
            <EditIcon fontSize="small" />
          </IconButton>}
        </Box>
        <Box marginTop={2} display="flex" gap={1}>
          {listDetailData.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            />
          ))}
        </Box>
        <Box marginTop={2}>
          <Typography variant="body1">{listDetailData.description}</Typography>
        </Box>
      </Box>
      <Divider sx={{ marginY: 2 }} />
      <CustomModal open={modalOpen} setOpen={setModalOpen} name="Edit List">
        <EditListDetail list={listDetailData} onClose={() => setModalOpen(false)} />
      </CustomModal>
    </>
  );
};

export default ListDetail;
