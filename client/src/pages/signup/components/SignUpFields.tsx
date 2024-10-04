import { TextField } from '@mui/material';
import { defaultStyles } from '../../../constants/defaultStyles';
import { SignupDetailsProps } from '../services';

interface SignupFieldsProps {
  signupInfo: SignupDetailsProps;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignupFields = ({ signupInfo, errors, onChange }: SignupFieldsProps) => (
  <>
    <TextField
      label="Full Name"
      variant="outlined"
      name="name"
      value={signupInfo.name}
      onChange={onChange}
      fullWidth
      error={!!errors.name}
      helperText={errors.name}
      sx={defaultStyles.inputStyles}
    />
    <TextField
      label="Email"
      variant="outlined"
      name="email"
      value={signupInfo.email}
      onChange={onChange}
      fullWidth
      error={!!errors.email}
      helperText={errors.email}
      sx={defaultStyles.inputStyles}
    />
    <TextField
      label="Username"
      variant="outlined"
      name="username"
      value={signupInfo.username}
      onChange={onChange}
      fullWidth
      error={!!errors.username}
      helperText={errors.username}
      sx={defaultStyles.inputStyles}
    />
  </>
);

export default SignupFields;
