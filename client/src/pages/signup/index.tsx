import {
  Button, CircularProgress, TextField, Typography
} from '@mui/material';
import { defaultStyles } from '../../constants/defaultStyles';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import __signup, { SignupDetailsProps } from './services';
import { verifyOTP, setupPassword } from './services';
import QueryKeys from '../../constants/queryKeys';

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState<SignupDetailsProps>({
    name: '',
    email: '',
    username: '',
  });
  const [stage, setStage] = useState<'signup' | 'otp' | 'password'>('signup');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    username: '',
    otp: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  // Signup mutation
  const { mutate: onSignup, status: signupStatus } = useMutation({
    mutationFn: () => __signup(signupInfo),
    mutationKey: [QueryKeys.SIGNUP],
    onSuccess: (data) => {
      alert("OTP sent to your email");
      console.log(data);
      setStage('otp');  // Move to OTP verification stage
    },
    onError: () => {
      setErrors((prev) => ({ ...prev, email: "Signup failed. Please try again." }));
    },
  });

  // OTP verification mutation
  const { mutate: onVerifyOTP, status: otpStatus } = useMutation({
    mutationFn: () => verifyOTP({email: signupInfo.email, otp: otp}),
    mutationKey: [QueryKeys.VERIFY_OTP],
    onSuccess: () => {
      alert("OTP verified successfully");
      setStage('password');  // Move to Password setup stage
    },
    onError: () => {
      setErrors((prev) => ({ ...prev, otp: "Invalid OTP. Please try again." }));
    },
  });

  // Password setup mutation
  const { mutate: onSetupPassword, status: passwordStatus } = useMutation({
    mutationFn: () => setupPassword({ email: signupInfo.email, password: password, confirmPassword: confirmPassword }),
    mutationKey: [QueryKeys.SETUP_PASSWORD],
    onSuccess: () => {
      alert("Password set successfully");
      navigate('/login');  // Navigate to login after password setup
    },
    onError: () => {
      setErrors((prev) => ({ ...prev, password: "Error setting up password. Try again." }));
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
    setErrors((prev) => ({ ...prev, otp: '' }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    name === 'password' ? setPassword(value) : setConfirmPassword(value);
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateSignupForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', username: '' };

    if (!signupInfo.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!signupInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupInfo.email)) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }
    if (!signupInfo.username) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stage === 'signup' && validateSignupForm()) {
      onSignup();
    } else if (stage === 'otp') {
      onVerifyOTP();
    } else if (stage === 'password' && password === confirmPassword && password.length >= 6) {
      onSetupPassword();
    } else if (password !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
    } else if (password.length < 6) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters" }));
    }
  };

  return (
    <div className="min-h-screen flex px-[10%]">
      <div className="hidden md:flex w-1/2 text-white flex-col p-10 bg-[url('/bgsvg.svg')] bg-no-repeat bg-contain bg-center">
        <h1 className="font-oswald font-bold text-6xl mb-10 text-blue-400 p-10">KODACK</h1>
      </div>

      <div className="flex w-full md:w-1/2 justify-center items-center">
        <form onSubmit={handleSubmit} className="p-10 rounded-lg w-11/12 max-w-lg flex-col space-y-4" style={{ border: '1px solid rgba(51, 60, 77, 0.6)' }}>
          <Typography variant="h5" component="h1" className="text-white mb-4">
            {stage === 'signup' ? 'Sign up' : stage === 'otp' ? 'Verify OTP' : 'Set Up Password'}
          </Typography>

          {stage === 'signup' && (
            <>
              <TextField label="Full Name" variant="outlined" name="name" value={signupInfo.name} onChange={handleChange} fullWidth error={!!errors.name} helperText={errors.name} sx={defaultStyles.inputStyles} />
              <TextField label="Email" variant="outlined" name="email" value={signupInfo.email} onChange={handleChange} fullWidth error={!!errors.email} helperText={errors.email} sx={defaultStyles.inputStyles} />
              <TextField label="Username" variant="outlined" name="username" value={signupInfo.username} onChange={handleChange} fullWidth error={!!errors.username} helperText={errors.username} sx={defaultStyles.inputStyles} />
            </>
          )}

          {stage === 'otp' && (
            <>
              <Typography variant="body1" className="text-white">Email: {signupInfo.email}</Typography>
              <TextField label="OTP" variant="outlined" value={otp} onChange={handleOTPChange} fullWidth error={!!errors.otp} helperText={errors.otp} sx={defaultStyles.inputStyles} />
            </>
          )}

          {stage === 'password' && (
            <>
              <TextField label="Password" variant="outlined" type="password" name="password" value={password} onChange={handlePasswordChange} fullWidth error={!!errors.password} helperText={errors.password} sx={defaultStyles.inputStyles} />
              <TextField label="Confirm Password" variant="outlined" type="password" name="confirmPassword" value={confirmPassword} onChange={handlePasswordChange} fullWidth error={!!errors.confirmPassword} helperText={errors.confirmPassword} sx={defaultStyles.inputStyles} />
            </>
          )}

          <Button type="submit" fullWidth variant="contained" size="small" color="primary" sx={{ padding: 2 }} disabled={signupStatus === 'pending' || otpStatus === 'pending' || passwordStatus === 'pending'}>
            {(signupStatus === 'pending' || otpStatus === 'pending' || passwordStatus === 'pending') ? (
              <CircularProgress sx={{ color: 'white' }} size={20} />
            ) : (
              stage === 'signup' ? 'Sign Up' : stage === 'otp' ? 'Verify OTP' : 'Set Password'
            )}
          </Button>

          {stage === 'signup' && (
            <div className="mt-4 text-center text-white">
              Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Log in</Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
