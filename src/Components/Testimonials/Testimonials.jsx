import React, { useState } from 'react';
import customer from '../../../src/assets/images/customer-top.png';
import review from '../../../src/assets/images/reviewQuote.png';

const testimonialsData = [
  {
    id: 1,
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine.",
    name: "Awlad Hossain",
    role: "Senior Product Designer"
  },
  {
    id: 2,
    text: "Posture Pro helped me reduce my back pain significantly within a few weeks.",
    name: "Sarah Johnson",
    role: "Yoga Instructor"
  },
  {
    id: 3,
    text: "It reminds me to stay upright and confident. I love using it during work hours.",
    name: "Michael Lee",
    role: "Software Engineer"
  },
  {
    id: 4,
    text: "Lightweight, comfortable, and really effective. Highly recommended!",
    name: "Emma Brown",
    role: "Fitness Coach"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < testimonialsData.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePaginationClick = (index) => {
    setCurrentIndex(index);
  };

  const visibleTestimonials = window.innerWidth < 768
    ? [testimonialsData[currentIndex]]
    : testimonialsData.slice(currentIndex - 1, currentIndex + 2);

  return (
    <div className="w-11/12 max-w-7xl mx-auto my-20 px-2">
      {/* Header Section */}
      <div className='flex justify-center'>
        <img src={customer} alt="Customer" className="w-32 md:w-40" />
      </div>
      <h1 className='text-[#03373D] font-extrabold text-2xl md:text-4xl text-center mt-5 mb-3'>
        What our customers are saying
      </h1>
      <p className='text-[#606060] text-base md:text-xl font-normal text-center mb-10 leading-relaxed'>
        Enhance posture, mobility, and well-being effortlessly with Posture Pro. <br className="hidden md:block" />
        Achieve proper alignment, reduce pain, and strengthen your body with ease!
      </p>

      {/* Testimonials */}
      <div className="flex flex-wrap justify-center gap-5 transition-all duration-500">
        {visibleTestimonials.map((testimonial, index) => {
          const isCenter = window.innerWidth >= 768 ? index === 1 : true;

          return (
            <div
              key={testimonial.id}
              className={`p-5 rounded-3xl bg-white shadow-md min-w-[300px] w-full sm:w-72 md:w-80 transition-all duration-300 ${isCenter ? 'scale-105 opacity-100' : 'opacity-60'}`}
            >
              <img src={review} alt="Review Quote" className='mb-4 w-6' />
              <p className="mb-4 text-[#333] text-sm md:text-base">{testimonial.text}</p>
              <div className='divider'></div>
              <div className='flex items-center gap-4 mt-4'>
                <div className='rounded-full bg-[#03464D] w-10 h-10'></div>
                <div>
                  <h1 className='font-semibold text-sm md:text-base'>{testimonial.name}</h1>
                  <p className='text-[#606060] font-medium text-xs md:text-sm'>{testimonial.role}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="w-10 h-10 rounded-full border transition-colors duration-300"
          style={{
            backgroundColor: 'white',
            color: '#03373D',
            borderColor: '#CAEB66',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            opacity: currentIndex === 0 ? 0.4 : 1
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#CAEB66'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
        >
          ←
        </button>

        {/* Dots */}
        <div className="flex items-center gap-3">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => handlePaginationClick(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                ? 'bg-[#03464D]'
                : 'bg-gray-300 hover:bg-gray-400'
                }`}
            ></button>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={currentIndex === testimonialsData.length - 1}
          className="w-10 h-10 rounded-full border transition-colors duration-300"
          style={{
            backgroundColor: 'white',
            color: '#03373D',
            borderColor: '#CAEB66',
            cursor: currentIndex === testimonialsData.length - 1 ? 'not-allowed' : 'pointer',
            opacity: currentIndex === testimonialsData.length - 1 ? 0.4 : 1
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#CAEB66'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
