import React from 'react';
import merchent1 from '../../../src/assets/images/be-a-merchant-bg.png';
import merchant2 from '../../../src/assets/images/location-merchant.png';

const Satisfaction = () => {
  return (
    <div
      data-aos="zoom-in"
      className="w-11/12 mx-auto my-20 bg-[#03373D] p-10 sm:p-16 md:p-20 rounded-4xl"
      style={{
        backgroundImage: `url(${merchent1}), url(${merchant2})`,
        backgroundPosition: 'top center, right center',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundSize: 'auto, contain',
      }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
        Merchant and Customer Satisfaction <br /> is Our First Priority
      </h1>
      <p className="text-[#DADADA] mt-4 text-sm sm:text-base leading-relaxed max-w-3xl">
        We offer the lowest delivery charge with the highest value along with <br /> 100% safety of your product. Pathao courier delivers your parcels in every <br /> corner of Bangladesh right on time.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mt-8 max-w-xs sm:max-w-none">
        <button className="bg-[#CAEB66] py-2 px-6 rounded-full font-semibold cursor-pointer border-2 border-[#CAEB66] w-full sm:w-auto text-center transition-all duration-300 hover:bg-[#b3d954]">
          Become a Merchant
        </button>
        <button className="cursor-pointer border-2 border-[#CAEB66] rounded-full py-2 px-6 text-[#CAEB66] w-full sm:w-auto text-center transition-all duration-300 hover:bg-[#CAEB66] hover:text-[#03373D]">
          Earn with Profast Courier
        </button>
      </div>
    </div>
  );
};

export default Satisfaction;
