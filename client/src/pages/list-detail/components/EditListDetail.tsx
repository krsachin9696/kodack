// import React, { useState } from 'react';
// import { Box, TextField, Button, Chip, Typography, CircularProgress } from '@mui/material';
// import { Cancel } from '@mui/icons-material';
// import { defaultStyles } from '../../../constants/defaultStyles';

// interface EditListProps {
//   list: {
//     listName: string;
//     description: string;
//     tags: string[];
//   };
//   onClose: () => void;
// }

// const EditList: React.FC<EditListProps> = ({ list, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: list.listName,
//     description: list.description,
//     tags: list.tags,

//   });
//   const [tagInput, setTagInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleAddTag = () => {
//     const trimmedTag = tagInput.trim(); // Remove leading/trailing spaces
//     if (
//       trimmedTag && // ensure input is not empty
//       !formData.tags.includes(trimmedTag) && // ensure tag is unique
//       trimmedTag.length <= 20 && // ensure tag length is <= 20
//       formData.tags.length < 5 // ensure the max limit of 5 tags
//     ) {
//       setFormData((prev) => ({
//         ...prev,
//         tags: [...prev.tags, trimmedTag], // Add trimmed tag to the list
//       }));
//       setTagInput(''); // Clear input field
//     }
//   };

//   const handleDeleteTag = (tagToDelete: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       tags: prev.tags.filter((tag) => tag !== tagToDelete),
//     }));
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     const normalizedValue = value.replace(/^\s+/, '').replace(/\s{2,}/g, ' ')
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: normalizedValue,
//     }));
//   };
  
//   const handleBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     const trimmedValue = value.trim();
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: trimmedValue,
//     }));
//   };
  

//   const handleSubmit = async () => {
//     // if (formData.name && formData.description && formData.tags.length > 0 && formData.tags.length <= 5) {
//     //   setLoading(true);
//     //   try {
//     //     // Replace this with your save API call
//     //     await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate an API call
//     //     setLoading(false);
//     //     onClose(); // Close modal on success
//     //   } catch (error) {
//     //     setLoading(false);
//     //     // Handle error if needed
//     //   }
//     // }
//   };

//   return (
//     <Box width="100%" height="100%" minHeight={300} sx={{ background: 'transparent', padding: 2 }}>
//       <TextField
//         required
//         label="Name"
//         variant="outlined"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         fullWidth
//         error={!formData.name || formData.name.length < 3 || formData.name.length > 50}
//         helperText={
//           !formData.name
//             ? 'Name is required'
//             : formData.name.length < 3
//             ? 'Name should be at least 3 characters'
//             : formData.name.length > 50
//             ? 'Name should not exceed 50 characters'
//             : ''
//         }
//         sx={defaultStyles.inputStyles}
//       />

//       <Box marginTop={2}>
//         <Typography variant="body1" color="white">Tags</Typography>
//         <Box display="flex" gap={1} marginTop={1} flexWrap="wrap">
//           {formData.tags.map((tag, index) => (
//             <Chip
//               key={index}
//               label={tag}
//               onDelete={() => handleDeleteTag(tag)}
//               deleteIcon={<Cancel sx={{ color: 'white' }} />}
//               variant="outlined"
//               size="small"
//               sx={{
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)',
//                 color: 'white',
//                 maxWidth: '20ch', // Limit tag width to 20 characters
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//               }}
//             />
//           ))}
//         </Box>
//         <TextField
//           variant="standard"
//           fullWidth
//           value={tagInput.trim()}
//           onChange={(e) => setTagInput(e.target.value)}
//           onKeyDown={(e) => e.key === ' ' && handleAddTag()}
//           placeholder="Add tag"
//           sx={{
//             marginTop: 2,
//             '& .MuiInput-underline:before': {
//               borderBottom: '1px solid white',
//             },
//             '& .MuiInput-underline:after': {
//               borderBottom: '2px solid white',
//             },
//             '& input': { color: 'white' },
//           }}
//           error= {!formData.tags.length || tagInput.trim().length > 20 || formData.tags.length >= 5}
//           helperText={
//             !formData.tags.length
//               ? 'At least one tag is required'
//               : tagInput.trim().length > 20
//               ? 'Tag length should not exceed 20 characters'
//               : formData.tags.length >= 5
//               ? 'A maximum of 5 tags are allowed'
//               : ''
//             }
//         />
//       </Box>

