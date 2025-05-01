import { TextField, Typography } from '@mui/material';
import { defaultStyles } from '../../../constants/defaultStyles';
// 
interface OtpVerificationProps {
  email: string;
  otp: string;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
// 
const OtpVerification = ({ email, otp, errors, onChange }: OtpVerificationProps) => (
  <>
    <Typography variant="body1" className="text-white">
      Email: {email}
    </Typography>
    <TextField
      label="OTP"
      variant="outlined"
      value={otp}
      onChange={onChange}
      fullWidth
      error={!!errors.otp}
      helperText={errors.otp}
      sx={defaultStyles.inputStyles}
    />
  </>
);
// 
export default OtpVerification;



// import { TextField, Typography } from '@mui/material';
// import { defaultStyles } from '../../../constants/defaultStyles';
// import { useEffect } from 'react';

// interface OtpVerificationProps {
//   email: string;
//   otp: string;
//   errors: Record<string, string>;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const OtpVerification = ({ email, otp, errors, onChange }: OtpVerificationProps) => {
//   const otpDigits = otp.split('');

//   const handleInputChange = (index: number, value: string) => {
//     if (/^[0-9]$/.test(value) || value === '') {
//       const newOtp = [...otpDigits];
//       newOtp[index] = value;

//       // Create a synthetic event to match the expected structure
//       const event = {
//         target: {
//           value: newOtp.join(''),
//         },
//       } as React.ChangeEvent<HTMLInputElement>;

//       onChange(event);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
//     if (e.key === 'Backspace') {
//       console.log("dfjkls")
//       if (otpDigits[index] === '' && index > 0) {
//         const previousInput = document.getElementById(`otp-input-${index - 1}`);
//         previousInput?.focus();
//       } 
//     } else if (e.key.length === 1 && /^[0-9]$/.test(e.key)) {
//       if (index < 5) {
//         const nextInput = document.getElementById(`otp-input-${index + 1}`);
//         nextInput?.focus();
//       }
//     }
//   };
  

//   useEffect(() => {
//     const firstInput = document.getElementById('otp-input-0');
//     firstInput?.focus();
//   }, []);

//   return (
//     <>
//       <Typography variant="body1" className="text-white">
//         Email: {email}
//       </Typography>
//       <div className="flex space-x-2 mt-2">
//         {Array.from({ length: 6 }, (_, index) => (
//           <TextField
//             key={index}
//             id={`otp-input-${index}`}
//             variant="outlined"
//             value={otpDigits[index] || ''}
//             onChange={(e) => handleInputChange(index, e.target.value)}
//             onKeyDown={(e) => handleKeyDown(e as React.KeyboardEvent<HTMLInputElement>, index)}
//             fullWidth
//             error={!!errors.otp} // Keep error handling here, but only display below
//             sx={defaultStyles.inputStyles}
//           />
//         ))}
//       </div>
//       {errors.otp && (
//         <Typography variant="body2" color="error" className="mt-2">
//           {errors.otp}
//         </Typography>
//       )}
//     </>
//   );
// };

// export default OtpVerification;
