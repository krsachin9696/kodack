import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Divider } from '@mui/material';
import ListDetail from './components/ListDetail';
import AccessRequests from './components/AccessRequests';
import QuestionsTable from './components/QuestionsTable';
import axios from 'axios';


export interface Question {
  questionId: string;
  title: string;
  leetcodeLink: string;
  important: boolean;
  done: boolean;
  review: boolean;
};


const ListDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // Retrieve dynamic `id` from the URL
  const listID = id || '';

  // State to manage questions, access requests, and users with access
  const [questions, setQuestions] = useState<Question[]>([]);
  const [accessRequests, setAccessRequests] = useState([]);
  const [usersWithAccess, setUsersWithAccess] = useState([]);

  // Function to fetch data for the list
  const fetchListData = async () => {
    try {
      const { data } = await axios.get(`/api/lists/${listID}`);
      setQuestions(data.questions || []);
      setAccessRequests(data.accessRequests || []);
      setUsersWithAccess(data.usersWithAccess || []);
    } catch (error) {
      console.error('Error fetching list data:', error);
    }
  };

  // Fetch data on component mount and `listID` change
  useEffect(() => {
    if (listID) {
      fetchListData();
    }
  }, [listID]);
  

  // Function to handle adding a question
  const handleAddQuestion = (newQuestion: { title: string; link: string }) => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        questionId: `${Date.now()}`, // Unique question ID
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
      {/* List Details Section */}
      <ListDetail listID={listID} />
      <Divider sx={{ my: 2 }} />

      {/* Access Requests Section */}
      <AccessRequests
        // requests={accessRequests}
        // usersWithAccess={usersWithAccess}
        // onApprove={(userID) =>
        //   setAccessRequests((prev) => prev.filter((req) => req !== userID))
        // }
        // onReject={(userID) =>
        //   setAccessRequests((prev) => prev.filter((req) => req !== userID))
        // }
      />
      <Divider sx={{ my: 2 }} />

      {/* Questions Section */}
      <QuestionsTable
        questions={questions}
        onAddQuestion={handleAddQuestion}
      />
    </Box>
  );
};

export default ListDetailPage;
