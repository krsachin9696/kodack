interface ListItemProps {
  listID: string;
  name: string;
  tags: string[];
  status?: string;
  isPublic?: boolean;
  owner?: string;
}

enum AccessStatus {
  PENDING,
  APPROVED,
  REJECTED
}

interface GetListResponseProps {
  lists: ListItemProps[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}