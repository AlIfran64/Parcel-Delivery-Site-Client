import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../../src/assets/images/logo.png'

const Footer = () => {
  return (
    <div className='w-11/12 mx-auto py-6'>
      <footer className="footer footer-horizontal footer-center bg-[#0B0B0B] text-[#DADADA] p-10 rounded-4xl flex flex-col items-center space-y-6">

        {/* LOGO */}
        <div className="flex justify-center items-center gap-2 w-full max-w-xs mx-auto">
          <img className="h-9 lg:h-10" src={logo} alt="logo" />
          <h1 className="-ml-5 -mb-5 text-xl lg:text-3xl font-extrabold whitespace-nowrap text-white">Profast</h1>
        </div>
        <div>
          <p className='text-center -mt-10'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.</p>
        </div>

        {/* NAV LINKS */}
        <nav className="flex flex-wrap justify-center gap-4 max-w-full overflow-x-auto -mt-5">
          <NavLink to={'/'} className={({ isActive }) => isActive ? "mx-3 bg-[#CAEB66] hover:bg-[#5B6A2E] py-1 px-4 rounded-3xl font-semibold text-black" : "py-1 px-4"}>Home</NavLink>
          <NavLink to={'/services'} className={({ isActive }) => isActive ? "mx-3 bg-[#CAEB66] hover:bg-[#5B6A2E] py-1 px-4 rounded-3xl font-semibold text-black" : "py-1 px-4"}>Services</NavLink>
          <NavLink to={'/coverage'} className={({ isActive }) => isActive ? "mx-3 bg-[#CAEB66] hover:bg-[#5B6A2E] py-1 px-4 rounded-3xl font-semibold text-black" : "py-1 px-4"}>Coverage</NavLink>
          <NavLink to={'/beARider'} className={({ isActive }) => isActive ? "mx-3 bg-[#CAEB66] hover:bg-[#5B6A2E] py-1 px-4 rounded-3xl font-semibold text-black" : "py-1 px-4"}>Be a rider</NavLink>
          <NavLink to={'/aboutUs'} className={({ isActive }) => isActive ? "mx-3 bg-[#CAEB66] hover:bg-[#5B6A2E] py-1 px-4 rounded-3xl font-semibold text-black" : "py-1 px-4"}>About us</NavLink>
        </nav>

        {/* SOCIAL ICONS */}
        <nav className='-mt-5'>
          <div className="grid grid-flow-col gap-4 justify-center">
            <Link to={'https://twitter.com'} target='_blank' aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </Link>
            <Link to={'https://www.youtube.com'} target='_blank' aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </Link>
            <Link to={"https://www.facebook.com"} target='_blank' aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </Link>
          </div>
        </nav>

        {/* COPYRIGHT */}
        <aside className='-mt-5'>
          <p className="text-center text-sm">Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
        </aside>

      </footer>
    </div>
  );
};

export default Footer;
