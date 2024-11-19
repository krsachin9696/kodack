import React, { useState } from 'react';
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
  Toolbar,
  Tooltip,
  Pagination,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Star,
  StarBorder,
  Check,
  Link,
  RateReview,
  Delete,
  Add,
} from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AddQuestion from './AddQuestion';
import CustomModal from '../../../components/base/customModal';
import getQuestions from '../services/getQuestions';
import updateQuestion, { UpdateQuestionInputProps } from '../services/updateQuestion.ts';
import queryKeys from '../../../constants/queryKeys';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Question } from '..';

interface QuestionsTableProps {
  questions: Question[];
    onAddQuestion: (question: {
    listID: string;
    title: string;
    link: string;
  }) => void;
}

export default function QuestionsTable({
  onAddQuestion,
}: QuestionsTableProps) {
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

  const { mutate } = useMutation({
    mutationFn: ({
      questionId,
      status,
    }: {
      questionId: string;
      status: UpdateQuestionInputProps;
    }) => updateQuestion(listID, questionId, status),
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

  const handleToggleStatus = (
    questionId: string,
    field: keyof UpdateQuestionInputProps,
    currentValue: boolean
  ) => mutate({ questionId, status: { [field]: !currentValue } });

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

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) =>
    setPage(newPage);

  const paginatedQuestions = questions.slice((page - 1) * limit, page * limit);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Questions</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setModalOpen(true)}
          sx={{ backgroundColor: '#1976d2', color: 'white', '&:hover': { backgroundColor: '#1565c0' } }}
        >
          Add Question
        </Button>
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
                    <Checkbox
                      indeterminate={
                        selectedQuestions.length > 0 &&
                        selectedQuestions.length < questions.length
                      }
                      checked={
                        questions.length > 0 &&
                        selectedQuestions.length === questions.length
                      }
                      onChange={handleSelectAllClick}
                      sx={{ color: 'grey' }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>Question</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>LeetCode Link</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>Mark as Important</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>Mark as Done</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>Review</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedQuestions.map((q) => (
                  <TableRow key={q.questionId}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedQuestions.includes(q.questionId)}
                        onChange={() => handleCheckboxClick(q.questionId)}
                        sx={{ color: 'grey' }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{q.title}</TableCell>
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
                           borderRadius: '50%', // Ensure the image is also circular
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Typography>Page: {page} of {Math.ceil(questions.length / limit)}</Typography>
            <Select value={limit} onChange={(e) => setLimit(Number(e.target.value))} sx={{ color: 'white' }}>
              {[5, 10, 15].map((value) => (
                <MenuItem key={value} value={value}>{value} per page</MenuItem>
              ))}
            </Select>
            <Pagination count={Math.ceil(questions.length / limit)} page={page} onChange={handlePageChange} color="primary" />
          </Box>
        </>
      )}

      <CustomModal open={modalOpen} setOpen={setModalOpen} name="Add Question">
        <AddQuestion onAddQuestion={onAddQuestion} />
      </CustomModal>
    </Box>
  );
}
