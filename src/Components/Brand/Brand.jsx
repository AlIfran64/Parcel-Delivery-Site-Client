import React from 'react';
import Marquee from 'react-fast-marquee';
import casio from '../../../src/assets/brands/casio.png';
import amazon from '../../../src/assets/brands/amazon.png';
import moonstar from '../../../src/assets/brands/moonstar.png';
import start from '../../../src/assets/brands/start.png';
import startPeople from '../../../src/assets/brands/start-people 1.png';
import ranstad from '../../../src/assets/brands/randstad.png';

const Brand = () => {
  const brandLogos = [casio, amazon, moonstar, start, startPeople, ranstad];

  return (
    <div className="w-11/12 mx-auto my-20">
      <h1 className="text-[#03373D] text-center font-extrabold text-3xl mb-15">
        We've helped thousands of sales teams
      </h1>

      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover={true}
        className="flex items-center gap-10"
      >
        {brandLogos.map((logo, index) => (
          <div key={index} className="mx-6 w-28 md:w-36 lg:w-40">
            <img
              src={logo}
              alt={`brand-logo-${index}`}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Brand;
