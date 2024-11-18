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
import CustomModal from '../../../components/base/customModal';
import { useQuery } from '@tanstack/react-query';
import getQuestions from '../services/getQuestions';
import queryKeys from '../../../constants/queryKeys';
import { useParams } from 'react-router-dom';
import { Question } from '..';
import AddQuestion from './AddQuestion';

interface QuestionsTableProps {
  questions: Question[];
  onToggleImportant: (questionID: string) => void;
  onToggleDone: (questionID: string) => void;
  onToggleReview: (questionID: string) => void;
  onDeleteQuestions: (questionID: string[]) => void;
  onAddQuestion: (question: {
    listID: string;
    title: string;
    link: string;
  }) => void;
}

export default function QuestionsTable({
  onToggleImportant,
  onToggleDone,
  onToggleReview,
  onDeleteQuestions,
  onAddQuestion,
}: QuestionsTableProps) {
  const { id } = useParams<{ id: string }>();
  const listID = id || '';
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [modalOpen, setModalOpen] = useState(false); // Manage modal state

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKeys.LIST_QUESTIONS, listID],
    queryFn: () => getQuestions(listID!), // Ensure listID is not undefined
    enabled: !!listID, // Only fetch if listID exists
  });

  const questions =
    data?.data.questions.map((q) => ({
      questionID: q.questionID,
      title: q.title,
      leetcodeLink: q.leetcodeLink,
      important: q.status.important,
      done: q.status.done,
      review: q.status.review,
    })) || [];

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedQuestions(
      event.target.checked ? questions.map((q) => q.questionID) : [],
    );
  };

  const handleCheckboxClick = (questionID: string) => {
    setSelectedQuestions((prevSelected) =>
      prevSelected.includes(questionID)
        ? prevSelected.filter((id) => id !== questionID)
        : [...prevSelected, questionID],
    );
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const paginatedQuestions = questions.slice((page - 1) * limit, page * limit);

  return (
    <Box>
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Questions</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setModalOpen(true)} // Open the modal
        >
          Add Question
        </Button>
      </Box>

      {/* Loading and Error States */}
      {isLoading && <Typography>Loading...</Typography>}
      {isError && <Typography color="error">Error: {String(error)}</Typography>}

      {/* Main Content */}
      {!isLoading && !isError && (
        <>
          {/* Toolbar Section */}
          {selectedQuestions.length > 0 && (
            <Toolbar>
              <Tooltip title="Mark as Important">
                <IconButton
                  onClick={() => selectedQuestions.forEach(onToggleImportant)}
                >
                  <Star sx={{ color: 'grey' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Mark as Done">
                <IconButton
                  onClick={() => selectedQuestions.forEach(onToggleDone)}
                >
                  <Check sx={{ color: 'grey' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Mark for Review">
                <IconButton
                  onClick={() => selectedQuestions.forEach(onToggleReview)}
                >
                  <RateReview sx={{ color: 'grey' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => onDeleteQuestions(selectedQuestions)}
                >
                  <Delete sx={{ color: 'grey' }} />
                </IconButton>
              </Tooltip>
            </Toolbar>
          )}

          {/* Table Section */}
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
                      inputProps={{ 'aria-label': 'select all questions' }}
                      sx={{ color: 'grey' }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>
                    Question
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>
                    LeetCode Link
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>
                    Mark as Important
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>
                    Mark as Done
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>
                    Review
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedQuestions.map((question) => (
                  <TableRow
                    key={question.questionID}
                    selected={selectedQuestions.includes(question.questionID)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedQuestions.includes(
                          question.questionID,
                        )}
                        onChange={() =>
                          handleCheckboxClick(question.questionID)
                        }
                        sx={{ color: 'grey' }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>
                      {question.title}
                    </TableCell>
                    <TableCell align="center">
                      {question.leetcodeLink ? (
                       <IconButton
                       href={question.leetcodeLink}
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
                      <IconButton
                        onClick={() => onToggleImportant(question.questionID)}
                        color="secondary"
                      >
                        {question.important ? <Star /> : <StarBorder />}
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '2px 6px', // Smaller padding for a compact look
                          border: '1px solid #2196f3',
                          borderRadius: '3px', // Smaller border radius
                          cursor: 'pointer',
                          fontWeight: question.done ? 'bold' : 'normal',
                          fontSize: '12px', // Smaller font size
                          color: question.done ? 'green' : '#2196f3',
                          minWidth: '60px', // Reduced minimum width
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: question.done
                              ? 'green'
                              : '#2196f3',
                            color: 'white',
                          },
                        }}
                        onClick={() => onToggleDone(question.questionID)}
                      >
                        {question.done ? (
                          <Check sx={{ fontSize: 16 }} /> // Smaller icon size
                        ) : (
                          <Typography variant="body2" sx={{ fontSize: '10px' }}>
                            Mark as Done
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => onToggleReview(question.questionID)}
                        color="primary"
                      >
                        <RateReview
                          sx={{ color: question.review ? 'yellow' : 'inherit' }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination Section */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Typography>
              Page: {page} of {Math.ceil(questions.length / limit)}
            </Typography>
            <Select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              sx={{ color: 'white' }}
            >
              {[5, 10, 15].map((value) => (
                <MenuItem key={value} value={value}>
                  {value} per page
                </MenuItem>
              ))}
            </Select>
            <Pagination
              count={Math.ceil(questions.length / limit)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
      <CustomModal open={modalOpen} setOpen={setModalOpen} name="Add Question">
        <AddQuestion onAddQuestion={onAddQuestion} />
      </CustomModal>
    </Box>
  );
}
