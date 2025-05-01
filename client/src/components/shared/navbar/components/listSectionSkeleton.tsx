import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Divider, Paper, Skeleton, Typography } from '@mui/material';
import { ListAltOutlined } from '@mui/icons-material';
import CardWrapper from '../../card';

interface ListSectionProps {
  title: string;
}

const ListSectionSkeleton: React.FC<ListSectionProps> = ({ title }) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '6px',
        backdropFilter: 'blur(10px)',
        color: 'white',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
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
            <ListAltOutlined />
            <Typography sx={{ fontWeight: 600 }} component={Link} to="/list">
              {title}
            </Typography>
          </Box>
        </CardWrapper>
        <Divider variant="fullWidth" sx={{ border: '0.01px solid', borderColor: 'gray' }} />
      </Box>

      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        sx={{ flex: 1 }}
      >
        {[...Array(5)].map((_, index) => (
          <Box key={index} width="100%" padding={1} marginBottom={0}>
            <Skeleton variant="rectangular" width="100%" height={40} />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default ListSectionSkeleton;
