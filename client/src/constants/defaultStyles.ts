export const defaultStyles = {
  inputStyles: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // Default border color
      },
      '&:hover fieldset': {
        borderColor: 'white', // Border color when hovered
      },
      // '&.Mui-focused fieldset': {
      //   borderColor: 'white', // Border color when focused
      // },
      '& input': {
        color: 'white', // Input text color
      },
    },
    '& .MuiInputLabel-root': {
      color: 'white', // Label color
    },
    // '& .MuiInputLabel-root.Mui-focused': {
    //   color: 'white', // Label color when focused
    // },
    '& .MuiFormHelperText-root': {
      color: 'white', // Helper text color (if any)
    },
  },
}
