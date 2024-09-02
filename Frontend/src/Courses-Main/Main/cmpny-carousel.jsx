import React from 'react';
import Marquee from 'react-fast-marquee';

export default function Cmpnyslider() {
  return (
    <section className="flex  justify-center items-center w-fit">
      
        <Marquee
          gradient={false}
          pauseOnHover={true}
          className="border-t rounded-2xl border-b py-3 overflow-hidden"
          direction="left"
          
          speed={30} // Adjust speed as needed
          delay={0} // Adjust delay as needed
        >
          <div className="flex flex-nowrap justify-center items-center h-20">
            <div className="flex pr-10 flex-col justify-center items-center h-[350px] mx-5">
              <img src="/placeholder.png" className="w-40" alt="Google Logo" />
            </div>

            <div className="flex pr-10 flex-col justify-center items-center h-[350px] mx-5">
              <img src="/placeholder.png" className="w-40" alt="Microsoft Logo" />
            </div>

            <div className="flex pr-10 flex-col justify-center items-center h-[350px] mx-5">
              <img src="/placeholder.png" className="w-40" alt="TechCrunch Logo" />
            </div>

            <div className="flex pr-10 flex-col justify-center items-center h-[350px] mx-5">
              <img src="/placeholder.png" className="w-40" alt="Y Combinator Logo" />
            </div>

            <div className="flex pr-10 flex-col justify-center items-center h-[350px] mx-5">
              <img src="/placeholder.png" className="w-56" alt="New York Times Logo" />
            </div>

            <div className="flex pr-10 flex-col justify-center items-center h-[350px] mx-5">
              <img src="/placeholder.png" className="w-40" alt="HubSpot Logo" />
            </div>
          </div>
        </Marquee>
      
    </section>
  );
}
