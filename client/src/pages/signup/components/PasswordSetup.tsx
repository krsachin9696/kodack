import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { defaultStyles } from '../../../constants/defaultStyles';

interface PasswordSetupProps {
  password: string;
  confirmPassword: string;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordSetup = ({
  password,
  confirmPassword,
  errors,
  onChange,
}: PasswordSetupProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      {/* Password Field */}
      <FormControl fullWidth variant="outlined" sx={defaultStyles.inputStyles}>
        <InputLabel htmlFor="outlined-adornment-password" error={!!errors.password}>
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          error={!!errors.password}
          value={password}
          onChange={onChange}
          name="password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                color="primary"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        <Typography variant="caption" color="error">
          {errors.password}
        </Typography>
      </FormControl>

      {/* Confirm Password Field */}
      <FormControl fullWidth variant="outlined" sx={defaultStyles.inputStyles}>
        <InputLabel
          htmlFor="outlined-adornment-confirm-password"
          error={!!errors.confirmPassword}
        >
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-confirm-password"
          type={showConfirmPassword ? 'text' : 'password'}
          error={!!errors.confirmPassword}
          value={confirmPassword} // Controlled value
          onChange={onChange}
          name="confirmPassword"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                color="primary"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
        />
        <Typography variant="caption" color="error">
          {errors.confirmPassword}
        </Typography>
      </FormControl>
    </>
  );
};

export default PasswordSetup;
