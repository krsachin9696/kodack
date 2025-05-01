import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts';
import { SolvedData } from './LeetcodeInfo';

const ProblemSolvedChart = ({ solved }: { solved: SolvedData }) => {
  const [dimensions, setDimensions] = useState({ cx: '60%', cy: '50%' });

  const chartData = [
    { label: 'Easy', value: solved.easySolved },
    { label: 'Medium', value: solved.mediumSolved },
    { label: 'Hard', value: solved.hardSolved },
  ];

  const pieParams = {
    height: 220,
    slotProps: { legend: { hidden: true } },
  };

  // Function to handle resizing and setting cx and cy dynamically
  const handleResize = () => {
    if (window.innerWidth <= 600) {
      setDimensions({ cx: '60%', cy: '50%' }); // Center on small screens
    } else if (window.innerWidth <= 1024) {
      setDimensions({ cx: '65%', cy: '50%' }); // Adjust for medium screens
    } else {
      setDimensions({ cx: '75%', cy: '50%' }); // Default for large screens
    }
  };

  useEffect(() => {
    handleResize(); // Set initial dimensions based on screen size
    window.addEventListener('resize', handleResize); // Listen for resize events

    return () => window.removeEventListener('resize', handleResize); // Cleanup event listener
  }, []);

  return (
    <Box width="100%" height="100%" sx={{ display: 'flex' }}>
      <PieChart
        series={[
          {
            data: chartData,
            paddingAngle: 2,
            cornerRadius: 5,
            startAngle: -121,
            endAngle: 123,
            innerRadius: '60%',
            outerRadius: '90%',
            cx: dimensions.cx,
            cy: dimensions.cy,
          },
        ]}
        {...pieParams}
      />
    </Box>
  );
};

export default ProblemSolvedChart;
