import { TextField, Typography } from '@mui/material';
import { defaultStyles } from '../../../constants/defaultStyles';

interface OtpVerificationProps {
  email: string;
  otp: string;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OtpVerification = ({ email, otp, errors, onChange }: OtpVerificationProps) => (
  <>
    <Typography variant="body1" className="text-white">
      Email: {email}
    </Typography>
    <TextField
      label="OTP"
      variant="outlined"
      value={otp}
      onChange={onChange}
      fullWidth
      error={!!errors.otp}
      helperText={errors.otp}
      sx={defaultStyles.inputStyles}
    />
  </>
);

export default OtpVerification;
