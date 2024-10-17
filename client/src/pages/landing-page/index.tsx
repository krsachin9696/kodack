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
          <h2 className="text-3xl font-bold mb-8 text-indigo-400">Essential Coding Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Data Structures</h3>
              <p>Master core concepts of data structures to strengthen your problem-solving skills.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Dynamic Programming</h3>
              <p>Learn dynamic programming techniques with curated problems and solutions.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">System Design</h3>
              <p>Understand system design concepts crucial for interviews and scalable systems.</p>
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
              <a href="#" className="hover:underline">LinkedIn</a>
              <a href="#" className="hover:underline">GitHub</a>
              <a href="#" className="hover:underline">YouTube</a>
            </div>
            <p className="text-gray-400 mb-2">Your all-in-one solution for mastering coding challenges.</p>
            <p className="text-gray-400 mb-2">Join us and enhance your skills with curated lists!</p>
            <p className="text-gray-400">&copy; 2024 KODACK. All rights reserved.</p>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-blue-400 font-bold mb-4">Quick Access</h3>
              <ul>
                <li><a href="#" className="hover:underline">Striver's DSA Sheet</a></li>
                <li><a href="#" className="hover:underline">Striver's DSA Playlist</a></li>
                <li><a href="#" className="hover:underline">CS Subjects</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-blue-400 font-bold mb-4">DSA Sheets</h3>
              <ul>
                <li><a href="#" className="hover:underline">Striver's SDE Sheet</a></li>
                <li><a href="#" className="hover:underline">Striver's A2Z DSA Playlist</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-blue-400 font-bold mb-4">DSA Playlist</h3>
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

