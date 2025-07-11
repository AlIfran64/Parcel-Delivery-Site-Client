import React from 'react';
import { Link, Outlet } from 'react-router';
import AuthSideImage from '../../Components/AuthSideImage/AuthSideImage';
import logo from '../../../src/assets/images/logo.png';

const Authentication = () => {
  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row">

      {/* Left Content - Form & Logo */}
      <div className="w-full md:w-1/2 bg-white">
        {/* Logo */}
        <div className="p-5">
          <Link to={'/'}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="ml-4 flex justify-start items-center gap-2 w-full cursor-pointer"
            >
              <img className="h-9 lg:h-10" src={logo} alt="logo" />
              <h1 className="-ml-5 -mb-5 text-xl lg:text-3xl font-extrabold">Profast</h1>
            </button>
          </Link>
        </div>

        {/* Outlet */}
        <div className="max-w-md w-full mx-auto mt-5 px-4 sm:px-6">
          <Outlet />
        </div>
      </div>

      {/* Right Content - Image */}
      <div className="w-full md:w-1/2 h-64 md:h-auto">
        <AuthSideImage />
      </div>
    </div>
  );
};

export default Authentication;
