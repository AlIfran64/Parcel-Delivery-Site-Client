import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import banner1 from '../../../../src/assets/banner/banner1.png';
import banner2 from '../../../../src/assets/banner/banner2.png';
import banner3 from '../../../../src/assets/banner/banner3.png';

const Banner = () => {
  return (
    <div className='w-11/12 mx-auto'>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        interval={3000}
        transitionTime={800}
        swipeable
        emulateTouch
        stopOnHover={false}
      >
        <div>
          <img src={banner1} alt="Banner 1" className="h-[550px] w-full object-cover" />
        </div>
        <div>
          <img src={banner2} alt="Banner 2" className="h-[550px] w-full object-cover" />
        </div>
        <div>
          <img src={banner3} alt="Banner 3" className="h-[550px] w-full object-cover" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
