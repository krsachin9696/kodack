import React, { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TextareaAutosize,
  Chip,
} from '@mui/material';
import { defaultStyles } from '../../../constants/defaultStyles';
import { SelectChangeEvent } from '@mui/material/Select';
import { Cancel } from '@mui/icons-material';

interface CreateListProps {
  name: string;
  visibility: string;
  tags: string[];
  description: string;
}

const CreateList: React.FC = () => {
  const [formData, setFormData] = useState<CreateListProps>({
    name: '',
    visibility: '',
    tags: [],
    description: '',
  });

  const [tagInput, setTagInput] = useState<string>('');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    if (name === 'tags') {
      setTagInput(value); // Update tag input state
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      visibility: event.target.value,
    }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      event.preventDefault(); // Prevent the default space behavior
      const trimmedTag = tagInput.trim();
      if (trimmedTag && formData.tags.length < 5) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, trimmedTag],
        }));
        setTagInput(''); // Clear the input field
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    setFormData({
      name: '',
      visibility: '',
      tags: [],
      description: '',
    });
    setTagInput(''); // Reset tag input after submission
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  return (
    <Box width="100%" height="100%" minHeight={300}>
      <form onSubmit={handleSubmit}>
        <Box
          width="100%"
          padding={2}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          gap={2}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
          >
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              sx={defaultStyles.inputStyles}
            />

            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: 'white' }}>Visibility</InputLabel>
              <Select
                name="visibility"
                value={formData.visibility}
                onChange={handleSelectChange}
                label="Visibility"
                variant="filled"
                sx={{
                  color: 'white',
                  padding: 0,
                  paddingBottom: 1,
                }}
              >
                <MenuItem value="private">Private</MenuItem>
                <MenuItem value="public">Public</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Tag input with chips displayed together */}
          <Box display="flex" flexDirection="row" alignItems="flex-end" gap={1}>
            <Box
              maxWidth="50%"
              display="flex"
              flexWrap="wrap"
              gap={1}
              sx={{
                maxWidth: '50%',
                flexGrow: 1,
                flexShrink: 0,
                minWidth: 0,
              }}
            >
              {formData.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                  deleteIcon={
                    <Cancel sx={{ color: 'white' }} />
                  }
                  variant="outlined"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                  }}
                />
              ))}
            </Box>

            <TextField
              variant="standard"
              name="tags"
              value={tagInput}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              fullWidth
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
          </Box>

          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Description of your list"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{
              padding: '8px',
              color: 'white',
              background: 'transparent',
              border: '1px solid',
              borderRadius: '5px',
            }}
          />

          <Box display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" sx={{ width: '30%' }}>
              Create List
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default CreateList;

