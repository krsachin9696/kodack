import {
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { defaultStyles } from '../../constants/defaultStyles';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { __sendOtp, SendOtpProps } from './services';
import { __verifyOtp, VerifyOtpProps } from './services';
import { __resetPassword, ResetPasswordProps } from './services';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import queryKeys from '../../constants/queryKeys';

const ForgotPassword = () => {
  const [step, setStep] = useState('enterEmail');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    otp: '',
    password: '',
    confirmPassword: '',
  });
  const [isActionDisabled, setIsActionDisabled] = useState(false);

  const [resendTimer, setResendTimer] = useState(30); // Initial timer for "Resend OTP"

  const navigate = useNavigate();

  // Timer logic for "Resend OTP"
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Step 1: Send OTP
  const { mutate: sendOtp, status: sendOtpStatus } = useMutation({
    mutationFn: () => __sendOtp({ email }),
    mutationKey: [queryKeys.FORGOT_PASSWORD],
    onSuccess: () => {
      toast.info(
        'An OTP has been sent to your email if the provided email is valid.',
      );
      setStep('enterOtp');
      setResendTimer(30); // Reset timer on successful OTP send
    },
    onError: (error: AxiosError<ErrorResponseProps>) => {
      toast.error(error.response?.data?.error || 'Error sending OTP');
      setIsActionDisabled(true);
    },
  });

  // Step 2: Verify OTP
  const { mutate: verifyOtp, status: verifyOtpStatus } = useMutation({
    mutationFn: () => __verifyOtp({ email, otp }),
    mutationKey: [queryKeys.VERIFY_OTP],
    onSuccess: () => {
      toast.info('OTP verified');
      setStep('enterNewPassword');
    },
    onError: (error: AxiosError<ErrorResponseProps>) => {
      toast.error(error.response?.data?.error || 'Invalid OTP');
      setIsActionDisabled(true);
    },
  });

  // Step 3: Reset Password
  const { mutate: resetPassword, status: resetPasswordStatus } = useMutation({
    mutationFn: () =>
      __resetPassword({
        email,
        password: passwords.newPassword,
        confirmPassword: passwords.confirmPassword,
      }),
    mutationKey: [queryKeys.SETUP_PASSWORD],
    onSuccess: () => {
      toast.info('Password reset successfully');
      navigate('/login');
    },
    onError: (error: AxiosError<ErrorResponseProps>) => {
      toast.error(error.response?.data?.error || 'Password reset failed');
      setIsActionDisabled(true);
    },
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (step === 'enterEmail') setEmail(value);
    else if (step === 'enterOtp') setOtp(value);
    else setPasswords((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: '' }));
    setIsActionDisabled(false);
  };

  // Validate email
  const validateStep1 = () => {
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Email is required' }));
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!otp) {
      setErrors((prev) => ({ ...prev, otp: 'OTP is required' }));
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    let isValid = true;

    const newErrors = { email: '', otp: '', password: '', confirmPassword: '' };

    if (!passwords.newPassword) {
      newErrors.password = 'New password is required';
      isValid = false;
    } else if (passwords.newPassword.length < 8) {
      newErrors.password = 'Password should be at least 8 characters';
      isValid = false;
    } else if (!/[A-Z]/.test(passwords.newPassword)) {
      newErrors.password =
        'Password must contain at least one uppercase letter';
      isValid = false;
    } else if (!/[a-z]/.test(passwords.newPassword)) {
      newErrors.password =
        'Password must contain at least one lowercase letter';
      isValid = false;
    } else if (!/[0-9]/.test(passwords.newPassword)) {
      newErrors.password = 'Password must contain at least one number';
      isValid = false;
    }

    if (passwords.confirmPassword !== passwords.newPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'enterEmail' && validateStep1()) sendOtp();
    else if (step === 'enterOtp' && validateStep2()) verifyOtp();
    else if (step === 'enterNewPassword' && validateStep3()) resetPassword();
  };

  return (
    <div className="min-h-screen flex px-[10%]">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 text-white flex-col p-10 bg-[url('/bgsvg.svg')] bg-no-repeat bg-contain bg-center">
        <h1 className="font-protest font-bold text-6xl mb-10 text-blue-400 p-10">
          KODACK
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <form
          className="p-10 rounded-lg w-11/12 max-w-lg flex-col space-y-4"
          style={{
            border: '1px solid rgba(51, 60, 77, 0.6)',
            background: 'rgba(255, 255, 255, 0.02)',
          }}
          onSubmit={handleSubmit}
        >
          {step === 'enterEmail' && (
            <>
              <Typography
                variant="h5"
                component="h1"
                className="text-white mb-4"
              >
                Forgot Password
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                name="email"
                value={email}
                onChange={handleChange}
                sx={defaultStyles.inputStyles}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={isActionDisabled || sendOtpStatus === 'pending'}
              >
                {sendOtpStatus === 'pending' ? (
                  <CircularProgress size={20} />
                ) : (
                  'Send OTP'
                )}
              </Button>
            </>
          )}

          {step === 'enterOtp' && (
            <>
              <Typography
                variant="h5"
                component="h1"
                className="text-white mb-4"
              >
                Enter OTP
              </Typography>
              <Typography
                variant="h6"
                component="h1"
                className="text-gray-400 mb-4"
              >
                {email}
              </Typography>
              <TextField
                label="OTP"
                variant="outlined"
                error={!!errors.otp}
                helperText={errors.otp}
                fullWidth
                name="otp"
                value={otp}
                onChange={handleChange}
                sx={defaultStyles.inputStyles}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={isActionDisabled || verifyOtpStatus === 'pending'}
              >
                {verifyOtpStatus === 'pending' ? (
                  <CircularProgress size={20} />
                ) : (
                  'Verify OTP'
                )}
              </Button>
              <Button
                fullWidth
                className="text-blue-400"
                size="small"
                variant="text"
                //color="secondary"
                disabled={resendTimer > 0 || sendOtpStatus === 'pending'}
                onClick={() => sendOtp()}
              >
                {sendOtpStatus === 'pending' ? (
                  <CircularProgress size={20} />
                ) : resendTimer > 0 ? (
                  `Resend OTP in ${resendTimer}s`
                ) : (
                  'Resend OTP'
                )}
              </Button>
            </>
          )}

          {step === 'enterNewPassword' && (
            <>
              <Typography
                variant="h5"
                component="h1"
                className="text-white mb-4"
              >
                Reset Password
              </Typography>
              <Typography
                variant="h6"
                component="h1"
                className="text-gray-400 mb-4"
              >
                {email}
              </Typography>
              <FormControl
                fullWidth
                variant="outlined"
                sx={defaultStyles.inputStyles}
              >
                <InputLabel error={!!errors.password}>New Password</InputLabel>
                <OutlinedInput
                  name="newPassword"
                  type="password"
                  value={passwords.newPassword}
                  onChange={handleChange}
                  error={!!errors.password}
                  label="New Password"
                />
                <Typography variant="caption" color="error">
                  {errors.password}
                </Typography>
              </FormControl>

              <FormControl
                fullWidth
                variant="outlined"
                sx={defaultStyles.inputStyles}
              >
                <InputLabel error={!!errors.confirmPassword}>
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  name="confirmPassword"
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  label="Confirm Password"
                />
                <Typography variant="caption" color="error">
                  {errors.confirmPassword}
                </Typography>
              </FormControl>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={isActionDisabled || resetPasswordStatus === 'pending'}
              >
                {resetPasswordStatus === 'pending' ? (
                  <CircularProgress size={20} />
                ) : (
                  'Reset Password'
                )}
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
