// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, IconButton, Box, Typography, Button, Checkbox, Toolbar, Tooltip, Pagination, Select, MenuItem
// } from '@mui/material';
// import { Star, StarBorder, Check, Link, RateReview, Delete, Add } from '@mui/icons-material';
// import { useState } from 'react';

// interface Question {
//   id: number;
//   title: string;
//   leetcodeLink?: string;
//   important: boolean;
//   done: boolean;
//   review: boolean;
// }

// interface QuestionsTableProps {
//   questions: Question[];
//   onToggleImportant: (id: number) => void;
//   onToggleDone: (id: number) => void;
//   onToggleReview: (id: number) => void;
//   onDeleteQuestions: (ids: number[]) => void;
// }

// export default function QuestionsTable({
//   questions,
//   onToggleImportant,
//   onToggleDone,
//   onToggleReview,
//   onDeleteQuestions,
// }: QuestionsTableProps) {
//   const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(5);

//   const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedQuestions(event.target.checked ? questions.map((q) => q.id) : []);
//   };

//   const handleCheckboxClick = (id: number) => {
//     setSelectedQuestions((prevSelected) =>
//       prevSelected.includes(id) ? prevSelected.filter((qid) => qid !== id) : [...prevSelected, id]
//     );
//   };

//   const handleToggleImportant = () => {
//     selectedQuestions.forEach(onToggleImportant);
//     setSelectedQuestions([]);
//   };

//   const handleToggleDone = () => {
//     selectedQuestions.forEach(onToggleDone);
//     setSelectedQuestions([]);
//   };

//   const handleToggleReview = () => {
//     selectedQuestions.forEach(onToggleReview);
//     setSelectedQuestions([]);
//   };

//   const handleDeleteQuestions = () => {
//     onDeleteQuestions(selectedQuestions);
//     setSelectedQuestions([]);
//   };

//   const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
//     setPage(newPage);
//   };

//   const paginatedQuestions = questions.slice((page - 1) * limit, page * limit);

//   return (
//     <Box>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h6">Questions</Typography>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => alert('Add a new question')}
//         >
//           Add Question
//         </Button>
//       </Box>

//       {selectedQuestions.length > 0 && (
//         <Toolbar>
//           <Tooltip title="Mark as Important">
//             <IconButton onClick={handleToggleImportant} sx={{ color: 'grey' }}>
//               <Star />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Mark as Done">
//             <IconButton onClick={handleToggleDone} sx={{ color: 'grey' }}>
//               <Check />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Mark for Review">
//             <IconButton onClick={handleToggleReview} sx={{ color: 'grey' }}>
//               <RateReview />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Delete">
//             <IconButton onClick={handleDeleteQuestions} sx={{ color: 'grey' }}>
//               <Delete />
//             </IconButton>
//           </Tooltip>
//         </Toolbar>
//       )}

//       <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell padding="checkbox">
//                 <Checkbox
//                   indeterminate={
//                     selectedQuestions.length > 0 && selectedQuestions.length < questions.length
//                   }
//                   checked={questions.length > 0 && selectedQuestions.length === questions.length}
//                   onChange={handleSelectAllClick}
//                   inputProps={{ 'aria-label': 'select all questions' }}
//                 />
//               </TableCell>
//               <TableCell align="center" sx={{ color: 'white' }}>Question</TableCell>
//               <TableCell align="center" sx={{ color: 'white' }}>LeetCode Link</TableCell>
//               <TableCell align="center" sx={{ color: 'white' }}>Mark as Important</TableCell>
//               <TableCell align="center" sx={{ color: 'white' }}>Mark as Done</TableCell>
//               <TableCell align="center" sx={{ color: 'white' }}>Review</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedQuestions.map((question) => (
//               <TableRow key={question.id} selected={selectedQuestions.includes(question.id)}>
//                 <TableCell padding="checkbox">
//                   <Checkbox
//                     checked={selectedQuestions.includes(question.id)}
//                     onChange={() => handleCheckboxClick(question.id)}
//                     sx={{ color: 'grey' }}
//                   />
//                 </TableCell>
//                 <TableCell align="center" sx={{ color: 'white' }}>{question.title}</TableCell>
//                 <TableCell align="center">
//                   {question.leetcodeLink ? (
//                     <IconButton href={question.leetcodeLink} target="_blank" color="primary">
//                       <Link />
//                     </IconButton>
//                   ) : (
//                     <IconButton color="primary" onClick={() => alert(`Add LeetCode link for ${question.title}`)}>
//                       <Add />
//                     </IconButton>
//                   )}
//                 </TableCell>
//                 <TableCell align="center">
//                   <IconButton onClick={() => onToggleImportant(question.id)} color="secondary">
//                     {question.important ? <Star /> : <StarBorder />}
//                   </IconButton>
//                 </TableCell>
//                 <TableCell align="center">
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       padding: '4px 8px',
//                       border: '2px solid #2196f3',
//                       borderRadius: '5px',
//                       cursor: 'pointer',
//                       fontWeight: question.done ? 'bold' : 'normal',
//                       color: question.done ? 'green' : '#2196f3',
//                       minWidth: '80px',
//                       transition: 'all 0.3s ease',
//                       '&:hover': { backgroundColor: question.done ? 'green' : '#2196f3', color: 'white' },
//                     }}
//                     onClick={() => onToggleDone(question.id)}
//                   >
//                     {question.done ? <Check sx={{ fontSize: 20 }} /> : <Typography variant="body2">Mark as Done</Typography>}
//                   </Box>
//                 </TableCell>
//                 <TableCell align="center">
//                   <IconButton onClick={() => onToggleReview(question.id)} color="primary">
//                     <RateReview sx={{ color: question.review ? 'yellow' : 'inherit', fontSize: 24 }} />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
//         <Typography>Page: {page} of {Math.ceil(questions.length / limit)}</Typography>
//         <Select
//           value={limit}
//           onChange={(e) => setLimit(Number(e.target.value))}
//           sx={{ color: 'white' }}
//         >
//           {[3, 5, 7].map((value) => (
//             <MenuItem key={value} value={value}>{value} per page</MenuItem>
//           ))}
//         </Select>
//         <Pagination
//           count={Math.ceil(questions.length / limit)}
//           page={page}
//           onChange={handlePageChange}
//           color="primary"
//         />
//       </Box>
//     </Box>
//   );
// }

