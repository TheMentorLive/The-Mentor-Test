import React from 'react';
import Marquee from 'react-fast-marquee';

export default function Cmpnycarousel() {
  return (
    <section className="flex h-[100px] justify-center mt-16 items-center md:w-full  overflow-hidden">
      <Marquee
        gradient={true} // Turn off the gradient for a smoother look
        pauseOnHover={true}
        className="flex items-center"
      >
        <div className="flex items-center space-x-20">
          <div className="flex flex-col justify-center items-center h-[50px] mx-5">
            <img src="./logos/amazon.png" className="w-28" alt="Company Logo" />
          </div>

          <div className="flex flex-col justify-center items-center h-[40px] mx-5">
            <img src="./logos/google.png" className="w-28" alt="Company Logo" />
          </div>

          <div className="flex flex-col justify-center items-center h-[40px] mx-5">
            <img src="./logos/ibm.png" className="w-28" alt="Company Logo" />
          </div>

          <div className="flex flex-col justify-center items-center h-[40px] mx-5">
            <img src="./logos/meta.png" className="w-28" alt="Company Logo" />
          </div>

          <div className="flex flex-col justify-center items-center h-[40px] mx-5">
            <img src="./logos/microsoft.png" className="w-28" alt="Company Logo" />
          </div>

          <div className="flex flex-col justify-center items-center h-[40px] mx-5">
            <img src="./logos/optum.png" className="w-28" alt="Company Logo" />
          </div>

          <div className="flex flex-col justify-center items-center h-[40px] mx-5">
            <img src="./logos/tcs.png" className="w-28" alt="Company Logo" />
          </div>

          {/* Duplicate the items to create a seamless loop effect */}
          <div className="flex flex-col justify-center items-center h-[40px] mx-5">
            <img src="./logos/amazon.png" className="w-28" alt="Company Logo" />
          </div>

          <div className="flex flex-col justify-center items-center h-[40px] mx-5">
            <img src="./logos/google.png" className="w-28" alt="Company Logo" />
          </div>

          <div className="flex flex-col justify-center items-center h-[40px] mx-5">
            <img src="./logos/ibm.png" className="w-28" alt="Company Logo" />
          </div>

          <div className="flex flex-col justify-center items-center h-[40px] mx-5">
            <img src="./logos/meta.png" className="w-28" alt="Company Logo" />
          </div>

          <div className="flex flex-col justify-center items-center h-[40px] mx-5">
            <img src="./logos/microsoft.png" className="w-28" alt="Company Logo" />
          </div>

          <div className="flex flex-col justify-center items-center h-[40px] mx-5">
            <img src="./logos/optum.png" className="w-28" alt="Company Logo" />
          </div>

          <div className="flex flex-col justify-center items-center h-[40px] mx-5">
            <img src="./logos/tcs.png" className="w-28" alt="Company Logo" />
          </div>
        </div>
      </Marquee>
    </section>
  );
}
