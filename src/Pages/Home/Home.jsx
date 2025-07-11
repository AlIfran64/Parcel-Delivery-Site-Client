import React from 'react';
import Banner from '../../Components/Header/Banner/Banner';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import OurServices from '../../Components/OurServices/OurServices';
import Brand from '../../Components/Brand/Brand';
import Features from '../../Components/Features/Features';
import Satisfaction from '../../Components/Satisfaction/Satisfaction';
import Testimonials from '../../Components/Testimonials/Testimonials';
import Faq from '../../Components/Faq/Faq';

const Home = () => {
  return (
    <div>

      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <OurServices></OurServices>
      <Brand></Brand>

      <div className="w-11/12 mx-auto divider"></div>

      <Features></Features>

      <div className="w-11/12 mx-auto divider"></div>

      <Satisfaction></Satisfaction>

      <Testimonials></Testimonials>

      <Faq></Faq>
    </div>

  );
};

export default Home;