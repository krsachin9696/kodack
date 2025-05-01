import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex px-[10%]">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 text-white flex-col p-10 bg-[url('/bgsvg.svg')] bg-no-repeat bg-contain bg-center">
        <Link
          to="/"
          className="font-oswald font-bold text-6xl mb-10 text-blue-400 p-10 hover:underline"
        >
          KODACK
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-1/2 justify-center items-center flex-col">
        <Typography variant="h3" className="text-white font-bold">
          Route not found !!
        </Typography>

        <Link to="/" className="mt-6 text-blue-400 hover:underline text-lg">
          Return to homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
