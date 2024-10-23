import React, { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';
import { defaultStyles } from '../../../constants/defaultStyles';
import { SelectChangeEvent } from '@mui/material/Select';

interface CreateListProps {
  name: string;
  visibility: string;
  tags: string[];
}

const CreateList: React.FC = () => {
  const [formData, setFormData] = useState<CreateListProps>({
    name: '',
    visibility: 'private',
    tags: [],
  });

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      visibility: event.target.value,
    }));
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      tags: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <Box width="100%" minHeight={300} padding={2}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleTextFieldChange}
          fullWidth
          sx={defaultStyles.inputStyles}
        />

<FormControl fullWidth sx={{ marginTop: 2 }}>
  <InputLabel sx={{ color: 'white' }}>Visibility</InputLabel>
  <Select
    name="visibility"
    value={formData.visibility}
    onChange={handleSelectChange}
    label="Visibility"
    variant="outlined" // Ensure it's set to outlined
    sx={{
      color: 'white', // Text color
      backgroundColor: 'transparent', // Background color
      '& .MuiSelect-icon': {
        color: 'white', // Color for the dropdown arrow
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white', // Normal border color
        },
        '&:hover fieldset': {
          borderColor: 'white', // Border color on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white', // Border color when focused
        },
      },
    }}
  >
    <MenuItem value="private">Private</MenuItem>
    <MenuItem value="public">Public</MenuItem>
  </Select>
</FormControl>


        <TextField
          label="Tags"
          variant="outlined"
          name="tags"
          value={formData.tags.join(', ')}
          onChange={handleTagChange}
          fullWidth
          sx={defaultStyles.inputStyles}
          placeholder="Enter tags separated by commas"
        />

        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          Create List
        </Button>
      </form>
    </Box>
  );
};

export default CreateList;