//       <Box marginTop={3}>
//         <TextField
//           required
//           label="Description"
//           variant="outlined"
//           fullWidth
//           multiline
//           rows={4}
//           value={formData.description}
//           name="description"
//           onChange={handleChange}
//           onBlur={handleBlur}
//           error={!formData.description || formData.description.length < 10 || formData.description.length > 150}
//           helperText={
//           !formData.description
//             ? 'Description is required'
//             : formData.description.length < 10
//             ? 'Description should be at least 10 characters'
//             : formData.description.length > 150
//             ? 'Description should not exceed 150 characters'
//             : ''
//           }
//           sx={defaultStyles.inputStyles}
//         />
//       </Box>

//       <Box display="flex" justifyContent="flex-end" marginTop={3}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSubmit}
//           disabled={loading}
//           startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
//         >
//           {loading ? 'Saving...' : 'Save Changes'}
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default EditList;

import React, { useState } from 'react';
import { Box, TextField, Button, Chip, Typography, CircularProgress } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { defaultStyles } from '../../../constants/defaultStyles';
import { useMutation } from '@tanstack/react-query';
import editListDetails from '../services/editListDetail';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';

interface EditListProps {
  list: {
    listID: string;
    listName: string;
    description: string;
    tags: string[];
  };
  onClose: () => void;
}

const EditList: React.FC<EditListProps> = ({ list, onClose }) => {
    const { id } = useParams<{ id: string }>();

  // Check if listID is undefined, and handle it accordingly
  const listID = id || '';


  const [formData, setFormData] = useState({
    name: list.listName,
    description: list.description,
    tags: list.tags,
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);

  const { mutate, status } = useMutation({
    mutationFn: () => editListDetails(formData, listID),
    onSuccess: () => {
        toast.info('List updated successfully.');
        onClose();
      },
    onError: (error) => {
        console.log(error)
        toast.error('Error updating the list.');
        setLoading(false);
      }
    }
    )
    
  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag) && trimmedTag.length <= 20 && formData.tags.length < 5) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const normalizedValue = value.replace(/^\s+/, '').replace(/\s{2,}/g, ' ');
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: normalizedValue,
    }));
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: trimmedValue,
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.description && formData.tags.length > 0 && formData.tags.length <= 5) {
      setLoading(true);
      mutate();
    }
  };


  return (
    <Box width="100%" height="100%" minHeight={300} sx={{ background: 'transparent', padding: 2 }}>
      <TextField
        required
        label="Name"
        variant="outlined"
        name="listName"
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        error={!formData.name || formData.name.length < 3 || formData.name.length > 50}
        helperText={
          !formData.name
            ? 'Name is required'
            : formData.name.length < 3
            ? 'Name should be at least 3 characters'
            : formData.name.length > 50
            ? 'Name should not exceed 50 characters'
            : ''
        }
        sx={defaultStyles.inputStyles}
      />

      <Box marginTop={2}>
        <Typography variant="body1" color="white">Tags</Typography>
        <Box display="flex" gap={1} marginTop={1} flexWrap="wrap">
          {formData.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleDeleteTag(tag)}
              deleteIcon={<Cancel sx={{ color: 'white' }} />}
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                maxWidth: '20ch',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            />
          ))}
        </Box>
        <TextField
          variant="standard"
          fullWidth
          value={tagInput.trim()}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === ' ' && handleAddTag()}
          placeholder="Add tag"
          sx={{
            marginTop: 2,
            '& .MuiInput-underline:before': { borderBottom: '1px solid white' },
            '& .MuiInput-underline:after': { borderBottom: '2px solid white' },
            '& input': { color: 'white' },
          }}
          error={!formData.tags.length || tagInput.length > 20 || formData.tags.length >= 5}
          helperText={
            !formData.tags.length
              ? 'At least one tag is required'
              : tagInput.length > 20
              ? 'Tag length should not exceed 20 characters'
              : formData.tags.length >= 5
              ? 'A maximum of 5 tags are allowed'
              : ''
          }
        />
      </Box>

      <Box marginTop={3}>
        <TextField
          required
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={formData.description}
          name="description"
          onChange={handleChange}
          onBlur={handleBlur}
          error={!formData.description || formData.description.length < 10 || formData.description.length > 150}
          helperText={
            !formData.description
              ? 'Description is required'
              : formData.description.length < 10
              ? 'Description should be at least 10 characters'
              : formData.description.length > 150
              ? 'Description should not exceed 150 characters'
              : ''
          }
          sx={defaultStyles.inputStyles}
        />
      </Box>

      <Box display="flex" justifyContent="flex-end" marginTop={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>
    </Box>
  );
};

export default EditList;
