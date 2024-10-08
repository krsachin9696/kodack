import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { Google, VisibilityOff, Visibility } from '@mui/icons-material';
import { defaultStyles } from '../../constants/defaultStyles';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import __login, { LoginDetailsProps } from './services';
import QueryKeys from '../../constants/queryKeys';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginInfo, setLoginInfo] = useState<LoginDetailsProps>({
    email: '',
    password: '',
  });

  // Validation error states
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [isLoginDisabled, setIsLoginDisabled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const { mutate: onLogin, status: loginStatus } = useMutation({
    mutationFn: () => __login(loginInfo),
    mutationKey: [QueryKeys.LOGIN],
    onSuccess: (data) => {
      toast.info("Login Successfull");

      dispatch(login(data.data.user));
      navigate('/');
    },
    onError: (error: AxiosError<ErrorResponseProps>) => {
      toast.error(error.response?.data?.error);
      setIsLoginDisabled(true);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset the errors when user types again
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
    setIsLoginDisabled(false);
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { email: '', password: '' };

    // Email validation (basic regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!loginInfo.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(loginInfo.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    // Password validation (can add more conditions)
    if (!loginInfo.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Run validation before login
    if (validateForm()) {
      onLogin();
    }
  };

  const handleGoogleLogin = () => {
    window.open('http://localhost:3000/auth/google', '_self');
  };

  return (
    <div className="min-h-screen flex px-[10%]">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 text-white flex-col p-10 bg-[url('/bgsvg.svg')] bg-no-repeat bg-contain bg-center">
        <h1 className=" font-protest font-bold text-6xl mb-10 text-blue-400 p-10">
          KODACK
        </h1>
        
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <form
          className="p-10 rounded-lg w-11/12 max-w-lg flex-col space-y-4"
          style={{ border: '1px solid rgba(51, 60, 77, 0.6)' }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h5" component="h1" className="text-white mb-4">
            Log in
          </Typography>

          {/* Email field */}
          <TextField
            label="Email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
            sx={defaultStyles.inputStyles}
          />

          {/* Password field */}
          <FormControl
            fullWidth
            variant="outlined"
            sx={defaultStyles.inputStyles}
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              error={!!errors.password}
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              value={loginInfo.password}
              onChange={handleChange}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
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

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-blue-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            fullWidth
            variant="contained"
            size="small"
            color="primary"
            className="mt-4 mb-4"
            sx={{ padding: 2 }}
            type="submit"
            disabled={isLoginDisabled || loginStatus === 'pending' }
          >
            {loginStatus === 'pending' ? (
              <CircularProgress sx={{ color: 'white' }} size={20} />
            ) : (
              'Log In'
            )}
          </Button>

          <div className="mt-4 text-center text-white">or</div>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            sx={{ padding: 2 }}
            className="mt-4 text-white border-white"
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </Button>

          <div className="mt-4 text-center text-white">
            New user?{' '}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
