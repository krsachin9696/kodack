import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Typography, Button } from '@mui/material';
import { Star, StarBorder, Check, Link, RateReview } from '@mui/icons-material';

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
}

export default function QuestionsTable({
  questions,
  onToggleImportant,
  onToggleDone,
  onToggleReview,
}: QuestionsTableProps) {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Questions</Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Question</TableCell>
              <TableCell sx={{ color: 'white' }}>LeetCode Link</TableCell>
              <TableCell sx={{ color: 'white' }}>Mark as Important</TableCell>
              <TableCell sx={{ color: 'white' }}>Mark as Done</TableCell>
              <TableCell sx={{ color: 'white' }}>Review</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell sx={{ color: 'white' }}>{question.title}</TableCell>
                <TableCell>
                  {question.leetcodeLink ? (
                    <IconButton href={question.leetcodeLink} target="_blank" color="primary">
                      <Link />
                    </IconButton>
                  ) : (
                    <Button variant="text" size="small" onClick={() => alert(`Add LeetCode link for ${question.title}`)}>
                      Add Link
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onToggleImportant(question.id)} color="secondary">
                    {question.important ? <Star /> : <StarBorder />}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px 12px', border: '2px solid #2196f3', borderRadius: '5px', cursor: 'pointer', fontWeight: question.done ? 'bold' : 'normal', color: question.done ? 'green' : '#2196f3', minWidth: '120px', transition: 'all 0.3s ease', '&:hover': { backgroundColor: question.done ? 'green' : '#2196f3', color: 'white' }}} onClick={() => onToggleDone(question.id)}>
                    {question.done ? <Check sx={{ fontSize: 24 }} /> : <Typography>Mark as Done</Typography>}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onToggleReview(question.id)} color="primary">
                    <RateReview sx={{ color: question.review ? 'yellow' : 'inherit', fontSize: 24 }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
