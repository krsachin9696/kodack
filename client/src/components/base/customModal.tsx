import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { ReactNode } from 'react';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import CardWrapper from '../shared/card';

interface CustomModalProps {
  children: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  width?: number;
}

const style = {
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
  const { open, setOpen, width } = props;

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
              }}
            >
              <IconButton onClick={handleClose}>
                <Close sx={{ color: 'white' }} />
              </IconButton>
              {children}
            </CardWrapper>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
