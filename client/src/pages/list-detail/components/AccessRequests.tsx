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
  Pagination
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
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
  const limit = 2;

  // Fetch access requests
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.GET_ACCESS_REQUESTS, listID],
    queryFn: () => getAccessRequests(listID),
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  const requests = data?.data?.pendingRequests || [];
  const usersWithAccess = data?.data?.approved || [];

  // Mutation for granting or rejecting access
  const { mutate: mutateGrantAccess } = useMutation({
    mutationFn: ({ userID, status }: { userID: string; status: 'APPROVED' | 'REJECTED' }) =>
      grantAccess({ userID, listID, status }),
    mutationKey: [queryKeys.GRANT_ACCESS],
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
    mutationKey: [queryKeys.REMOVE_ACCESS],
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
  
  useEffect(() => {
    if (requests.length>0){
    const lastValidPage = Math.ceil(requests.length / 2);
    if (pendingPage > lastValidPage  ) {
      setPendingPage(lastValidPage); // Reset to the last valid page
    }
  }
  }, [requests.length, pendingPage]);

  useEffect(() => {
    if (usersWithAccess.length>0){
    const lastValidPage = Math.ceil(usersWithAccess.length / 2);
    if (approvedPage > lastValidPage  ) {
      setApprovedPage(lastValidPage); // Reset to the last valid page
    }
  }
  }, [usersWithAccess.length, approvedPage]);
  

  // Pagination
  const paginatedPending = requests.slice((pendingPage - 1) * limit, pendingPage * limit);
  const paginatedApproved = usersWithAccess.slice((approvedPage - 1) * limit, approvedPage * limit);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">Error fetching access requests.</Typography>;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // Stack on smaller screens
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Align items at the top
        gap: 3, // Space between the sections
        padding: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        margin: 'auto',
        width: '90%',
        maxWidth: '1200px',
      }}
    >
      {/* Pending Requests Section */}
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          padding: 3,
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          flex: 1,
        }}
      >
        <Typography variant="h6" mb={2} color="white" textAlign="center">
          Pending Requests
        </Typography>
        <Box>
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
                    <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                      User Name
                    </TableCell>
                    <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedPending.map((request) => (
                    <TableRow key={request.userId}>
                      <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                        {request.userName}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() =>
                            mutateGrantAccess({
                              userID: request.userId,
                              status: 'APPROVED',
                            })
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
                            mutateGrantAccess({
                              userID: request.userId,
                              status: 'REJECTED',
                            })
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
            <Typography sx={{ color: 'white', textAlign: 'center' }}>
              No pending requests.
            </Typography>
          )}
          <Box mt={2} display="flex" justifyContent="center" alignItems="center">
            {requests.length > 2 && (
              <Pagination
                count={Math.ceil(requests.length / 2)}
                page={pendingPage}
                onChange={(_, page) => setPendingPage(page)}
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: 'white',
                  },
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
  
      {/* Users with Access Section */}
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          padding: 3,
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          flex: 1,
        }}
      >
        <Typography variant="h6" mb={2} color="white" textAlign="center">
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
                    <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                      User Name
                    </TableCell>
                    <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedApproved.map((user) => (
                    <TableRow key={user.userId}>
                      <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                        {user.userName}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
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
            <Typography sx={{ color: 'white', textAlign: 'center' }}>
              No users with access.
            </Typography>
          )}
          <Box mt={2} display="flex" justifyContent="center" alignItems="center">
            {usersWithAccess.length > 2 && (
              <Pagination
                count={Math.ceil(usersWithAccess.length / 2)}
                page={approvedPage}
                onChange={(_, page) => setApprovedPage(page)}
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: 'white',
                  },
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
