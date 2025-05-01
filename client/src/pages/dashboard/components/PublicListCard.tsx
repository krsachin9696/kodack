import { Box, Typography, Divider } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CardWrapper from '../../../components/shared/card';
import { Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import queryKeys from '../../../constants/queryKeys';
import apis from '../../../constants/apis';
import CustomList from '../../../components/shared/CustomList';

const PublicListCard: React.FC = () => {
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

        {/* Use CustomList Component */}
        <Box
          width="100%"
          padding={1}
          gap={1}
          display="flex"
          flexDirection="column"
        >
          <CustomList
            queryKey={queryKeys.PUBLIC_LISTS}
            apiEndpoint={apis.list.getPublicLists}
            limit={5}
          />
        </Box>
      </CardWrapper>
    </>
  );
};

export default PublicListCard;
