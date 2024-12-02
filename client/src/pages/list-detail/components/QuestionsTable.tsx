import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
  Button,
  Checkbox,
  Pagination,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Star,
  StarBorder,
  Check,
  RateReview,
  Add,
} from '@mui/icons-material';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import AddQuestion from './AddQuestion';
import CustomModal from '../../../components/base/customModal';
import getQuestions from '../services/getQuestions';
import updateQuestion, { UpdateQuestionInputProps } from '../services/updateQuestion.ts';
import deleteQuestion from '../services/deleteQuestion.ts';
import queryKeys from '../../../constants/queryKeys';
import { useParams } from 'react-router-dom';

interface QuestionTableProps {
  isOwner: boolean;
}

export default function QuestionsTable({ isOwner }: QuestionTableProps) {
  const { id } = useParams<{ id: string }>();
  const listID = id || '';
  const queryClient = useQueryClient();

  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKeys.LIST_QUESTIONS, listID],
    queryFn: () => getQuestions(listID!),
    enabled: !!listID,
    refetchOnWindowFocus: false,
  });

  const questions =
    data?.data.questions.map((q) => ({
      questionId: q.questionId,
      title: q.title,
      leetcodeLink: q.leetcodeLink,
      important: q.status.important,
      done: q.status.done,
      review: q.status.review,
    })) || [];

  const { mutate: mutateStatus } = useMutation({
    mutationFn: ({
      questionId,
      status,
    }: {
      questionId: string;
      status: UpdateQuestionInputProps;
    }) => updateQuestion(listID, questionId, status),
    mutationKey: [queryKeys.UPDATE_QUESTIONS_STATUS],
    onSuccess: (response) => {
      const { questionID, ...updatedStatus } = response.data;
      queryClient.setQueryData([queryKeys.LIST_QUESTIONS, listID], (oldData: any) => {
        if (!oldData) return;
        const updatedQuestions = oldData.data.questions.map((q: any) =>
          q.questionId === questionID
            ? { ...q, status: { ...q.status, ...updatedStatus } }
            : q
        );
        return { ...oldData, data: { questions: updatedQuestions } };
      });
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: ({
      questionId
    }: {
      questionId: string;
    }) => deleteQuestion(listID, questionId),
    mutationKey: [queryKeys.DELETE_QUESTIONS],
    onSuccess: (response) => {
      const { questionID } = response.data;
  
      // Update the query cache after successful deletion
      queryClient.setQueryData([queryKeys.LIST_QUESTIONS, listID], (oldData: any) => {
        if (!oldData) return;
  
        // Filter out the deleted question
        const updatedQuestions = oldData.data.questions.filter(
          (q: any) => q.questionId !== questionID
        );
  
        // Return updated data
        return { ...oldData, data: { ...oldData.data, questions: updatedQuestions } };
      });
    },
  });
  
  const handleToggleStatus = (
    questionId: string,
    field: keyof UpdateQuestionInputProps,
    currentValue: boolean
  ) => mutateStatus({ questionId, status: { [field]: !currentValue } });

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedQuestions(
      event.target.checked ? questions.map((q) => q.questionId) : []
    );

  const handleCheckboxClick = (questionId: string) =>
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );

    const handleBulkAction = (action: string) => {
      if (!selectedQuestions.length) return; // Don't proceed if no questions are selected
    
      const updateStatus = (status: UpdateQuestionInputProps) => {
        selectedQuestions.forEach((questionId) => {
          mutateStatus({ questionId, status });
        });
      };
    
      switch (action) {
        case 'important':
          updateStatus({ important: true });
          break;
        case 'unimportant':
          updateStatus({ important: false });
          break;
        case 'done':
          updateStatus({ done: true });
          break;
        case 'undone':
          updateStatus({ done: false });
          break;
        case 'review':
          updateStatus({ review: true });
          break;
        case 'unreview':
          updateStatus({ review: false });
          break;
        case 'delete':
          selectedQuestions.forEach((questionId) => deleteMutate({ questionId }));
          setSelectedQuestions([]);
          break;
        default:
          console.warn(`Unknown action: ${action}`);
      }
    };
    
    useEffect(() => {
      if (questions.length > 0) {
        const lastValidPage = Math.ceil(questions.length / limit);
        if (page > lastValidPage) {
          setPage(lastValidPage); // Reset to the last valid page
        }
      }
    }, [questions.length, page, limit]);
    
    
  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) =>
    setPage(newPage);

  const paginatedQuestions = questions.slice((page - 1) * limit, page * limit);

  const allMarkedAs = (key: keyof UpdateQuestionInputProps) => {
    return selectedQuestions.every((questionId) => {
      const question = questions.find((q) => q.questionId === questionId);
      return question ? question[key] : false;
    });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Questions</Typography>

        {selectedQuestions.length > 0 && (
          <Box display="flex" gap={2}>
             <Button
          variant="contained"
          color="primary"
          onClick={() => handleBulkAction(allMarkedAs('important') ? 'unimportant' : 'important')}
        >
          {allMarkedAs('important') ? 'Unmark as Important' : 'Mark as Important'}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleBulkAction(allMarkedAs('review') ? 'unreview' : 'review')}
        >
          {allMarkedAs('review') ? 'Unmark as Review' : 'Mark as Review'}
        </Button>
        <Button
          variant="contained"
          onClick={() => handleBulkAction(allMarkedAs('done') ? 'undone' : 'done')}
        >
          {allMarkedAs('done') ? 'Unmark as Done' : 'Mark as Done'}
        </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleBulkAction('delete')}
            >
              Delete
            </Button>
          </Box>
        )}

        {isOwner && <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setModalOpen(true)}
          sx={{ backgroundColor: '#1976d2', color: 'white', '&:hover': { backgroundColor: '#1565c0' } }}
        >
          Add Question
        </Button>}
      </Box>

      {isLoading && <Typography>Loading...</Typography>}
      {isError && <Typography color="error">Error: {String(error)}</Typography>}

      {!isLoading && !isError && (
        <>
          <TableContainer
            component={Paper}
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                  {questions.length > 0 && ( // Render checkbox only if there are questions
        <Checkbox
          indeterminate={selectedQuestions.length > 0 && selectedQuestions.length < questions.length}
          checked={selectedQuestions.length === questions.length}
          onChange={handleSelectAllClick}
          sx={{ color: 'grey' }}
        />
      )}
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>Question</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>LeetCode Link</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>Mark as Important</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>Mark as Done</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>Review</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
  {paginatedQuestions.length === 0 ? (
    <TableRow sx={{ height: '100px' }}> {/* Increase row height */}
      <TableCell
        colSpan={6}
        align="center"
        sx={{
          color: 'gray',
          fontSize: '1.2rem', // Increase text size
          fontWeight: 'bold', // Make text bold
          padding: '20px', // Add padding for spacing
        }}
      >
        No questions were added.
      </TableCell>
    </TableRow>
  ) : (
    paginatedQuestions.map((q) => (
      <TableRow key={q.questionId}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selectedQuestions.includes(q.questionId)}
            onChange={() => handleCheckboxClick(q.questionId)}
            sx={{ color: 'grey' }}
          />
        </TableCell>
        <TableCell align="center" sx={{ color: 'white' }}>
          {q.title}
        </TableCell>
        <TableCell align="center">
          {q.leetcodeLink ? (
            <IconButton
              href={q.leetcodeLink}
              target="_blank"
              color="primary"
              sx={{
                borderRadius: '50%',
                backgroundColor: 'gray',
                padding: 1,
                '&:hover': {
                  backgroundColor: '#ccc',
                },
              }}
            >
              <img
                src="/leetcode.svg"
                alt="LeetCode Link"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                }}
              />
            </IconButton>
          ) : (
            'No Link'
          )}
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={() => handleToggleStatus(q.questionId, 'important', q.important)}>
            {q.important ? <Star sx={{ color: '#fbc02d' }} /> : <StarBorder sx={{ color: '#fbc02d' }} />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <Box
            onClick={() => handleToggleStatus(q.questionId, 'done', q.done)}
            sx={{
              cursor: 'pointer',
              fontWeight: q.done ? 'bold' : 'normal',
              color: q.done ? 'green' : '#2196f3',
              '&:hover': {
                backgroundColor: q.done ? 'green' : '#2196f3',
                color: 'white',
              },
            }}
          >
            {q.done ? <Check /> : 'Mark as Done'}
          </Box>
        </TableCell>
        <TableCell align="center">
          <IconButton
            onClick={() => handleToggleStatus(q.questionId, 'review', q.review)}
            sx={{ color: q.review ? 'yellow' : 'inherit' }}
          >
            <RateReview />
          </IconButton>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>

  

            </Table>
          </TableContainer>

          {questions.length > 5 && (
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <Typography>Page: {page} of {Math.ceil(questions.length / limit) || 1}</Typography>
              <Select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  '& .MuiOutlinedInput-root': {
                    borderColor: 'white', // Make border white
                  },
                  '& .MuiSelect-icon': {
                    color: 'white', // Make the dropdown icon white
                  }
                }}
              >
                {[5, 10, 15].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value} per page
                  </MenuItem>
                ))}
              </Select>
              <Pagination
                count={Math.ceil(questions.length / limit) || 1}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: 'white',
                  },
                  '& .MuiPaginationItem-page.Mui-selected': {
                    backgroundColor: 'white', 
                    color: 'black',
                  },
                }}
              />
            </Box>
          )}

        </>
      )}

      <CustomModal open={modalOpen} setOpen={setModalOpen} name="Add Question">
        <AddQuestion />
      </CustomModal>
    </Box>
  );
}
