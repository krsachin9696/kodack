import { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import CardWrapper from '../../../components/shared/card';
import CustomModal from '../../../components/base/customModal';
import CreateList from './CreateList';
import queryKeys from '../../../constants/queryKeys';
import apis from '../../../constants/apis';
import { Link } from 'react-router-dom';
import CustomList from '../../../components/shared/CustomList';

const PersonalListCard: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddListClick = () => {
    setModalOpen(true);
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
                onClick={handleAddListClick}
                style={{ cursor: 'pointer' }}
              />
            </Box>
          </CardWrapper>
          <Divider
            variant="fullWidth"
            sx={{ border: '0.01px solid', borderColor: 'gray' }}
          />
        </Box>

        {/* Use CustomList component */}
        <Box
          width="100%"
          padding={1}
          gap={1}
          display="flex"
          flexDirection="column"
        >
        <CustomList
          queryKey={queryKeys.PERSONAL_LISTS}
          apiEndpoint={apis.list.getPersonalLists}
          isPersonalList
          limit={5}
        />
        </Box>
      </CardWrapper>

      {/* Modal for creating a new list */}
      <CustomModal open={modalOpen} setOpen={setModalOpen} name="Create List">
        <CreateList onClose={() => setModalOpen(false)} />
      </CustomModal>
    </>
  );
};

export default PersonalListCard;
