import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Using react-icons for close icon

const TopHeader = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-blue-800 text-white text-center py-1 text-xs relative flex justify-center items-center">
      <span>Accelerate your growth with access to 11,000+ top-tier test series.</span>
      <a href="#" className="underline ml-2">Learn More</a>
      <button 
        onClick={handleClose} 
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
        aria-label="Close"
      >
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default TopHeader;
