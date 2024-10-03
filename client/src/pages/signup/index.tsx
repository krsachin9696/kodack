import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { defaultStyles } from '../../constants/defaultStyles';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen flex px-[10%]">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 text-white flex-col p-10 bg-[url('/bgsvg.svg')] bg-no-repeat bg-contain bg-center">
        <h1 className="font-oswald font-bold text-6xl mb-10 text-blue-400 p-10">KODACK</h1>
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <div
          className="p-10 rounded-lg w-11/12 max-w-lg flex-col space-y-4"
          style={{ border: '1px solid rgba(51, 60, 77, 0.6)' }}
        >
          <Typography variant="h5" component="h1" className="text-white mb-4">
            Sign up
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            sx={defaultStyles.inputStyles}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            sx={defaultStyles.inputStyles}
          />

          <FormControl variant="outlined" fullWidth sx={defaultStyles.inputStyles}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color='primary'
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            size="small"
            color="primary"
            className="mt-4 mb-4"
            sx={{ padding: 2 }}
          >
            Sign up
          </Button>
          <div className="mt-4 text-center text-white">or</div>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            sx={{ padding: 2 }}
            className="mt-4 text-white border-white"
          >
            Sign in with Google
          </Button>

          <div className="mt-4 text-center text-white">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
