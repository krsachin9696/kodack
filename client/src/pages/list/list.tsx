import React, { useState } from 'react';
// import { FaYoutube, FaRegFileAlt, FaCog } from 'react-icons/fa';

// Define type for each row of the table
interface TableRow {
  problem: string;
//   article: JSX.Element;
//   youtube: JSX.Element;
//   practice: JSX.Element;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  revision: boolean;
  status: boolean;
}

const CourseTable: React.FC = () => {
  // Initial table data
  const initialData: TableRow[] = [
    {
      problem: 'User Input / Output',
    //   article: <FaRegFileAlt />,
    //   youtube: <FaYoutube />,
    //   practice: <FaCog />,
      difficulty: 'Easy',
      revision: false,
      status: false,
    },
    {
      problem: 'Data Types',
    //   article: <FaRegFileAlt />,
    //   youtube: <FaYoutube />,
    //   practice: <FaCog />,
      difficulty: 'Easy',
      revision: false,
      status: false,
    },
    {
      problem: 'If Else Statements',
    //   article: <FaRegFileAlt />,
    //   youtube: <FaYoutube />,
    //   practice: <FaCog />,
      difficulty: 'Easy',
      revision: false,
      status: false,
    },
    // Add more rows if needed
  ];

  // State to manage table data and filter difficulty
  const [tableData, setTableData] = useState<TableRow[]>(initialData);
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');

  // Handle status change
  const toggleStatus = (index: number) => {
    const newData = [...tableData];
    newData[index].status = !newData[index].status;
    setTableData(newData);
  };

  // Handle revision toggle
  const toggleRevision = (index: number) => {
    const newData = [...tableData];
    newData[index].revision = !newData[index].revision;
    setTableData(newData);
  };

  // Filter by difficulty
  const filterByDifficulty = (difficulty: 'All' | 'Easy' | 'Medium' | 'Hard') => {
    setDifficultyFilter(difficulty);
  };

  // Filter data based on difficulty
  const filteredData =
    difficultyFilter === 'All'
      ? tableData
      : tableData.filter((row) => row.difficulty === difficultyFilter);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Step 1: Learn the basics</h1>

      {/* Difficulty Filter */}
      <div className="mb-4">
        <label className="mr-2 text-lg">Filter by difficulty:</label>
        <select
          value={difficultyFilter}
          onChange={(e) => filterByDifficulty(e.target.value as 'All' | 'Easy' | 'Medium' | 'Hard')}
          className="border border-gray-600 rounded p-2 text-black bg-white"
        >
          <option value="All">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Course Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-3">Status</th>
              <th className="p-3">Problem</th>
              <th className="p-3">Article</th>
              <th className="p-3">YouTube</th>
              <th className="p-3">Practice</th>
              <th className="p-3">Difficulty</th>
              <th className="p-3">Revision</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index} className="border-b border-gray-600 hover:bg-gray-700">
                <td className="p-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-green-500"
                    checked={row.status}
                    onChange={() => toggleStatus(index)}
                  />
                </td>
                <td className="p-3">{row.problem}</td>
                {/* <td className="p-3">{row.article}</td>
                <td className="p-3">{row.youtube}</td>
                <td className="p-3">{row.practice}</td> */}
                <td className="p-3">{row.difficulty}</td>
                <td className="p-3 cursor-pointer" onClick={() => toggleRevision(index)}>
                  {row.revision ? '⭐' : '☆'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseTable;
