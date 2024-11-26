import React, { useState } from 'react';
import { Box, TextField, Button, Chip, Typography, CircularProgress } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { defaultStyles } from '../../../constants/defaultStyles';
import { useMutation } from '@tanstack/react-query';
import editListDetails from '../services/editListDetail';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '../../../constants/queryKeys';

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
  const listID = id || '';
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: list.name,
    description: list.description,
    tags: list.tags,
  });
  const [tagInput, setTagInput] = useState('');

  const { mutate, status } = useMutation({
    mutationFn: () => editListDetails(formData, listID),
    mutationKey: [queryKeys.EDIT_LIST_DETIALS],
    onSuccess: () => {  queryClient.setQueryData([queryKeys.LIST_DETAILS, listID], (oldData: any) => {
      if (!oldData) return;
      return {
        ...oldData,
        data: {
          ...oldData.data,
          name: formData.name,
          description: formData.description,
          tags: formData.tags,
        },
      };
    });

    toast.info('List updated successfully.');
    onClose();
    },
    onError: () => {
      toast.error('Error updating the list.');
    },
  });

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
    const isUnchanged =
      formData.name === list.listName &&
      formData.description === list.description &&
      JSON.stringify(formData.tags) === JSON.stringify(list.tags);
  
    if (isUnchanged) {
      toast.info('No changes detected.');
      return;
    }
  
    if (formData.name && formData.description && formData.tags.length > 0 && formData.tags.length <= 5) {
      mutate();
    }
  };
  

  return (
    <Box width="100%" height="100%" minHeight={300} sx={{ background: 'transparent', padding: 2 }}>
      <TextField
        required
        label="Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
        error={!formData.name || formData.name.length < 3 || formData.name.length > 150}
        helperText={
          !formData.name
            ? 'Name is required'
            : formData.name.length < 3
            ? 'Name should be at least 3 characters'
            : formData.name.length > 150
            ? 'Name should not exceed 150 characters'
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
          error={!formData.description || formData.description.length < 10 || formData.description.length > 1000}
          helperText={
            !formData.description
              ? 'Description is required'
              : formData.description.length < 10
              ? 'Description should be at least 10 characters'
              : formData.description.length > 1000
              ? 'Description should not exceed 1000 characters'
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
          disabled={status === 'pending'}
          startIcon={status === 'pending' ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {status === 'pending' ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>
    </Box>
  );
};

export default EditList;
