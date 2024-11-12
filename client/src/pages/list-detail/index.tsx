// // // import { useState } from 'react';
// // // import {
// // //   Box,
// // //   Typography,
// // //   Button,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   Paper,
// // //   IconButton,
// // //   Divider,
// // // } from '@mui/material';
// // // import { Star, StarBorder, Check, Link, RateReview } from '@mui/icons-material';
// // // import { Line } from 'react-chartjs-2';
// // // import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// // // ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// // // interface Question {
// // //   id: number;
// // //   title: string;
// // //   leetcodeLink?: string;
// // //   important: boolean;
// // //   done: boolean;
// // //   review: boolean;  // New field to track review status
// // // }

// // // export default function ListDetailPage() {
// // //   const [questions, setQuestions] = useState<Question[]>([
// // //     { id: 1, title: 'Question 1', leetcodeLink: '', important: false, done: false, review: false },
// // //     { id: 2, title: 'Question 2', leetcodeLink: '', important: true, done: false, review: false },
// // //     { id: 3, title: 'Question 3', leetcodeLink: '', important: false, done: true, review: false },
// // //   ]);

// // //   const [accessRequests, setAccessRequests] = useState(['User1', 'User2', 'User3']);
// // //   const progressData = {
// // //     labels: ['Start', '25%', '50%', '75%', 'Complete'],
// // //     datasets: [
// // //       {
// // //         label: 'Completion Progress',
// // //         data: [0, 20, 50, 70, 100],
// // //         borderColor: 'skyblue',
// // //         backgroundColor: 'rgba(135, 206, 250, 0.4)',
// // //       },
// // //     ],
// // //   };

// // //   const handleToggleImportant = (id: number) => {
// // //     setQuestions((prev) =>
// // //       prev.map((question) =>
// // //         question.id === id ? { ...question, important: !question.important } : question
// // //       )
// // //     );
// // //   };

// // //   const handleToggleDone = (id: number) => {
// // //     setQuestions((prev) =>
// // //       prev.map((question) =>
// // //         question.id === id ? { ...question, done: !question.done } : question
// // //       )
// // //     );
// // //   };

// // //   const handleToggleReview = (id: number) => {
// // //     setQuestions((prev) =>
// // //       prev.map((question) =>
// // //         question.id === id ? { ...question, review: !question.review } : question
// // //       )
// // //     );
// // //   };

// // //   const handleApproveRequest = (user: string) => {
// // //     alert(`Access granted to ${user}`);
// // //     setAccessRequests((prev) => prev.filter((request) => request !== user));
// // //   };

// // //   const handleRejectRequest = (user: string) => {
// // //     alert(`Access rejected for ${user}`);
// // //     setAccessRequests((prev) => prev.filter((request) => request !== user));
// // //   };

// // //   return (
// // //     <Box sx={{ p: 4, color: 'white', width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
// // //       {/* Heading and Description */}
// // //       <Typography variant="h4" fontWeight="bold">
// // //         List Name
// // //       </Typography>
// // //       <Typography variant="body1">
// // //         This is the description of the list. It provides an overview of the list's purpose and contents.
// // //       </Typography>

// // //       {/* Graph and Access Requests */}
// // //       <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={4}>
// // //         <Box flex={1}>
// // //           <Typography variant="h6">Progress</Typography>
// // //           <Line data={progressData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
// // //         </Box>

// // //         <Box flex={1}>
// // //           <Typography variant="h6">Access Requests</Typography>
// // //           {accessRequests.length ? (
// // //             accessRequests.map((request, index) => (
// // //               <Box key={index} display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
// // //                 <Typography>{request}</Typography>
// // //                 <Box>
// // //                   <Button
// // //                     variant="contained"
// // //                     size="small"
// // //                     color="primary"
// // //                     onClick={() => handleApproveRequest(request)}
// // //                     sx={{ marginRight: 1 }}
// // //                   >
// // //                     Approve
// // //                   </Button>
// // //                   <Button
// // //                     variant="contained"
// // //                     size="small"
// // //                     color="secondary"
// // //                     onClick={() => handleRejectRequest(request)}
// // //                   >
// // //                     Reject
// // //                   </Button>
// // //                 </Box>
// // //               </Box>
// // //             ))
// // //           ) : (
// // //             <Typography>No pending requests</Typography>
// // //           )}
// // //         </Box>
// // //       </Box>
// // //       <Divider sx={{ my: 2 }} />

