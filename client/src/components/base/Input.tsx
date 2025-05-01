import { TextField, TextFieldProps } from '@mui/material';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'variant'> {
  label: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  sx,
  ...rest
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      error={!!error}
      helperText={helperText}
      sx={sx}
      {...rest} 
    />
  );
};

export default CustomTextField;
