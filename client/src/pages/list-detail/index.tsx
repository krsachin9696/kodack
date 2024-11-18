import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Divider } from '@mui/material';
import ListDetail from './components/ListDetail';
import AccessRequests from './components/AccessRequests';
import QuestionsTable from './components/QuestionsTable';

export interface Question {
  questionID: string;
  title: string;
  leetcodeLink?: string;
  important: boolean;
  done: boolean;
  review: boolean;
}

interface ListData {
  questions: Question[];
  accessRequests: string[];
  usersWithAccess: string[];
}

const ListDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // Retrieve the dynamic `id` from the URL

  const [questions, setQuestions] = useState<Question[]>([]);
  const [accessRequests, setAccessRequests] = useState<string[]>(['User1', 'User2', 'User3']);
  const [usersWithAccess, setUsersWithAccess] = useState<string[]>(['user4']);

  useEffect(() => {
    if (id) {
      fetchListData(id);
    }
  }, [id]);

  const fetchListData = async (listID: string) => {
    try {
      const response = await fetch(`/api/lists/${listID}`);
      const data: ListData = await response.json();
      setQuestions(data.questions || []);
      setAccessRequests(data.accessRequests || []);
      setUsersWithAccess(data.usersWithAccess || []);
    } catch (error) {
      console.error('Error fetching list data:', error);
    }
  };

  const handleToggleImportant = (questionID: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.questionID === questionID ? { ...q, important: !q.important } : q
      )
    );
  };

  const handleToggleDone = (questionID: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.questionID === questionID ? { ...q, done: !q.done } : q
      )
    );
  };

  const handleToggleReview = (questionID: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.questionID === questionID ? { ...q, review: !q.review } : q
      )
    );
  };

  const handleDeleteQuestions = (selectedIDs: string[]) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((q) => !selectedIDs.includes(q.questionID))
    );
  };

  const handleAddQuestion = (newQuestion: { title: string; link: string }) => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        questionID: `${Date.now()}`, // Generate unique questionID
        title: newQuestion.title,
        leetcodeLink: newQuestion.link,
        important: false,
        done: false,
        review: false,
      },
    ]);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <ListDetail listID={id || ''} />
      <Divider sx={{ my: 2 }} />
      <Box display="flex">
        <AccessRequests
          requests={accessRequests}
          usersWithAccess={usersWithAccess}
          onApprove={(user) =>
            setAccessRequests(accessRequests.filter((request) => request !== user))
          }
          onReject={(user) =>
            setAccessRequests(accessRequests.filter((request) => request !== user))
          }
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <QuestionsTable
        questions={questions}
        onToggleImportant={handleToggleImportant}
        onToggleDone={handleToggleDone}
        onToggleReview={handleToggleReview}
        onDeleteQuestions={handleDeleteQuestions}
        onAddQuestion={handleAddQuestion}
      />
    </Box>
  );
};

export default ListDetailPage;
