import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts';
import { SolvedData } from './LeetcodeInfo';

// Accepting solved data as props
const ProblemSolvedChart = ({ solved }: { solved: SolvedData}) => {
  const chartData = [
    { label: 'Easy', value: solved.easySolved },
    { label: 'Medium', value: solved.mediumSolved },
    { label: 'Hard', value: solved.hardSolved },
  ];

  const pieParams = {
    height: 250,
    slotProps: { legend: { hidden: true } },
  };

  return (
      <Box width="100%" height="100%" sx={{ display: 'flex',  }}>
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
              cx: '60%',
              cy: '50%',
            },
          ]}
          {...pieParams}
        />
      </Box>
  );
};

export default ProblemSolvedChart;
