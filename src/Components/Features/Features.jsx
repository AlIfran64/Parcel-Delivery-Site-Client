import React from 'react';

const Features = () => {
  return (
    <div className="w-11/12 mx-auto my-20 space-y-4">

      {/* Card-1 */}
      <div data-aos="fade-left" className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-md p-6 md:p-15">

        {/* Left - Illustration */}
        <div className="flex justify-center mb-6 md:mb-0">
          <div className="p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="180"
              height="220"
              viewBox="0 0 64 64"
              fill="none"
              className="w-[180px] h-[220px]"
            >
              <rect x="4" y="20" width="56" height="36" rx="4" fill="#CAEB66" stroke="#03373D" strokeWidth="2" />
              <path d="M4 26H60" stroke="#03373D" strokeWidth="2" strokeDasharray="4 2" />
              <path d="M18 40H46" stroke="#03373D" strokeWidth="2" />
              <path d="M18 46H38" stroke="#03373D" strokeWidth="2" />
              <path d="M32 4L36 10H28L32 4Z" fill="#03373D" />
              <path d="M24 10H40V16C40 17.1046 39.1046 18 38 18H26C24.8954 18 24 17.1046 24 16V10Z" fill="white" stroke="#03373D" strokeWidth="2" />
              <circle cx="20" cy="54" r="4" fill="white" stroke="#03373D" strokeWidth="2" />
              <circle cx="44" cy="54" r="4" fill="white" stroke="#03373D" strokeWidth="2" />
              <path d="M48 8C48 8 50 6 52 6C54 6 56 8 56 10C56 12 54 14 52 14C50 14 48 12 48 10V8Z" fill="white" stroke="#03373D" strokeWidth="2" />
              <path d="M52 10L50 12" stroke="#03373D" strokeWidth="2" />
            </svg>

          </div>

        </div>

        {/* Divider */}
        <div className="hidden md:block h-40 border-l border-dashed border-gray-400 mx-8"></div>

        {/* Right - Text */}
        <div className="w-full text-center md:text-left">
          <h2 className="text-2xl font-bold text-[#03373D] mb-2">100% Safe Delivery</h2>
          <p className="text-gray-600 text-sm md:text-base">
            We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.
          </p>
        </div>
      </div>

      {/* Card-2 */}
      <div data-aos="fade-right" className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-md p-6 md:p-15">

        {/* Left - Illustration */}
        <div className="flex justify-center mb-6 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 64 64" fill="none">
            <rect x="10" y="20" width="44" height="30" rx="4" fill="#CAEB66" stroke="#03373D" strokeWidth="2" />
            <path d="M10 28H54" stroke="#03373D" strokeWidth="1.5" strokeDasharray="4 2" />
            <path d="M22 20V50" stroke="#03373D" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M32 8C28.6863 8 26 10.6863 26 14C26 18.5 32 24 32 24C32 24 38 18.5 38 14C38 10.6863 35.3137 8 32 8Z" fill="white" stroke="#03373D" strokeWidth="2" />
            <circle cx="32" cy="14" r="2" fill="#03373D" />
            <path d="M32 24L32 34" stroke="#03373D" strokeWidth="1.5" strokeDasharray="2 3" />
            <circle cx="32" cy="34" r="1.5" fill="#03373D" />
            <circle cx="32" cy="34" r="3.5" stroke="#03373D" strokeWidth="0.8" opacity="0.4" />
            <circle cx="32" cy="34" r="5.5" stroke="#03373D" strokeWidth="0.5" opacity="0.2" />
          </svg>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-40 border-l border-dashed border-gray-400 mx-8"></div>

        {/* Right - Text */}
        <div className="w-full text-center md:text-left">
          <h2 className="text-2xl font-bold text-[#03373D] mb-2">Live Parcel Tracking</h2>
          <p className="text-gray-600 text-sm md:text-base">
            Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.
          </p>
        </div>
      </div>

      {/* Card-3 */}
      <div data-aos="fade-left" className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-md p-6 md:p-15">

        {/* Left - Illustration */}
        <div className="flex justify-center mb-6 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 64 64" fill="none">
            <path d="M14 36C14 27 18 20 32 20C46 20 50 27 50 36V42H44V36C44 30 40 26 32 26C24 26 20 30 20 36V42H14V36Z" fill="#CAEB66" stroke="#03373D" strokeWidth="2" />
            <path d="M20 20C20 12 28 8 32 8C36 8 44 12 44 20" stroke="#03373D" strokeWidth="2" strokeLinecap="round" />
            <path d="M50 42L54 40L54 44L50 42Z" fill="#03373D" />
            <line x1="54" y1="40" x2="58" y2="36" stroke="#03373D" strokeWidth="2" strokeLinecap="round" />
            <circle cx="20" cy="54" r="10" fill="white" stroke="#03373D" strokeWidth="2" />
            <line x1="20" y1="54" x2="20" y2="48" stroke="#03373D" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="54" x2="25" y2="56" stroke="#03373D" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-40 border-l border-dashed border-gray-400 mx-8"></div>

        {/* Right - Text */}
        <div className="w-full text-center md:text-left">
          <h2 className="text-2xl font-bold text-[#03373D] mb-2">24/7 Call Center Support</h2>
          <p className="text-gray-600 text-sm md:text-base">
            Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
