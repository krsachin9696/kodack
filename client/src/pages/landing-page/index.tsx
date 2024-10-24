import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleContactUs = () => {
    navigate('/contactus');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-cover bg-center p-6">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-4xl font-bold text-blue-400">KODACK</div>
          <ul className="flex space-x-6">
            <li>
              <a onClick={handleContactUs} className="cursor-pointer hover:text-indigo-400">
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Section */}
      <main className="container mx-auto py-16 px-4 flex-grow text-center">
        <h1 className="text-5xl font-bold mb-6 text-blue-400">Master Your Coding Journey</h1>
        <p className="text-lg mb-8">Simplifying coding practice with curated lists, progress tracking, and seamless sharing.</p>
        <button onClick={handleGetStarted} className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Get Started
        </button>

        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-indigo-400">Our Top Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">🔧 Access master list of essential LeetCode problems</h3>
              {/* <p>Master core concepts of data structures to strengthen your problem-solving skills.</p> */}
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">🛠 Create and customize personal problem lists.</h3>
              {/* <p>Learn dynamic programming techniques with curated problems and solutions.</p> */}
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">👍 Track progress on problem-solving.</h3>
              {/* <p>Understand system design concepts crucial for interviews and scalable systems.</p> */}
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">✨ Share and collaborate on curated lists.</h3>
            </div>
          </div>
        </section>

        {/* New Sign-Up Section */}
        <section className="mt-16 bg-gray-800 p-6 rounded-lg shadow-md relative z-10">
          <h2 className="text-3xl font-bold mb-4">Join a Global Community of Coders</h2>
          <p className="mb-4">People have already signed up across the globe to elevate their coding skills!</p>
          <button onClick={handleGetStarted} className="mt-4 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition">
            Get Started
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-70 text-white py-10 relative z-0">
        <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between px-4">
          {/* Left Section */}
          <div className="flex flex-col items-center mb-4 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl font-bold text-blue-400 mb-2">KODACK</h1>
            <div className="flex space-x-4 mb-4">
              <a href="https://www.linkedin.com/" className="hover:underline">LinkedIn</a>
              <a href="https://github.com/krsachin9696/kodack.git" className="hover:underline">GitHub</a>
              <a href="https://www.youtube.com/" className="hover:underline">YouTube</a>
            </div>
            <p className="text-gray-400 mb-2">Your all-in-one solution for mastering coding challenges.</p>
            <p className="text-gray-400 mb-2">Join us and enhance your skills with curated lists!</p>
            <p className="text-gray-400">&copy; 2024 KODACK. All rights reserved.</p>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-center">
            <div>
              <h3 className="text-blue-400 font-bold mb-4">Quick Access</h3>
              <ul>
                <li><a href="#" className="hover:underline">Master List</a></li>
                <li><a href="#" className="hover:underline">SDE lists</a></li>
                <li><a href="#" className="hover:underline">CS Subjects</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-blue-400 font-bold mb-4">DSA Lists</h3>
              <ul>
                <li><a href="#" className="hover:underline">List 1</a></li>
                <li><a href="#" className="hover:underline">List 2</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-blue-400 font-bold mb-4">Array Lists</h3>
              <ul>
                <li><a href="#" className="hover:underline">Array Series</a></li>
                <li><a href="#" className="hover:underline">Graph Series</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

