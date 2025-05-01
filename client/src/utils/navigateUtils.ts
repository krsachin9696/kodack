import { useNavigate } from 'react-router-dom';

export const useNavigateToListDetail = () => {
  const navigate = useNavigate();

  return (listID: string) => {
    navigate(`/list/${listID}`);
  };
};