import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Box, Typography, Button, Checkbox, Toolbar, Tooltip, Pagination, Select, MenuItem
} from '@mui/material';
import { Star, StarBorder, Check, Link, RateReview, Delete, Add } from '@mui/icons-material';
import AddQuestion from './AddQUestion';
import CustomModal from '../../../components/base/customModal';

interface Question {
  id: number;
  title: string;
  leetcodeLink?: string;
  important: boolean;
  done: boolean;
  review: boolean;
}

interface QuestionsTableProps {
  questions: Question[];
  onToggleImportant: (id: number) => void;
  onToggleDone: (id: number) => void;
  onToggleReview: (id: number) => void;
  onDeleteQuestions: (ids: number[]) => void;
  onAddQuestion: (question: { title: string; link: string }) => void; // Modify this line
}


export default function QuestionsTable({
  questions,
  onToggleImportant,
  onToggleDone,
  onToggleReview,
  onDeleteQuestions,
  onAddQuestion,
}: QuestionsTableProps) {
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);  // Manage modal state

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedQuestions(event.target.checked ? questions.map((q) => q.id) : []);
  };

  const handleCheckboxClick = (id: number) => {
    setSelectedQuestions((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((qid) => qid !== id) : [...prevSelected, id]
    );
  };

  const handleToggleImportant = () => {
    selectedQuestions.forEach(onToggleImportant);
    setSelectedQuestions([]);
  };

  const handleToggleDone = () => {
    selectedQuestions.forEach(onToggleDone);
    setSelectedQuestions([]);
  };

  const handleToggleReview = () => {
    selectedQuestions.forEach(onToggleReview);
    setSelectedQuestions([]);
  };

  const handleDeleteQuestions = () => {
    onDeleteQuestions(selectedQuestions);
    setSelectedQuestions([]);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const paginatedQuestions = questions.slice((page - 1) * limit, page * limit);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Questions</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setModalOpen(true)}  // Open the modal
        >
          Add Question
        </Button>
      </Box>

      {selectedQuestions.length > 0 && (
        <Toolbar>
          <Tooltip title="Mark as Important">
            <IconButton onClick={handleToggleImportant} sx={{ color: 'grey' }}>
              <Star />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mark as Done">
            <IconButton onClick={handleToggleDone} sx={{ color: 'grey' }}>
              <Check />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mark for Review">
            <IconButton onClick={handleToggleReview} sx={{ color: 'grey' }}>
              <RateReview />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteQuestions} sx={{ color: 'grey' }}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Toolbar>
      )}

      <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedQuestions.length > 0 && selectedQuestions.length < questions.length
                  }
                  checked={questions.length > 0 && selectedQuestions.length === questions.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all questions' }}
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
            {paginatedQuestions.map((question) => (
              <TableRow key={question.id} selected={selectedQuestions.includes(question.id)}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedQuestions.includes(question.id)}
                    onChange={() => handleCheckboxClick(question.id)}
                    sx={{ color: 'grey' }}
                  />
                </TableCell>
                <TableCell align="center" sx={{ color: 'white' }}>{question.title}</TableCell>
                <TableCell align="center">
                  {question.leetcodeLink ? (
                    <IconButton href={question.leetcodeLink} target="_blank" color="primary">
                      <Link />
                    </IconButton>
                  ) : (
                    <IconButton color="primary" onClick={() => alert(`Add LeetCode link for ${question.title}`)}>
                      <Add />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => onToggleImportant(question.id)} color="secondary">
                    {question.important ? <Star /> : <StarBorder />}
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px 8px',
                      border: '2px solid #2196f3',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontWeight: question.done ? 'bold' : 'normal',
                      color: question.done ? 'green' : '#2196f3',
                      minWidth: '80px',
                      transition: 'all 0.3s ease',
                      '&:hover': { backgroundColor: question.done ? 'green' : '#2196f3', color: 'white' },
                    }}
                    onClick={() => onToggleDone(question.id)}
                  >
                    {question.done ? <Check sx={{ fontSize: 20 }} /> : <Typography variant="body2">Mark as Done</Typography>}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => onToggleReview(question.id)} color="primary">
                    <RateReview sx={{ color: question.review ? 'yellow' : 'inherit', fontSize: 24 }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography>Page: {page} of {Math.ceil(questions.length / limit)}</Typography>
        <Select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          sx={{ color: 'white' }}
        >
          {[3, 5, 7].map((value) => (
            <MenuItem key={value} value={value}>{value} per page</MenuItem>
          ))}
        </Select>
        <Pagination
          count={Math.ceil(questions.length / limit)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {/* Custom Modal for Add Question */}
      <CustomModal open={modalOpen} setOpen={setModalOpen} name="Add Question">
        <AddQuestion onAddQuestion={onAddQuestion} />
      </CustomModal>
    </Box>
  );
}
