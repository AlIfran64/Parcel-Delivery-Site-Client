import React, { use } from 'react';
import OurServicesCard from './OurServicesCard';

const OurServicesCards = ({ ourServiceData }) => {
  const data = use(ourServiceData);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch mt-15'>
      {
        data.map((item, index) => <OurServicesCard key={index} item={item}></OurServicesCard>)
      }
    </div>
  );
};

export default OurServicesCards;