// import { Box, Typography } from '@mui/material';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';
// import { useRef, useEffect } from 'react';

// interface ProgressChartProps {
//   data: ChartData<'line'>;
//   options?: ChartOptions<'line'>;
// }

// export default function ProgressChart({ data, options }: ProgressChartProps) {
//   const chartRef = useRef<ChartJS<'line'> | null>(null);

//   const handleChartReady = (chart: ChartJS<'line'>) => {
//     // Save the chart instance to the ref
//     chartRef.current = chart;
//   };

//   const handleChartUpdate = () => {
//     // Optional: Perform actions when the chart is updated
//   };

//   useEffect(() => {
//     // Cleanup function to destroy the chart instance when the component unmounts
//     return () => {
//       if (chartRef.current) {
//         chartRef.current.destroy();
//         chartRef.current = null;
//       }
//     };
//   }, []);

//   return (
//     <Box flex={1}>
//       <Typography variant="h6">Progress</Typography>
//       <Line
//         data={data}
//         options={{
//           responsive: true,
//           plugins: {
//             legend: {
//               position: 'top',
//             },
//           },
//           ...options,
//         }}
//         onReady={handleChartReady} // Set the chart instance when ready
//         onUpdate={handleChartUpdate} // Optionally, handle updates
//       />
//     </Box>
//   );
// }