// // //       {/* Questions Table */}
// // //       <Box>
// // //         <Typography variant="h6" sx={{ mb: 2 }}>
// // //           Questions
// // //         </Typography>
// // //         <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
// // //           <Table>
// // //             <TableHead>
// // //               <TableRow>
// // //                 <TableCell sx={{ color: 'white' }}>Question</TableCell>
// // //                 <TableCell sx={{ color: 'white' }}>LeetCode Link</TableCell>
// // //                 <TableCell sx={{ color: 'white' }}>Mark as Important</TableCell>
// // //                 <TableCell sx={{ color: 'white' }}>Mark as Done</TableCell>
// // //                 <TableCell sx={{ color: 'white' }}>Review</TableCell>
// // //               </TableRow>
// // //             </TableHead>
// // //             <TableBody>
// // //               {questions.map((question) => (
// // //                 <TableRow key={question.id}>
// // //                   <TableCell sx={{ color: 'white' }}>{question.title}</TableCell>
// // //                   <TableCell>
// // //                     {question.leetcodeLink ? (
// // //                       <IconButton href={question.leetcodeLink} target="_blank" color="primary">
// // //                         <Link />
// // //                       </IconButton>
// // //                     ) : (
// // //                       <Button variant="text" size="small" onClick={() => alert(`Add LeetCode link for ${question.title}`)}>
// // //                         Add Link
// // //                       </Button>
// // //                     )}
// // //                   </TableCell>
// // //                   <TableCell>
// // //                     <IconButton onClick={() => handleToggleImportant(question.id)} color="secondary">
// // //                       {question.important ? <Star /> : <StarBorder />}
// // //                     </IconButton>
// // //                   </TableCell>
// // //                   <TableCell>
// // //                     <Box
// // //                       sx={{
// // //                         display: 'flex',
// // //                         alignItems: 'center',
// // //                         justifyContent: 'center',
// // //                         padding: '6px 12px',
// // //                         border: '2px solid #2196f3',
// // //                         borderRadius: '5px',
// // //                         cursor: 'pointer',
// // //                         fontWeight: question.done ? 'bold' : 'normal',
// // //                         color: question.done ? 'green' : '#2196f3',
// // //                         minWidth: '120px',
// // //                         transition: 'all 0.3s ease',
// // //                         '&:hover': {
// // //                           backgroundColor: question.done ? 'green' : '#2196f3',
// // //                           color: 'white',
// // //                         },
// // //                       }}
// // //                       onClick={() => handleToggleDone(question.id)}
// // //                     >
// // //                       {question.done ? <Check sx={{ fontSize: 24 }} /> : <Typography>Mark as Done</Typography>}
// // //                     </Box>
// // //                   </TableCell>
// // //                   <TableCell>
// // //                     <IconButton onClick={() => handleToggleReview(question.id)} color="primary">
// // //                       {question.review ? <RateReview sx={{ color: 'yellow', fontSize: 24 }} /> : <RateReview sx={{ fontSize: 24 }} />}
// // //                     </IconButton>
// // //                   </TableCell>
// // //                 </TableRow>
// // //               ))}
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>
// // //       </Box>
// // //     </Box>
// // //   );
// // // }

// // import { useState } from 'react';
// // import {
// //   Box,
// //   Typography,
// //   Button,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// //   IconButton,
// //   Divider,
// // } from '@mui/material';
// // import { Star, StarBorder, Check, Link, RateReview } from '@mui/icons-material';
// // import { Line } from 'react-chartjs-2';
// // import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// // ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// // interface Question {
// //   id: number;
// //   title: string;
// //   leetcodeLink?: string;
// //   important: boolean;
// //   done: boolean;
// //   review: boolean;  // New field to track review status
// // }

