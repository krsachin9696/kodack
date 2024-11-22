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
  Typography,
  CircularProgress,
} from '@mui/material';
import { defaultStyles } from '../../../constants/defaultStyles';
import { SelectChangeEvent } from '@mui/material/Select';
import { Cancel } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import createList, { CreateListInputProps } from '../services/createList';
import { toast } from 'sonner';
import queryKeys from '../../../constants/queryKeys';

interface CreateListProps {
  onClose: () => void; // Add this line
}

const CreateList: React.FC<CreateListProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<CreateListInputProps>({
    name: '',
    isPublic: true,
    tags: [],
    description: '',
  });

  const [tagInput, setTagInput] = useState<string>('');
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    tags: '',
  });

  const queryClient = useQueryClient(); 

  const { mutate, status } = useMutation({
    mutationFn: () => createList(formData),
    onSuccess: (data) => {
      const newListData = {
        listID: data.data.listID,
        name: data.data.name,
        tags: formData.tags,
        isPublic: data.data.isPublic,
        description: formData.description,
      }
      queryClient.setQueryData([queryKeys.PERSONAL_LISTS, 1], (oldData: any) => {
  
        if (oldData && oldData.data && Array.isArray(oldData.data.lists)) {
          let updatedLists = [newListData, ...oldData.data.lists];
          if (updatedLists.length > 5) {
            updatedLists = updatedLists.slice(0, 5); 
          }

          return {
            ...oldData,
            data: {
              ...oldData.data, 
              lists: updatedLists,  
              totalItems: oldData.data.totalItems + 1,  
              totalPages: Math.ceil((oldData.data.totalItems + 1) / 5), 
            },
          };
        }
  
        // If no old data or lists, initialize with the new list
        return {
          ...oldData,
          data: {
            lists: [newListData],           
          },
        };
      });
      

      toast.success('New list created successfully.');
      setFormData({
        name: '',
        isPublic: true,
        tags: [],
        description: '',
      });
      setTagInput('');
      onClose();
      setErrors({
        name: '',
        description: '',
        tags: '',
      });
    },
    onError: () => {
      toast.error('Error creating new list.');
      onClose();
    },
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    if (name === 'tags') {
      setTagInput(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Reset the error message for the relevant field
    if (name === 'name') {
      setErrors((prev) => ({ ...prev, name: '' }));
    } else if (name === 'description') {
      setErrors((prev) => ({ ...prev, description: '' }));
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      isPublic: value === 'public',
    }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      event.preventDefault();
      const trimmedTag = tagInput.trim();
      if (trimmedTag && formData.tags.length < 5) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, trimmedTag],
        }));
        setTagInput('');
        setErrors((prev) => ({ ...prev, tags: '' }));
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', description: '', tags: '' };

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.length > 50) {
      newErrors.name = 'Name cannot exceed 50 characters';
      isValid = false;
    }

    if (!formData.description) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      mutate();
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  if (status == 'pending') {
    return <CircularProgress />;
  }

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
              error={!formData.name}
              value={formData.name}
              onChange={handleChange}
              fullWidth
              // error={!!errors.name}
              helperText={errors.name}
              sx={defaultStyles.inputStyles}
            />

            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: 'white' }}>Visibility</InputLabel>
              <Select
                name="visibility"
                value={formData.isPublic ? 'public' : 'private'}
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
                  deleteIcon={<Cancel sx={{ color: 'white' }} />}
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
            <Typography variant="caption" color="error">
              {errors.tags}
            </Typography>
          </Box>

          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Description of your list"
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={150}
            style={{
              padding: '8px',
              color: 'white',
              background: 'transparent',
              border: '1px solid',
              borderRadius: '5px',
            }}
          />
          <Box width="100%" display="flex" justifyContent="space-between">
            <Typography variant="caption" color="error">
              {errors.description}
            </Typography>
            <Typography variant="caption" color="white">
              {formData.description.length}/150
            </Typography>
          </Box>

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
