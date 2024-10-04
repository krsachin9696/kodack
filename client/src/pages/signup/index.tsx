import {
  Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { defaultStyles } from '../../constants/defaultStyles';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import __signup, { SignupDetailsProps } from './services';
import QueryKeys from '../../constants/queryKeys';

const Signup = () => {
  
  const [signupInfo, setSignupInfo] = useState<SignupDetailsProps>({
    name: '',
    email: '',
    username: '',
  });
  
  // Validation error states
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    username: ''
  });

  const navigate = useNavigate();

  const { mutate: onSignup, status: signupStatus } = useMutation({
    mutationFn: () => __signup(signupInfo),
    mutationKey: [QueryKeys.SIGNUP],
    onSuccess: (data) => {
      alert("otp sent to your email");
      console.log("singup response", data);

      navigate('/');
    },
    onError: (error) => {
      console.error('Error while signing up', error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset the errors when user types again
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { name: '', email: '', username: '' };

    // Name validation
    if (!signupInfo.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!signupInfo.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(signupInfo.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    // Name validation
    if (!signupInfo.username) {
      newErrors.username = 'UserName is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Run validation before signup
    if (validateForm()) {
      console.log(signupInfo);
      onSignup();
    }
  };

  return (
    <div className="min-h-screen flex px-[10%]">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 text-white flex-col p-10 bg-[url('/bgsvg.svg')] bg-no-repeat bg-contain bg-center">
        <h1 className="font-oswald font-bold text-6xl mb-10 text-blue-400 p-10">KODACK</h1>
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <form
          className="p-10 rounded-lg w-11/12 max-w-lg flex-col space-y-4"
          style={{ border: '1px solid rgba(51, 60, 77, 0.6)' }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h5" component="h1" className="text-white mb-4">
            Sign up
          </Typography>

          {/* Name field */}
          <TextField
            label="Full Name"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            name="name"
            value={signupInfo.name}
            onChange={handleChange}
            sx={defaultStyles.inputStyles}
          />

          {/* Email field */}
          <TextField
            label="Email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            name="email"
            value={signupInfo.email}
            onChange={handleChange}
            sx={defaultStyles.inputStyles}
          />

          {/* UserName field */}
          <TextField
            label="Username"
            variant="outlined"
            error={!!errors.username}
            helperText={errors.username}
            fullWidth
            name="username"
            value={signupInfo.username}
            onChange={handleChange}
            sx={defaultStyles.inputStyles}
          />

          <Button
            fullWidth
            variant="contained"
            size="small"
            color="primary"
            className="mt-4 mb-4"
            sx={{ padding: 2 }}
            type="submit"
            disabled={signupStatus === 'pending'}
          >
            {signupStatus === 'pending' ? (
              <CircularProgress sx={{ color: 'white' }} size={20} />
            ) : (
              'Sign Up'
            )}
          </Button>

          <div className="mt-4 text-center text-white">or</div>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            sx={{ padding: 2 }}
            className="mt-4 text-white border-white"
          >
            Sign up with Google
          </Button>

          <div className="mt-4 text-center text-white">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
