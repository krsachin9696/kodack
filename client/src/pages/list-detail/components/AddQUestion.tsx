import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import { defaultStyles } from '../../../constants/defaultStyles';

interface AddQuestionProps {
  onAddQuestion: (question: { title: string; link: string }) => void;
}

const AddQuestion: React.FC<AddQuestionProps> = ({ onAddQuestion }) => {
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTouched, setIsTouched] = useState(false); // Track if the field was touched
  const [linkError, setLinkError] = useState(''); // To store error message

  const handleAddQuestion = () => {
    setLoading(true);
    const match = link.match(/problems\/(.*?)\/description/);
    const title = match ? match[1].replace(/-/g, ' ') : '';
    
    if (title && link) {
      onAddQuestion({ title, link });
      setLink(''); // Reset the input after submission
    }
    setLoading(false);
  };

  const handleBlur = () => {
    const match = link.match(/https:\/\/leetcode.com\/problems\/.+\/description\//);
    if (match) {
      setLinkError(''); // Clear error if valid
    } else {
      setLinkError('Enter a valid LeetCode link (e.g., https://leetcode.com/problems/problem-name/description/)');
    }
    setIsTouched(true); // Mark the field as touched on blur
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLink = e.target.value.replace(/\s+/g, '');
    //const newLink = e.target.value;
    setLink(newLink);

    // Clear the error as soon as the user starts typing again
    if (linkError) {
      setLinkError('');
    }
  };

  return (
    <Box width="100%" height="100%" minHeight={100} sx={{ background: 'transparent', padding: 2 }}>
      <Box marginTop={3}>
        <TextField
          required
          fullWidth
          label="LeetCode Link"
          variant="outlined"
          name="link"
          value={link.trim()}
          onChange={handleChange} // Update link and clear error when typing
          onBlur={handleBlur} // Handle validation when focus is lost
          onFocus={() => setIsTouched(true)} // Mark field as touched on focus
          error={isTouched && !!linkError} // Show error only if touched and invalid
          helperText={isTouched && linkError} // Show helper text if touched and invalid
          sx={defaultStyles.inputStyles}
        />
      </Box>

      <Box display="flex" justifyContent="flex-end" marginTop={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddQuestion}
          disabled={loading || !!linkError} // Disable button if there's an error
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          sx={{
            width: 'auto',
            height: 'auto',
            padding: '5px 15px', // Smaller button size
          }}
        >
          {loading ? 'Adding...' : 'Add Question'}
        </Button>
      </Box>
    </Box>
  );
};

export default AddQuestion;

// import React, { useState } from 'react';
// import { Box, TextField, Button, CircularProgress } from '@mui/material';
// import { defaultStyles } from '../../../constants/defaultStyles';

// interface AddQuestionProps {
//   onAddQuestion: (question: { title: string; link: string }) => void;
//   existingLinks: string[]; // Pass the list of already added links as a prop
// }

// const AddQuestion: React.FC<AddQuestionProps> = ({ onAddQuestion, existingLinks }) => {
//   const [link, setLink] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isTouched, setIsTouched] = useState(false); // Track if the field was touched
//   const [linkError, setLinkError] = useState(''); // To store error message

//   const handleAddQuestion = () => {
//     setLoading(true);
//     const match = link.match(/problems\/(.*?)\/description/);
//     const title = match ? match[1].replace(/-/g, ' ') : '';
    
//     if (title && link) {
//       onAddQuestion({ title, link });
//       setLink(''); // Reset the input after submission
//     }
//     setLoading(false);
//   };

//   const handleBlur = () => {
//     const match = link.match(/https:\/\/leetcode.com\/problems\/.+\/description\//);
//     if (match) {
//       setLinkError(''); // Clear error if valid
//     } else {
//       setLinkError('Enter a valid LeetCode link (e.g., https://leetcode.com/problems/problem-name/description/)');
//     }
//     setIsTouched(true); // Mark the field as touched on blur
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newLink = e.target.value.replace(/\s+/g, ''); // Remove all spaces from the string
//     setLink(newLink);

//     // Clear the error as soon as the user starts typing again
//     if (linkError) {
//       setLinkError('');
//     }
//   };

//   const handleLinkValidation = () => {
//     if (existingLinks.includes(link)) {
//       setLinkError('This link has already been added.');
//       return false;
//     }
//     return true;
//   };

//   return (
//     <Box width="100%" height="100%" minHeight={100} sx={{ background: 'transparent', padding: 2 }}>
//       <Box marginTop={3}>
//         <TextField
//           required
//           fullWidth
//           label="LeetCode Link"
//           variant="outlined"
//           name="link"
//           value={link} // Do not trim value here, as spaces are already removed
//           onChange={handleChange} // Update link and clear error when typing
//           onBlur={() => {
//             handleBlur();
//             handleLinkValidation(); // Check for duplicates when the user blurs
//           }} // Handle validation when focus is lost
//           onFocus={() => setIsTouched(true)} // Mark field as touched on focus
//           error={isTouched && !!linkError} // Show error only if touched and invalid
//           helperText={isTouched && linkError} // Show helper text if touched and invalid
//           sx={defaultStyles.inputStyles}
//         />
//       </Box>

//       <Box display="flex" justifyContent="flex-end" marginTop={3}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleAddQuestion}
//           disabled={loading || !!linkError} // Disable button if there's an error
//           startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
//           sx={{
//             width: 'auto',
//             height: 'auto',
//             padding: '5px 15px', // Smaller button size
//           }}
//         >
//           {loading ? 'Adding...' : 'Add Question'}
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default AddQuestion;
