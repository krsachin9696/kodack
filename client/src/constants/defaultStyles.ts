// // export const defaultStyles = {
// //   inputStyles: {
// //     '& .MuiOutlinedInput-root': {
// //       '& fieldset': {
// //         borderColor: 'white', // Default border color
// //       },
// //       '&:hover fieldset': {
// //         borderColor: '#1976d2', // Border color when hovered
// //       },
// //       // '&.Mui-focused fieldset': {
// //       //   borderColor: 'white', // Border color when focused
// //       // },
// //       '& input': {
// //         color: 'white', // Input text color
// //       },
// //     },
// //     '& .MuiInputLabel-root': {
// //       color: 'white', // Label color
// //     },
// //     // '& .MuiInputLabel-root.Mui-focused': {
// //     //   color: 'white', // Label color when focused
// //     // },
// //     '& .MuiFormHelperText-root': {
// //       color: 'white', // Helper text color (if any)
// //     },
// //   },
// // };

// export const defaultStyles = {
//   inputStyles: {
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         borderColor: 'white', // Default border color
//       },
//       '&:hover fieldset': {
//         borderColor: '#1976d2', // Border color when hovered
//       },
//       '&.Mui-focused fieldset': {
//         borderColor: 'white', // Border color when focused
//       },
//       '& input': {
//         color: 'white', // Input text color
//       },
//     },
//     '& .MuiInputLabel-root': {
//       color: 'white', // Label color
//     },
//     '& .MuiInputLabel-root.Mui-focused': {
//       color: 'white', // Label color when focused
//     },
//     '& .MuiFormHelperText-root': {
//       color: 'white', // Helper text color (if any)
//     },
//   },
// };


export const defaultStyles = {
  inputStyles: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // Default border color
      },
      '&:hover fieldset': {
        borderColor: '#1976d2', // Border color when hovered
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white', // Border color when focused
      },
      '& input': {
        color: 'white', // Input text color for single-line fields
      },
      '& textarea': {
        color: 'white', // Input text color for multiline fields
      },
    },
    '& .MuiInputLabel-root': {
      color: 'white', // Label color
    },
    '& .MuiFormHelperText-root': {
      color: 'white', // Helper text color (if any)
    },
  },
};
