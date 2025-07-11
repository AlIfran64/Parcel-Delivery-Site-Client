import React from 'react';
import authImage from '../../../src/assets/images/authImage.png';

const AuthSideImage = () => {
  return (
    <div className='bg-[#FAFDF0] w-full h-full flex justify-center items-center'>
      <div>
        <img src={authImage} alt="image" />
      </div>
    </div>
  );
};

export default AuthSideImage;