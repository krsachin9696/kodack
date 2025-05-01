import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { ReactNode } from 'react';
import { IconButton, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CardWrapper from '../shared/card';

interface CustomModalProps {
  children: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  width?: number;
  name: string;
}

const style = {
  padding: 0,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'rgba(255, 255, 255, 0.0)',
  borderRadius: 2,
  boxShadow: 24,
  maxHeight: 'calc(100vh - 100px)',
  overflow: 'auto',
};

export default function CustomModal({ children, ...props }: CustomModalProps) {
  const { open, setOpen, name, width } = props;

  const handleClose = (): void => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 200,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{ ...style, width: width ? `${width}px` : 600, border: '0px' }}
          >
            <CardWrapper
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(10px)',
                p: 0,
              }}
            >
              <Box
                padding={1}
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              >
                
                <Typography sx={{ fontWeight: '600' }}>{name}</Typography>
                <IconButton onClick={handleClose}>
                  <HighlightOffIcon sx={{ color: 'white' }} />
                </IconButton>
              </Box>

              {children}
            </CardWrapper>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
