// import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
// import { Google, VisibilityOff, Visibility } from '@mui/icons-material';
// import { defaultStyles } from '../../constants/defaultStyles';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//   };

//   return (
//     <div className="min-h-screen flex px-[10%]">
//       {/* Left Section */}
//       <div className="hidden md:flex w-1/2 text-white flex-col p-10 bg-[url('/bgsvg.svg')] bg-no-repeat bg-contain bg-center">
//         <h1 className="font-oswald font-bold text-6xl mb-10 text-blue-400 p-10">KODACK</h1>
//          {/* <div className="ml-10">
//           <h1 className="text-4xl mb-10 text-blue-400">KODACK</h1>
//           <div className="mb-8">
//             <h3 className="text-xl flex items-center">
//               🔧 Access master list of essential LeetCode problems
//             </h3>
//           </div>
//           <div className="mb-8">
//             <h3 className="text-xl flex items-center">
//               🛠 Create and customize personal problem lists.
//             </h3>
//           </div>
//           <div className="mb-8">
//             <h3 className="text-xl flex items-center">
//               👍 Track progress on problem-solving.
//             </h3>
//           </div>
//           <div>
//             <h3 className="text-xl flex items-center">
//               ✨ Share and collaborate on curated lists.
//             </h3>
//           </div>
//         </div> */}
//       </div>

//       {/* Right Section */}
//       <div className="flex w-full md:w-1/2 justify-center items-center">
//         <div
//           className="p-10 rounded-lg w-11/12 max-w-lg flex-col space-y-4"
//           style={{ border: '1px solid rgba(51, 60, 77, 0.6)' }}
//         >
//           <Typography variant="h5" component="h1" className="text-white mb-4">
//             Log in
//           </Typography>
//           <TextField
//             label="Email"
//             variant="outlined"
//             fullWidth
//             sx={defaultStyles.inputStyles}
//           />

//           <FormControl variant="outlined" fullWidth sx={defaultStyles.inputStyles}>
//             <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//             <OutlinedInput
//               id="outlined-adornment-password"
//               type={showPassword ? 'text' : 'password'}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                     edge="end"
//                     color='primary'
//                   >
//                     {showPassword ? <Visibility /> : <VisibilityOff />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//               label="Password"
//             />
//           </FormControl>

//           <div className="text-right">
//             <Link to="/forgot-password" className="text-blue-400 hover:underline">
//               Forgot password?
//             </Link>
//           </div>
//           <Button
//             fullWidth
//             variant="contained"
//             size="small"
//             color="primary"
//             className="mt-4 mb-4"
//             sx={{ padding: 2 }}
//           >
//             Log in
//           </Button>

//           <div className="mt-4 text-center text-white">or</div>

//           <Button
//             fullWidth
//             variant="outlined"
//             startIcon={<Google />}
//             sx={{ padding: 2 }}
//             className="mt-4 text-white border-white"
//           >
//             Sign in with Google
//           </Button>

//           <div className="mt-4 text-center text-white">
//             New user?{' '}
//             <Link to="/signup" className="text-blue-400 hover:underline">
//               Sign up
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { Google, VisibilityOff, Visibility } from '@mui/icons-material';
import { defaultStyles } from '../../constants/defaultStyles';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query'
import __login, { LoginDetailsProps } from './services';
import { useDispatch } from 'react-redux';
import QueryKeys from '../../constants/queryKeys';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginInfo, setLoginInfo] = useState<LoginDetailsProps>({
    email: '',
    password: '',
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const { mutate: onLogin, status: loginStatus } = useMutation({
    mutationFn: () => {
      return __login(loginInfo);
    },
    mutationKey: [QueryKeys.LOGIN],
    onSuccess: (data) => {
      navigate('/'); // Navigate to the home page after login
    },
    onError: () => {
      console.log('Error while logging in');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(); // Trigger the login mutation
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
            Log in
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
            sx={defaultStyles.inputStyles}
          />

          <FormControl variant="outlined" fullWidth sx={defaultStyles.inputStyles}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={loginInfo.password}
              onChange={handleChange}
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

          <div className="text-right">
            <Link to="/forgot-password" className="text-blue-400 hover:underline">
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
            disabled={loginStatus === 'pending'}
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
