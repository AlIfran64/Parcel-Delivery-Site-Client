import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Components/Header/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Root = () => {

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className='min-h-screen mt-18 md:mt-20 lg:mt-22'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;