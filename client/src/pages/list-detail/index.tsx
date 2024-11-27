import { useParams } from 'react-router-dom';
import { Box, Skeleton, Typography } from '@mui/material';
import ListDetail from './components/ListDetail';
import AccessRequests from './components/AccessRequests';
import QuestionsTable from './components/QuestionsTable';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '../../constants/queryKeys';
import getListDetail from './services/getListDetail';

export interface Question {
  questionId: string;
  title: string;
  leetcodeLink: string;
  important: boolean;
  done: boolean;
  review: boolean;
};

const ListDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const listID = id || '';

  // Use query to fetch the list details
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.LIST_DETAILS, listID],
    queryFn: () => getListDetail(listID),
  });

  // Handle loading and error states
  if (isLoading || isError) {
    return (
      <Box padding={3}>
        <Skeleton variant="text" width="60%" height={40} />
        <Skeleton variant="rectangular" width="100%" height={120} sx={{ marginTop: 2 }} />
        <Skeleton variant="text" width="50%" height={20} sx={{ marginTop: 2 }} />
        <Skeleton variant="rounded" width="20%" height={40} sx={{ marginTop: 2 }} />
      </Box>
    );
  }

  const listDetailData = data?.data;
  const access = listDetailData?.accessStatus;

  if (!listDetailData) {
    return (
      <Box padding={3}>
        <Typography variant="h6" color="error">
          Unable to load list details.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <ListDetail listDetailData={listDetailData} />

      {listDetailData.isOwner && <AccessRequests />}

      {
        (listDetailData.isOwner || access === 'APPROVED')
          ? <QuestionsTable isOwner={listDetailData.isOwner} />
          : <Typography>You do not have access to this list. SORRY !!</Typography>
      }
    </Box>
  );
};

export default ListDetailPage;
