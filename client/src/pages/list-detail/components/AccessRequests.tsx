import { Box, Typography, Button } from '@mui/material';

interface AccessRequestsProps {
  requests: string[];
  usersWithAccess: string[];
  onApprove: (user: string) => void;
  onReject: (user: string) => void;
}

export default function AccessRequests({
  requests,
  usersWithAccess,
  onApprove,
  onReject,
}: AccessRequestsProps) {
  return (
    <Box flex={1}>
      <Typography variant="h6" sx={{ mb: 2 }}>Access Requests</Typography>
      
      {requests.length > 0 && (
        <Box>
          <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Pending Requests
          </Typography>
          {requests.map((request, index) => (
            <Box key={index} display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography>{request}</Typography>
              <Box>
                <Button variant="contained" size="small" color="primary" onClick={() => onApprove(request)} sx={{ marginRight: 1 }}>
                  Approve
                </Button>
                <Button variant="contained" size="small" color="secondary" onClick={() => onReject(request)}>
                  Reject
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {usersWithAccess.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" sx={{ color: 'success.main', fontWeight: 'bold' }}>
            Users with Access
          </Typography>
          {usersWithAccess.map((user, index) => (
            <Box key={index} display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography>{user}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
