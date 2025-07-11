import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { motion } from 'framer-motion';

const OurServicesCard = ({ item }) => {
  const { icon, title, description } = item;
  const IconComponent = FaIcons[icon];

  return (
    <motion.div
      className="bg-white hover:bg-[#CAEB66] p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="mb-4 flex justify-center">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[linear-gradient(180deg,_#EEEDFC_0%,_rgba(238,237,252,0)_100%)]">
          {IconComponent && <IconComponent size={32} color="#03373D" />}
        </div>
      </div>
      <h3 className="text-xl text-[#03373D] font-bold mb-2">{title}</h3>
      <p className="text-sm text-[#606060]">{description}</p>
    </motion.div>
  );
};

export default OurServicesCard;
