import React, { useState } from 'react';
import { Box, TextField, Button, Chip, Typography, CircularProgress } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { defaultStyles } from '../../../constants/defaultStyles';

interface EditListProps {
  list: {
    name: string;
    description: string;
    tags: string[];
  };
  onClose: () => void;
}

const EditList: React.FC<EditListProps> = ({ list, onClose }) => {
  const [formData, setFormData] = useState({
    name: list.name,
    description: list.description,
    tags: list.tags,
  });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    tags: '',
  });

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value);

  const handleAddTag = () => {
    if (tagInput && formData.tags.length < 5) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput],
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Handle submit logic here (e.g., API call)
    // On success, close modal
    onClose();
  };

  return (
    <Box width="100%" height="100%" minHeight={300} sx={{ background: 'transparent', padding: 2 }}>
      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        error={!!errors.name}
        helperText={errors.name}
        sx={defaultStyles.inputStyles}
      />

      <Box marginTop={2}>
        <Typography variant="body1" color="white">Tags</Typography>
        <Box display="flex" gap={1} marginTop={1}>
          {formData.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleDeleteTag(tag)}
              deleteIcon={<Cancel sx={{ color: 'white' }} />}
              variant="outlined"
              size="small"
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
          ))}
        </Box>
        <TextField
          variant="standard"
          fullWidth
          value={tagInput}
          onChange={handleTagChange}
          onKeyDown={(e) => e.key === ' ' && handleAddTag()}
          placeholder="add tag"
          slotProps={{
            input: {
              style: { color: 'white' },
            },
          }}
          sx={{
            '& .MuiInput-underline:before': {
              borderBottom: '1px solid white',
            },
            '& .MuiInput-underline:after': {
              borderBottom: '2px solid white',
            },
          }}
        />
        <Typography variant="caption" color="error">{errors.tags}</Typography>
      </Box>

      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={formData.description}
        name="description"
        onChange={handleChange}
          sx={{
            '& .MuiInput-underline:before': {
              borderBottom: '1px solid white',
            },
            '& .MuiInput-underline:after': {
              borderBottom: '2px solid white',
            },
          }}
        error={!!errors.description}
        helperText={errors.description}
      />

      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default EditList;
