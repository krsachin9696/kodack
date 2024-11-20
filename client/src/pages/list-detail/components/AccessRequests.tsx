import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Select,
  MenuItem,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import queryKeys from '../../../constants/queryKeys';
import getAccessRequests from '../services/getAccessRequests';
import grantAccess from '../services/grantAccess';

export default function AccessRequests() {
  const { id } = useParams<{ id: string }>();
  const listID = id || '';
  const queryClient = useQueryClient();

  const [pendingPage, setPendingPage] = useState(1);
  const [approvedPage, setApprovedPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // Fetch access requests
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.GET_ACCESS_REQUESTS, listID],
    queryFn: () => getAccessRequests(listID),
    staleTime: 0,
  });

  const requests = data?.data?.pendingRequests || [];
  const usersWithAccess = data?.data?.approved || [];

  // Mutation for granting or rejecting access
  const { mutate: mutateGrantAccess } = useMutation({
    mutationFn: ({ userID, status }: { userID: string; status: 'APPROVED' | 'REJECTED' }) =>
      grantAccess({ userID, listID, status }),
    onSuccess: (response) => {
      const { userID, status } = response.data;

      queryClient.setQueryData([queryKeys.GET_ACCESS_REQUESTS, listID], (oldData: any) => {
        if (!oldData) return oldData;

        const updatedPendingRequests = oldData.data.pendingRequests.filter(
          (req: any) => req.userId !== userID
        );

        const request = requests.find((request) => request.userId === userID);
        const userName = request?.userName;

        const updatedApproved =
          status === 'APPROVED'
            ? [...oldData.data.approved, { "userId": userID, userName }]
            : oldData.data.approved;
            
        return {
          ...oldData,
          data: {
            ...oldData.data,
            pendingRequests: updatedPendingRequests,
            approved: updatedApproved,
          },
        }; 
      });

      toast.success(`Request ${status.toLowerCase()} successfully.`);
    },
    onError: () => toast.error('Error processing the request.'),
  });

  // Mutation for removing access
  const { mutate: mutateRemoveAccess } = useMutation({
    mutationFn: (userId: string) => grantAccess({ userID: userId, listID, status: 'REJECTED' }),
    onSuccess: (response) => {
      const { userID } = response.data;

      queryClient.setQueryData([queryKeys.GET_ACCESS_REQUESTS, listID], (oldData: any) => {
        if (!oldData) return oldData;

        const updatedApproved = oldData.data.approved.filter((req: any) => req.userId !== userID);

        return {
          ...oldData,
          data: {
            ...oldData.data,
            approved: updatedApproved,
          },
        };
      });

      toast.success('Access removed successfully.');
    },
    onError: () => toast.error('Error removing access.'),
  });

  // Pagination
  const paginatedPending = requests.slice((pendingPage - 1) * limit, pendingPage * limit);
  const paginatedApproved = usersWithAccess.slice((approvedPage - 1) * limit, approvedPage * limit);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">Error fetching access requests.</Typography>;

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        padding: 4,
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '35%',
        margin: 'auto',
        marginRight: 0,
        marginLeft: 'auto',
        display: 'block',
      }}
    >
      <Typography variant="h6" mb={2} color="white">
        Pending Requests
      </Typography>
      <Box mb={4}>
        {paginatedPending.length > 0 ? (
          <TableContainer
            component={Box}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>User Name</TableCell>
                  <TableCell sx={{ color: 'white' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedPending.map((request) => (
                  <TableRow key={request.userId}>
                    <TableCell sx={{ color: 'white' }}>{request.userName}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() =>
                          mutateGrantAccess({ userID: request.userId, status: 'APPROVED' })
                        }
                        sx={{ marginRight: 1 }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() =>
                          mutateGrantAccess({ userID: request.userId, status: 'REJECTED' })
                        }
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography sx={{ color: 'white' }}>No pending requests.</Typography>
        )}
        <Box mt={2} display="flex" justifyContent="flex-end" alignItems="center">
          <Pagination
            count={Math.ceil(requests.length / 5)}
            page={pendingPage}
            onChange={(e, page) => setPendingPage(page)}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'white',
              },
            }}
          />
        </Box>
      </Box>
  
      <Typography variant="h6" mb={2} color="white">
        Users with Access
      </Typography>
      <Box>
        {paginatedApproved.length > 0 ? (
          <TableContainer
            component={Box}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>User Name</TableCell>
                  <TableCell sx={{ color: 'white' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedApproved.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell sx={{ color: 'white' }}>{user.userName}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() => mutateRemoveAccess(user.userId)}
                      >
                        Remove Access
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography sx={{ color: 'white' }}>No users with access.</Typography>
        )}
        <Box mt={2} display="flex" justifyContent="flex-end" alignItems="center">
          <Pagination
            count={Math.ceil(usersWithAccess.length / 5)}
            page={approvedPage}
            onChange={(e, page) => setApprovedPage(page)}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'white',
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}  