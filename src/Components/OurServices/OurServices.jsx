import React, { Suspense } from 'react';
import OurServicesCards from './OurServicesCards';
import Loading from '../../Pages/Loading/Loading';

const OurServices = () => {

  const ourServiceData = fetch('../../../src/data/services.json').then((res) => res.json())

  return (
    <div data-aos="fade-in" className='w-11/12 mx-auto bg-[#03373D] p-15 rounded-4xl'>
      <h1 className='text-4xl font-extrabold text-center text-white mb-4'>Our Services</h1>
      <p className='text-[#DADADA] text-center'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.</p>

      <Suspense fallback={<Loading></Loading>}>
        <OurServicesCards ourServiceData={ourServiceData}></OurServicesCards>
      </Suspense>
    </div>
  );
};

export default OurServices;