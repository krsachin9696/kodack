import { Button, CircularProgress } from '@mui/material';

interface SubmitButtonProps {
  signupStatus: string;
  otpStatus: string;
  passwordStatus: string;
  stage: string;
  isDisabled: boolean;
}

const SubmitButton = ({
  signupStatus,
  otpStatus,
  passwordStatus,
  stage,
  isDisabled
}: SubmitButtonProps) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    size="small"
    color="primary"
    sx={{ padding: 2 }}
    disabled={
      isDisabled ||
      signupStatus === 'pending' ||
      otpStatus === 'pending' ||
      passwordStatus === 'pending'
    }
  >
    {signupStatus === 'pending' ||
    otpStatus === 'pending' ||
    passwordStatus === 'pending' ? (
      <CircularProgress sx={{ color: 'white' }} size={20} />
    ) : stage === 'signup' ? (
      'Sign Up'
    ) : stage === 'otp' ? (
      'Verify OTP'
    ) : (
      'Set Password'
    )}
  </Button>
);

export default SubmitButton;
