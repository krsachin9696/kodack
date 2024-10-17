import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-cover bg-center p-6">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-4xl font-bold text-blue-400">KODACK</div>
          <ul className="flex space-x-6 text-white">
            <li><a href="#" className="hover:text-indigo-400">Home</a></li>
            <li><a href="#" className="hover:text-indigo-400">Courses</a></li>
            <li><a href="#" className="hover:text-indigo-400">About</a></li>
            <li><a href="#" className="hover:text-indigo-400">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Section */}
      <main className="container mx-auto py-16 px-4 flex-grow text-center text-white">
        <h1 className="text-5xl font-bold mb-6">Welcome to KODACK</h1>
        <p className="text-lg mb-8">Learn coding with the best tutorials available, and enhance your skills with real-world projects.</p>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Get Started
        </button>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Data Structures</h3>
              <p>Master the core concepts of data structures to strengthen your problem-solving skills.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Dynamic Programming</h3>
              <p>Learn and apply dynamic programming techniques with curated problems and solutions.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">System Design</h3>
              <p>Understand system design concepts crucial for interview preparation and building scalable systems.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center text-white">
        <p>&copy; 2024 KODACK. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
