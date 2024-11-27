import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import { defaultStyles } from '../../../constants/defaultStyles';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import addQuestion from '../services/addQuestion';
import queryKeys from '../../../constants/queryKeys';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const AddQuestion: React.FC= () => {
  const [link, setLink] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [linkError, setLinkError] = useState('');
  const match = link.match(/problems\/(.*?)\/description/);
  const title = match ? match[1].replace(/-/g, ' ') : '';
  const { id } = useParams<{ id: string }>();
  const listID = id || '';
  const queryClient = useQueryClient();
  
  const { mutate, status } = useMutation({
    mutationFn: () => addQuestion({ listID, title, link}),
    mutationKey: [queryKeys.ADD_QUESTIONS],
    onSuccess: (response) => {
      const { questionId } = response.data;
      // Update the cache with the newly added question
      queryClient.setQueryData([queryKeys.LIST_QUESTIONS, listID], (oldData: any) => {
        if (!oldData) return;
        const result = {
          ...oldData,
          data: {
            ...oldData.data,
            questions: [...oldData.data.questions, {questionId, title, leetcodeLink: link, status:{important: false, done: false, review: false }}],
          },
        };
        return result;
      });
  
      setLink('');
      toast.success('Question added successfully!');
    },
    onError: () => {
      toast.error('Error adding question. Please try again.');
    },
  });
  
  const handleAddQuestion = () => {
    if (!link) {
      setLinkError('LeetCode link is required.');
      setIsTouched(true);
      return;
    }
  
    if (!title) {
      setLinkError('Invalid LeetCode link. Please check and try again.');
      setIsTouched(true);
      return;
    }

    mutate();
  };
  

  const handleBlur = () => {
    const match = link.match(/https:\/\/leetcode.com\/problems\/.+\/description/);
    if (match) {
      setLinkError('');
    } else {
      setLinkError('Enter a valid LeetCode link (e.g., https://leetcode.com/problems/problem-name/description/)');
    }
    setIsTouched(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLink = e.target.value.replace(/\s+/g, '');
    setLink(newLink);

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
          value={link}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={() => setIsTouched(true)}
          error={isTouched && !!linkError}
          helperText={isTouched && linkError}
          sx={defaultStyles.inputStyles}
        />
      </Box>

      <Box display="flex" justifyContent="flex-end" marginTop={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddQuestion}
          disabled={status === 'pending' || !!linkError}
          startIcon={status === 'pending' ? <CircularProgress size={20} color="inherit" /> : null}
          sx={{
            width: 'auto',
            height: 'auto',
            padding: '5px 15px',
          }}
        >
          {status === 'pending' ? 'Adding...' : 'Add Question'}
        </Button>
      </Box>
    </Box>
  );
};

export default AddQuestion;
