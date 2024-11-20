enum AccessStatus {
  PENDING,
  APPROVED,
  REJECTED
}

interface ListItemProps {
  listID: string;
  name: string;
  tags: string[];
  accessStatus: AccessStatus | null;
  isPublic?: boolean;
  owner?: string;
}

interface GetListResponseProps {
  lists: ListItemProps[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}