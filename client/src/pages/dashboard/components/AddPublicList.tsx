// import { alpha, Box, InputBase, styled, Typography, Chip } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import queryKeys from '../../../constants/queryKeys';
// import { useState } from 'react';
// import fetchLists from '../../../services/getLists';
// import apis from '../../../constants/apis';

// interface AddPublicListProps {
//   onClose: () => void;
// }

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));

// const AddPublicList: React.FC<AddPublicListProps> = ({ onClose }) => {
//   const [page, setPage] = useState(1);
//   const limit = 5;

//   // const {
//   //   data,
//   //   isLoading,
//   //   isError,
//   //   fetchNextPage,
//   //   hasNextPage,
//   //   isFetchingNextPage,
//   // } = useInfiniteQuery({
//   //   queryKey: [queryKeys.ADD_PUBLIC_LISTS, page, limit],
//   //   queryFn: () => fetchPublicLists(page, limit),
//   //   getNextPageParam: (lastPage: {
//   //     page: number
//   //     limit: number
//   //     totalTags: number
//   //   }) => {
//   //     if (lastPage.page * lastPage.limit < lastPage.totalTags) {
//   //       return lastPage.page + 1
//   //     }
//   //     return undefined
//   //   },
//   //   initialPageParam: 1,
//   // })

//   const {
//     data,
//     isLoading,
//     isError,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = useInfiniteQuery({
//     queryKey: [queryKeys.ADD_PUBLIC_LISTS, page, limit],
//     queryFn: () => fetchLists(apis.list.getPersonalLists, page, limit),
//     getNextPageParam: (lastPage) => {
//       if (lastPage.page * lastPage.limit < lastPage.totalTags) {
//         return lastPage.page + 1;
//       }
//       return undefined;
//     },
//     initialPageParam: 1,
//   });  

//   const lists = data?.pages.flatMap(page => page.lists) || [];

//   const handleScroll = (event: React.UIEvent<HTMLElement>) => {
//     const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
//     if (scrollTop + clientHeight >= scrollHeight - 5 && hasNextPage) {
//       fetchNextPage();
//     }
//   };

//   return (
//     <Box width="100%" height="100%" minHeight={300} onScroll={handleScroll} overflow="auto">
//       <Box
//         width="100%"
//         padding={2}
//         display="flex"
//         flexDirection="column"
//         justifyContent="space-between"
//         gap={2}
//       >
//         <Search>
//           <SearchIconWrapper>
//             <SearchIcon />
//           </SearchIconWrapper>
//           <StyledInputBase
//             placeholder="Search List…"
//             inputProps={{ 'aria-label': 'search' }}
//           />
//         </Search>

//         <Box padding={1} display="flex" flexDirection="column" gap={1}>
//           {isLoading && <Typography>Loading...</Typography>}
//           {isError && <Typography>Error loading lists.</Typography>}
//           {lists.map((list, index) => (
//             <Box
//               key={index}
//               width="100%"
//               padding={1}
//               borderLeft={4}
//               borderColor="skyblue"
//               borderRadius={2}
//               display="flex"
//               flexDirection="column"
//               sx={{
//                 backgroundColor: 'rgba(255, 255, 255, 0.02)',
//                 '&:hover': {
//                   backgroundColor: 'rgba(255, 255, 255, 0.06)',
//                 },
//               }}
//             >
//               <Box display="flex" justifyContent="space-between" paddingBottom={1}>
//                 <Typography sx={{ fontFamily: 'sans-serif', fontWeight: '600' }}>
//                   {list.name}
//                 </Typography>
//                 {/* <Chip
//                   label={list.access ? 'granted' : 'pending'}
//                   color={list.access ? 'warning' : 'primary'}
//                   variant="outlined"
//                   size="small"
//                 /> */}
//               </Box>
//               <Box display="flex" justifyContent="flex-start" gap={1}>
//                 {list.tags.map((tag, tagIndex) => (
//                   <Chip
//                     key={tagIndex}
//                     label={tag}
//                     size="small"
//                     sx={{
//                       backgroundColor: 'rgba(255, 255, 255, 0.04)',
//                       color: 'white',
//                     }}
//                   />
//                 ))}
//               </Box>
//             </Box>
//           ))}
//           {isFetchingNextPage && <Typography>Loading more...</Typography>}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AddPublicList;

