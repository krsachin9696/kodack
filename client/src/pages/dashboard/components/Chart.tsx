import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts';

const problemData = {
  easySolved: 276,
  mediumSolved: 439,
  hardSolved: 88,
};

const chartData = [
  { label: 'Easy', value: problemData.easySolved },
  { label: 'Medium', value: problemData.mediumSolved },
  { label: 'Hard', value: problemData.hardSolved },
];

const pieParams = {
  height: 250,
  slotProps: { legend: { hidden: true } },
};

export default function ProblemSolvedChart() {
  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        display: 'flex',
        // alignItems: 'center', // Centers vertically
        // justifyContent: 'center', // Centers horizontally
        // position: 'relative', // Position relative for child positioning if needed
      }}
    >
      <PieChart
        series={[
          {
            data: chartData,
            // innerRadius: 30,
            // outerRadius: 50,
            paddingAngle: 2,
            cornerRadius: 5,
            startAngle: -121,
            endAngle: 123,
            // cx: 70, 
            // cy: 80, 
            innerRadius: '60%', // Responsive inner radius
            outerRadius: '90%', // Responsive outer radius
            cx: '60%', // Centered
            cy: '50%', // Centered
          },
        ]}
        {...pieParams}
      />
    </Box>
  );
}
