import { useState } from 'react';
import { Box, Typography, Chip, IconButton, Divider, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CustomModal from '../../../components/base/customModal';
import EditListDetail from './EditListDetail'; 
import queryKeys from '../../../constants/queryKeys';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import requestAccessService from '../../../services/requestAccess';

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

  const statusLabel =
    listDetailData.accessStatus !== null
      ? String(listDetailData.accessStatus).toLowerCase()
      : 'unknown';

  const getStatusColor = (
    status: string | undefined,
  ): 'primary' | 'warning' | 'error' | 'success' => {
    if (status === 'approved') return 'success';
    if (status === 'pending') return 'warning';
    if (status === 'rejected') return 'error';
    return 'primary';
  };

  const { mutate: handleRequestAccess } = useMutation({
    mutationFn: (listID: string) => requestAccessService({ listID }),
    mutationKey: [queryKeys.REQUEST_ACCESS],
    onSuccess: () => {
      toast.info('Access Request sent successfully!');
      // refetch();
      listDetailData.accessStatus = 'pending'
    },
    onError: () => {
      toast.error('Some error occurred');
    },
  });

  return (
    <>
      <Box padding={3}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" fontWeight="bold">{listDetailData.listName}</Typography>
          {listDetailData.isOwner ? <IconButton
            color="primary"
            onClick={() => setModalOpen(true)}
            sx={{ marginLeft: 2 }}
          >
            <EditIcon fontSize="small" />
          </IconButton> : listDetailData.accessStatus !== null ? (
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
              size='small'
              onClick={() => {
                handleRequestAccess(listDetailData.listID)}}
              sx={{
                padding: '0px 4px',
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
