import React from 'react';
import { IoCashOutline } from 'react-icons/io5';
import { LiaTruckPickupSolid } from 'react-icons/lia';
import { TbBrandBooking, TbTruckDelivery } from 'react-icons/tb';

const HowItWorks = () => {
  return (
    <div data-aos="fade-up" className='w-11/12 mx-auto my-6 lg:my-20'>
      <h1 className='text-[#03373D] text-xl lg:text-3xl font-extrabold mb-5'>How it Works</h1>

      <div className='space-y-5 lg:space-y-0 lg:flex justify-center items-stretch gap-5'>

        {/* card-1 */}
        <div className='bg-[#FFFFFFB2] p-6 rounded-3xl flex-1'>
          <LiaTruckPickupSolid size={40} color="#03373D" />
          <h1 className='text-[#03373D] text-base lg:text-xl font-bold my-2'>Booking Pick & Drop</h1>
          <p className='text-[#606060] text-xs lg:text-base'>From personal packages to business shipments — we deliver on time, every time.</p>
        </div>
        {/* card-2 */}
        <div className='bg-[#FFFFFFB2] p-6 rounded-3xl flex-1'>
          <IoCashOutline size={40} color="#03373D" />
          <h1 className='text-[#03373D] text-base lg:text-xl font-bold my-2'>Cash On Delivery</h1>
          <p className='text-[#606060] text-xs lg:text-base'>Offer your customers the option to pay on delivery. We ensure secure cash handling and timely remittance to your account.</p>
        </div>
        {/* card-3 */}
        <div className='bg-[#FFFFFFB2] p-6 rounded-3xl flex-1'>
          <TbTruckDelivery size={40} color="#03373D" />
          <h1 className='text-[#03373D] text-base lg:text-xl font-bold my-2'>Delivery Hub</h1>
          <p className='text-[#606060] text-xs lg:text-base'>Speed up your logistics with our centralized delivery hubs, ensuring faster sorting, routing, and last-mile delivery.
          </p>
        </div>
        {/* card-4 */}
        <div className='bg-[#FFFFFFB2] p-6 rounded-3xl flex-1'>
          <TbBrandBooking size={40} color="#03373D" />
          <h1 className='text-[#03373D] text-base lg:text-xl font-bold my-2'>Booking SME & Corporate</h1>
          <p className='text-[#606060] text-xs lg:text-base'>Customized logistics solutions designed for SMEs and corporate clients, including delivery, pickups, and support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;