// // export default function ListDetailPage() {
// //   const [questions, setQuestions] = useState<Question[]>([
// //     { id: 1, title: 'Question 1', leetcodeLink: '', important: false, done: false, review: false },
// //     { id: 2, title: 'Question 2', leetcodeLink: '', important: true, done: false, review: false },
// //     { id: 3, title: 'Question 3', leetcodeLink: '', important: false, done: true, review: false },
// //   ]);

// //   const [accessRequests, setAccessRequests] = useState(['User1', 'User2', 'User3']);
// //   const [usersWithAccess, setUsersWithAccess] = useState(['User4', 'User5']);  // New state for users with access

// //   const progressData = {
// //     labels: ['Start', '25%', '50%', '75%', 'Complete'],
// //     datasets: [
// //       {
// //         label: 'Completion Progress',
// //         data: [0, 20, 50, 70, 100],
// //         borderColor: 'skyblue',
// //         backgroundColor: 'rgba(135, 206, 250, 0.4)',
// //       },
// //     ],
// //   };

// //   const handleToggleImportant = (id: number) => {
// //     setQuestions((prev) =>
// //       prev.map((question) =>
// //         question.id === id ? { ...question, important: !question.important } : question
// //       )
// //     );
// //   };

// //   const handleToggleDone = (id: number) => {
// //     setQuestions((prev) =>
// //       prev.map((question) =>
// //         question.id === id ? { ...question, done: !question.done } : question
// //       )
// //     );
// //   };

// //   const handleToggleReview = (id: number) => {
// //     setQuestions((prev) =>
// //       prev.map((question) =>
// //         question.id === id ? { ...question, review: !question.review } : question
// //       )
// //     );
// //   };

// //   const handleApproveRequest = (user: string) => {
// //     alert(`Access granted to ${user}`);
// //     setAccessRequests((prev) => prev.filter((request) => request !== user));
// //     setUsersWithAccess((prev) => [...prev, user]);  // Add to users with access
// //   };

// //   const handleRejectRequest = (user: string) => {
// //     alert(`Access rejected for ${user}`);
// //     setAccessRequests((prev) => prev.filter((request) => request !== user));
// //   };

// //   return (
// //     <Box sx={{ p: 4, color: 'white', width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
// //       {/* Heading and Description */}
// //       <Typography variant="h4" fontWeight="bold">
// //         List Name
// //       </Typography>
// //       <Typography variant="body1">
// //         This is the description of the list. It provides an overview of the list's purpose and contents.
// //       </Typography>

// //       {/* Graph and Access Requests */}
// //       <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={4}>
// //         <Box flex={1}>
// //           <Typography variant="h6">Progress</Typography>
// //           <Line data={progressData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
// //         </Box>

// //         <Box flex={1}>
// //           <Typography variant="h6" sx={{ mb: 2 }}>Access Requests</Typography>
// //           {/* Pending Access Requests */}
// //           {accessRequests.length > 0 && (
// //             <Box>
// //               <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
// //                 Pending Requests
// //               </Typography>
// //               {accessRequests.map((request, index) => (
// //                 <Box key={index} display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
// //                   <Typography>{request}</Typography>
// //                   <Box>
// //                     <Button
// //                       variant="contained"
// //                       size="small"
// //                       color="primary"
// //                       onClick={() => handleApproveRequest(request)}
// //                       sx={{ marginRight: 1 }}
// //                     >
// //                       Approve
// //                     </Button>
// //                     <Button
// //                       variant="contained"
// //                       size="small"
// //                       color="secondary"
// //                       onClick={() => handleRejectRequest(request)}
// //                     >
// //                       Reject
// //                     </Button>
// //                   </Box>
// //                 </Box>
// //               ))}
// //             </Box>
// //           )}

// //           {/* Users with Access */}
// //           {usersWithAccess.length > 0 && (
// //             <Box sx={{ mt: 3 }}>
// //               <Typography variant="subtitle1" sx={{ color: 'success.main', fontWeight: 'bold' }}>
// //                 Users with Access
// //               </Typography>
// //               {usersWithAccess.map((user, index) => (
// //                 <Box key={index} display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
// //                   <Typography>{user}</Typography>
// //                 </Box>
// //               ))}
// //             </Box>
// //           )}
// //         </Box>
// //       </Box>
// //       <Divider sx={{ my: 2 }} />

