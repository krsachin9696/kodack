import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Divider, Paper, Typography } from '@mui/material';
import { ListAltOutlined } from '@mui/icons-material';
import CardWrapper from '../../card';

interface ListSectionProps {
  title: string;
  lists: { listID: string; name: string }[];
  linkPrefix: string;
  isActiveListID: string | undefined;
}

const ListSection: React.FC<ListSectionProps> = ({ title, lists, linkPrefix, isActiveListID }) => {
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
        padding={1}
        gap={1}
        display="flex"
        flexDirection="column"
        sx={{ flex: 1 }}
      >
        {lists.map((list, index) => {
          const isActive = isActiveListID === list.listID;
          return (
            <Link key={index} to={`${linkPrefix}/${list.listID}`} style={{ textDecoration: 'none' }}>
              <Box
                width="100%"
                padding={1}
                borderLeft={4}
                borderColor="skyblue"
                borderRadius={2}
                display="flex"
                flexDirection="column"
                sx={{
                  backgroundColor: isActive
                    ? 'rgba(135, 206, 235, 0.15)'
                    : 'rgba(255, 255, 255, 0.02)',
                  '&:hover': {
                    backgroundColor: isActive
                      ? 'rgba(135, 206, 235, 0.2)'
                      : 'rgba(255, 255, 255, 0.06)',
                  },
                }}
              >
                <Box display="flex" justifyContent="space-between" paddingBottom={1}>
                  <Typography sx={{ fontFamily: 'sans-serif', fontWeight: '600' }}>
                    {list.name}
                  </Typography>
                </Box>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Paper>
  );
};

export default ListSection;
