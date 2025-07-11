import React from 'react';

const Loading = () => {
  return (
    <div className='w-11/12 h-screen mx-auto flex justify-center items-center bg-white py-3 rounded-2xl'>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default Loading;