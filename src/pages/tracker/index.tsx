import React from 'react';

const Tracker: React.FC = () => {
  return (
    <div className="text-center min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <header className="bg-blue-500 p-6 w-full text-center">
        <h1 className="text-4xl font-bold text-white">Welcome to Smash Badminton</h1>
      </header>
      <main className="p-4 flex flex-col items-center">
        <p className="text-lg text-gray-700 mb-4">
          This is your home page. Feel free to navigate through the application.
        </p>
      </main>
    </div>
  );
};

export default Tracker;
