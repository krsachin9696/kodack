import { Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import __signup, { SignupDetailsProps } from './services';
import { verifyOTP, } from './services';
import QueryKeys from '../../constants/queryKeys';
import { SignupFields, OtpVerification, PasswordSetup, SubmitButton } from './components';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { Google } from '@mui/icons-material';

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState<SignupDetailsProps>({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [stage, setStage] = useState<'signup' | 'otp' >('signup');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    username: '',
    otp: '',
    password: '',
    confirmPassword: '',
  });

  const [isSignUpDisabled, setIsSignUpDisabled] = useState(false);

  const navigate = useNavigate();

  // Signup mutation
  const { mutate: onSignup, status: signupStatus } = useMutation({
    mutationFn: () => __signup(signupInfo),
    mutationKey: [QueryKeys.SIGNUP],
    onSuccess: () => {
      toast.info('OTP sent to your email');
      setStage('otp'); // Move to OTP verification stage
    },
    onError: (error: AxiosError<ErrorResponseProps>) => {
      toast.error(error.response?.data?.error);
      setErrors((prev) => ({
        ...prev,
        email: 'Signup failed. Please try again.',
      }));
      setIsSignUpDisabled(true);
    },
  });

  // OTP verification mutation
  const { mutate: onVerifyOTP, status: otpStatus } = useMutation({
    mutationFn: () => verifyOTP({ email: signupInfo.email, otp }),
    mutationKey: [QueryKeys.VERIFY_OTP],
    onSuccess: () => {
      toast.success('Otp verified');
      navigate('/login');
    },
    onError: (error: AxiosError<ErrorResponseProps>) => {
      toast.error(error.response?.data?.error);
      setErrors((prev) => ({ ...prev, otp: 'Invalid OTP. Please try again.' }));
      setIsSignUpDisabled(true);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setIsSignUpDisabled(false);
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    // Allow only digits and limit to 6 characters
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setErrors((prev) => ({ ...prev, otp: '' }));
  
      if (value.length === 6) {
        setIsSignUpDisabled(false);
      } else {
        setIsSignUpDisabled(true);
      }
    }
  };
  

  const validateSignupForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', username: '', password: '', confirmPassword: '' };
  
    // Name validation
    if (!signupInfo.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
  
    // Email validation
    if (
      !signupInfo.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupInfo.email)
    ) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }
  
    // Username validation
    if (!signupInfo.username) {
      newErrors.username = 'Username is required';
      isValid = false;
    }
  
    // Password validation
    if (!signupInfo.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (signupInfo.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    } else if (!/[A-Z]/.test(signupInfo.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
      isValid = false;
    } else if (!/[a-z]/.test(signupInfo.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
      isValid = false;
    } else if (!/[0-9]/.test(signupInfo.password)) {
      newErrors.password = 'Password must contain at least one number';
      isValid = false;
    }
  
    // Confirm Password validation
    if (signupInfo.password !== signupInfo.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      if (otp.length === 6) { 
      onVerifyOTP();
    } else {
      setErrors((prev) => ({ ...prev, otp: 'OTP must be 6 digits.' }));
    }
    } 
  };

  const handleGoogleLogin = () => {
    window.open('http://localhost:3000/auth/google', '_self'); 
  };


  return (
    <div className="min-h-screen flex px-[10%]">
      <div className="hidden md:flex w-1/2 text-white flex-col p-10 bg-[url('/bgsvg.svg')] bg-no-repeat bg-contain bg-center">
        <h1 className="font-oswald font-bold text-6xl mb-10 text-blue-400 p-10">
          KODACK
        </h1>
      </div>

      <div className="flex w-full md:w-1/2 justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="p-10 rounded-lg w-11/12 max-w-lg flex-col space-y-4"
          style={{
            border: '1px solid rgba(51, 60, 77, 0.6)',
            background: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <Typography variant="h5" component="h1" className="text-white mb-4">
            {stage === 'signup'
              ? 'Sign up'
              : stage === 'otp'
              ? 'Verify OTP'
              : 'Set Up Password'}
          </Typography>

          {stage === 'signup' && (
            <>
              <SignupFields
                signupInfo={signupInfo}
                errors={errors}
                onChange={handleChange}
              />
              <PasswordSetup
                password={signupInfo.password}
                confirmPassword={signupInfo.confirmPassword}
                errors={errors}
                onChange={handleChange}
              />
            </>
          )}

          {stage === 'otp' && (
            <OtpVerification
              email={signupInfo.email}
              otp={otp}
              errors={errors}
              onChange={handleOTPChange}
            />
          )}

          <SubmitButton
            signupStatus={signupStatus}
            otpStatus={otpStatus}
            passwordStatus={signupStatus}
            stage={stage}
            isDisabled={isSignUpDisabled}
          />

          {stage === 'signup' && (
            <>
              <div className="flex items-center mt-4 text-white">
                <div className="flex-grow border-t" style={{ border: '1px solid rgba(51, 60, 77, 0.6)' }}></div>
                <span className="mx-2">or</span>
                <div className="flex-grow border-t" style={{ border: '1px solid rgba(51, 60, 77, 0.6)' }}></div>
              </div>

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
                Already have an account?{' '}
                <Link to="/login" className="text-blue-400 hover:underline">
                  Log in
                </Link>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
