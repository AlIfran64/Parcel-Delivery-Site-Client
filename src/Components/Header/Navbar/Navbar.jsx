import React from 'react';
import { NavLink } from 'react-router';
import logo from '../../../../src/assets/images/logo.png'

const Navbar = () => {
  const links = <>
    <NavLink to={'/'} className={({ isActive }) => isActive ? "mx-3 bg-[#CAEB66] hover:bg-[#5B6A2E] py-1 px-4 rounded-3xl font-semibold" : "py-1 px-4"}>Home</NavLink>
    <NavLink to={'/services'} className={({ isActive }) => isActive ? "mx-3 bg-[#CAEB66] hover:bg-[#5B6A2E] py-1 px-4 rounded-3xl font-semibold" : "py-1 px-4"}>Services</NavLink>
    <NavLink to={'/coverage'} className={({ isActive }) => isActive ? "mx-3 bg-[#CAEB66] hover:bg-[#5B6A2E] py-1 px-4 rounded-3xl font-semibold" : "py-1 px-4"}>Coverage</NavLink>
    <NavLink to={'/beARider'} className={({ isActive }) => isActive ? "mx-3 bg-[#CAEB66] hover:bg-[#5B6A2E] py-1 px-4 rounded-3xl font-semibold" : "py-1 px-4"}>Be a rider</NavLink>
    <NavLink to={'/aboutUs'} className={({ isActive }) => isActive ? "mx-3 bg-[#CAEB66] hover:bg-[#5B6A2E] py-1 px-4 rounded-3xl font-semibold" : "py-1 px-4"}>About us</NavLink>
  </>
  return (
    <div className='p-6'>
      <div className="navbar bg-base-100 shadow-sm py-3 rounded-2xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>

          {/* LOGO */}
          <div className="ml-4 flex justify-start items-center gap-2 w-full">
            <img className="h-9 lg:h-10" src={logo} alt="logo" />
            <h1 className="-ml-5 -mb-5 text-xl lg:text-3xl font-extrabold">Profast</h1>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end space-x-4 mr-4">
          <button className="py-2 px-4 border-2 border-[#DADADA] rounded-xl font-semibold hover:bg-[#606060] hover:text-white">Sign in</button>
          <button className="py-2 px-4 border-2 border-[#CAEB66] bg-[#CAEB66] rounded-xl font-semibold hover:bg-[#1F1F1F] hover:text-white">Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;