// //       {/* Questions Table */}
// //       <Box>
// //         <Typography variant="h6" sx={{ mb: 2 }}>
// //           Questions
// //         </Typography>
// //         <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
// //           <Table>
// //             <TableHead>
// //               <TableRow>
// //                 <TableCell sx={{ color: 'white' }}>Question</TableCell>
// //                 <TableCell sx={{ color: 'white' }}>LeetCode Link</TableCell>
// //                 <TableCell sx={{ color: 'white' }}>Mark as Important</TableCell>
// //                 <TableCell sx={{ color: 'white' }}>Mark as Done</TableCell>
// //                 <TableCell sx={{ color: 'white' }}>Review</TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {questions.map((question) => (
// //                 <TableRow key={question.id}>
// //                   <TableCell sx={{ color: 'white' }}>{question.title}</TableCell>
// //                   <TableCell>
// //                     {question.leetcodeLink ? (
// //                       <IconButton href={question.leetcodeLink} target="_blank" color="primary">
// //                         <Link />
// //                       </IconButton>
// //                     ) : (
// //                       <Button variant="text" size="small" onClick={() => alert(`Add LeetCode link for ${question.title}`)}>
// //                         Add Link
// //                       </Button>
// //                     )}
// //                   </TableCell>
// //                   <TableCell>
// //                     <IconButton onClick={() => handleToggleImportant(question.id)} color="secondary">
// //                       {question.important ? <Star /> : <StarBorder />}
// //                     </IconButton>
// //                   </TableCell>
// //                   <TableCell>
// //                     <Box
// //                       sx={{
// //                         display: 'flex',
// //                         alignItems: 'center',
// //                         justifyContent: 'center',
// //                         padding: '6px 12px',
// //                         border: '2px solid #2196f3',
// //                         borderRadius: '5px',
// //                         cursor: 'pointer',
// //                         fontWeight: question.done ? 'bold' : 'normal',
// //                         color: question.done ? 'green' : '#2196f3',
// //                         minWidth: '120px',
// //                         transition: 'all 0.3s ease',
// //                         '&:hover': {
// //                           backgroundColor: question.done ? 'green' : '#2196f3',
// //                           color: 'white',
// //                         },
// //                       }}
// //                       onClick={() => handleToggleDone(question.id)}
// //                     >
// //                       {question.done ? <Check sx={{ fontSize: 24 }} /> : <Typography>Mark as Done</Typography>}
// //                     </Box>
// //                   </TableCell>
// //                   <TableCell>
// //                     <IconButton onClick={() => handleToggleReview(question.id)} color="primary">
// //                       {question.review ? <RateReview sx={{ color: 'yellow', fontSize: 24 }} /> : <RateReview sx={{ fontSize: 24 }} />}
// //                     </IconButton>
// //                   </TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       </Box>
// //     </Box>
// //   );
// // }

// // ListDetailPage.tsx
// import { useState } from 'react';
// import { Box, Divider } from '@mui/material';
// import ListDetail from './components/ListDetail';
// //import ProgressChart from './components/ProgressChart';
// import AccessRequests from './components/AccessRequests';
// import QuestionsTable from './components/QuestionsTable';

// interface Question {
//   id: number;
//   title: string;
//   leetcodeLink?: string;
//   important: boolean;
//   done: boolean;
//   review: boolean;
// }

// export default function ListDetailPage() {
//   const [questions, setQuestions] = useState<Question[]>([
//     { id: 1, title: 'Question 1', leetcodeLink: '', important: false, done: false, review: false },
//     { id: 2, title: 'Question 2', leetcodeLink: '', important: true, done: false, review: false },
//     { id: 3, title: 'Question 3', leetcodeLink: '', important: false, done: true, review: false },
//   ]);

//   const [accessRequests, setAccessRequests] = useState(['User1', 'User2', 'User3']);
//   const [usersWithAccess, setUsersWithAccess] = useState(['User4', 'User5']);

