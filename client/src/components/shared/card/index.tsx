import { Box, Paper } from '@mui/material';

interface CardWrapperProps {
  children: React.ReactNode;
  sx?: object; // Allow passing additional styles
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children, sx }) => {
  return (
    <Paper
      variant='elevation'
      elevation={8}
      sx={{
        p: 2,
        flex: 1,
        color: 'white',
        display: 'flex',
        height: '100%',
        borderRadius: '5px',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        // border: '1px solid rgba(255, 255, 255, 0.1)',
        ...sx, // Merge additional styles
      }}
    >
      {children}
    </Paper>
  );
};

export default CardWrapper;
