import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Components/Header/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;