//   const progressData = {
//     labels: ['Start', '25%', '50%', '75%', 'Complete'],
//     datasets: [{ label: 'Completion Progress', data: [0, 20, 50, 70, 100], borderColor: 'skyblue', backgroundColor: 'rgba(135, 206, 250, 0.4)' }],
//   };

//   const handleToggleImportant = (id: number) => {
//     setQuestions((prev) => prev.map((question) => question.id === id ? { ...question, important: !question.important } : question));
//   };

//   const handleToggleDone = (id: number) => {
//     setQuestions((prev) => prev.map((question) => question.id === id ? { ...question, done: !question.done } : question));
//   };

//   const handleToggleReview = (id: number) => {
//     setQuestions((prev) => prev.map((question) => question.id === id ? { ...question, review: !question.review } : question));
//   };

//   return (
//     <Box sx={{ padding: 4 }}>
//       <ListDetail title="List Title" description="List Description" />
//       <Divider sx={{ my: 2 }} />
//       <Box display="flex">
//        {/* <ProgressChart data={progressData} /> */}
//         <AccessRequests
//           requests={accessRequests}
//           usersWithAccess={usersWithAccess}
//           onApprove={(user) => setAccessRequests(accessRequests.filter((request) => request !== user))}
//           onReject={(user) => setAccessRequests(accessRequests.filter((request) => request !== user))}
//         />
//       </Box>
//       <Divider sx={{ my: 2 }} />
//       <QuestionsTable
//         questions={questions}
//         onToggleImportant={handleToggleImportant}
//         onToggleDone={handleToggleDone}
//         onToggleReview={handleToggleReview}
//       />
//     </Box>
//   );
// }

import { useState } from 'react';
import { Box, Divider } from '@mui/material';
import ListDetail from './components/ListDetail';
import AccessRequests from './components/AccessRequests';
import QuestionsTable from './components/QuestionsTable';

interface Question {
  id: number;
  title: string;
  leetcodeLink?: string;
  important: boolean;
  done: boolean;
  review: boolean;
}

interface List {
  name: string;
  description: string;
  tags: string[];
}

export default function ListDetailPage() {
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, title: 'Question 1', leetcodeLink: '', important: false, done: false, review: false },
    { id: 2, title: 'Question 2', leetcodeLink: '', important: true, done: false, review: false },
    { id: 3, title: 'Question 3', leetcodeLink: '', important: false, done: true, review: false },
  ]);

  const [accessRequests, setAccessRequests] = useState(['User1', 'User2', 'User3']);
  const [usersWithAccess, setUsersWithAccess] = useState(['User4', 'User5']);

  const progressData = {
    labels: ['Start', '25%', '50%', '75%', 'Complete'],
    datasets: [{ label: 'Completion Progress', data: [0, 20, 50, 70, 100], borderColor: 'skyblue', backgroundColor: 'rgba(135, 206, 250, 0.4)' }],
  };

  const handleToggleImportant = (id: number) => {
    setQuestions((prev) => prev.map((question) => question.id === id ? { ...question, important: !question.important } : question));
  };

  const handleToggleDone = (id: number) => {
    setQuestions((prev) => prev.map((question) => question.id === id ? { ...question, done: !question.done } : question));
  };

  const handleToggleReview = (id: number) => {
    setQuestions((prev) => prev.map((question) => question.id === id ? { ...question, review: !question.review } : question));
  };

  // Sample list data
  const list: List = {
    name: 'My Study List',
    description: 'This is a description of the study list.',
    tags: ['Algorithms', 'Dynamic Programming', 'Greedy'],
  };

  return (
    <Box sx={{ padding: 4 }}>
      <ListDetail list={list} />
      <Divider sx={{ my: 2 }} />
      <Box display="flex">
        <AccessRequests
          requests={accessRequests}
          usersWithAccess={usersWithAccess}
          onApprove={(user) => setAccessRequests(accessRequests.filter((request) => request !== user))}
          onReject={(user) => setAccessRequests(accessRequests.filter((request) => request !== user))}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <QuestionsTable
        questions={questions}
        onToggleImportant={handleToggleImportant}
        onToggleDone={handleToggleDone}
        onToggleReview={handleToggleReview}
      />
    </Box>
  );
}
