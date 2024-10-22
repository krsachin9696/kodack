import { useState } from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import VpnLockTwoToneIcon from '@mui/icons-material/VpnLockTwoTone';
import CardWrapper from '../../../components/shared/card';
import CustomModal from '../../../components/base/customModal';
import CreateList from './CreateList';

interface ListItem {
  name: string;
  tags: string[];
  isPublic: boolean;
}

interface ListSectionProps {
  title: string;
  lists: ListItem[];
}

const ListSection: React.FC<ListSectionProps> = ({ title, lists }) => {
  const [modalOpen, setModalOpen] = useState(false);

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
              <AddCircleTwoToneIcon onClick={() => setModalOpen(true)} style={{ cursor: 'pointer' }} />
            </Box>
          </CardWrapper>
          <Divider
            variant="fullWidth"
            sx={{ border: '0.01px solid', borderColor: 'gray' }}
          />
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
                {list.isPublic ? (
                  <PublicOutlinedIcon fontSize="small" />
                ) : (
                  <VpnLockTwoToneIcon fontSize="small" />
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

      <CustomModal
        open={modalOpen}
        setOpen={setModalOpen}
      >
        <CreateList />
      </CustomModal>
    </>
  );
};

export default ListSection;
