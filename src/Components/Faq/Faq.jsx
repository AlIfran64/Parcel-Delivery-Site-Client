import React, { useState } from 'react';

const faqData = [
  {
    question: "What services does ProFast offer?",
    answer:
      "ProFast provides reliable and fast parcel delivery across cities and regions. We offer same-day, next-day, and scheduled delivery services for individuals and businesses.",
  },
  {
    question: "How can I track my parcel?",
    answer:
      "Once your order is placed, you’ll receive a tracking ID via SMS or email. You can use this ID on our website’s tracking page to monitor your parcel's real-time status.",
  },
  {
    question: "What items are restricted from delivery?",
    answer:
      "ProFast does not deliver hazardous materials, perishable goods, live animals, illegal substances, or any items prohibited by law. Please refer to our terms and conditions for the full list.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on the service you choose. Same-day delivery usually arrives within 4–8 hours, while next-day delivery is completed within 24 hours.",
  },
  {
    question: "What should I do if my parcel is delayed or lost?",
    answer:
      "In case of delay or loss, please contact our support team with your tracking ID. We’ll investigate the issue and ensure prompt resolution or compensation as per our policy.",
  },
  {
    question: "Can I reschedule or cancel a delivery?",
    answer:
      "Yes, you can reschedule or cancel your delivery by logging into your account or contacting our support before the parcel is dispatched. Changes after dispatch may incur additional fees.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-11/12 mx-auto my-20 max-w-4xl">
      <h1 className='text-[#03373D] font-extrabold text-4xl text-center mt-5 mb-3'>Frequently Asked Questions (FAQ)</h1>
      <p className='text-[#606060] text-xl font-normal text-center mb-10'>
        Got questions about ProFast? We've got answers to help you understand our services and support better.
      </p>

      <div className="space-y-4">
        {faqData.map((faq, index) => {
          const isActive = activeIndex === index;
          const bgColor = isActive ? 'bg-[#C3DFE2]' : 'bg-white';
          const borderColor = isActive ? 'border-[#A0C5C8]' : 'border-[#E0E0E0]';

          return (
            <div
              key={index}
              className={`rounded-lg transition-all duration-300 ${bgColor} ${borderColor} border`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-5 py-4 flex justify-between items-center text-[#03373D] font-semibold text-lg focus:outline-none"
              >
                {faq.question}
                <span className="text-xl">{isActive ? '−' : '+'}</span>
              </button>
              {isActive && (
                <div className="px-5 pb-4 text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
