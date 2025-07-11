import React from 'react';
import { Link } from 'react-router';
import { FaBan } from 'react-icons/fa';

const Forbidden = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-10 text-center max-w-md">
        <FaBan className="text-red-500 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">403 - Forbidden</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
