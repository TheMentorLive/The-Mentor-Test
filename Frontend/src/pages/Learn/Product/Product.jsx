import React from "react";
import { useEffect, useRef, useState } from "react";
import "./Product.css";
import More from "../detail/more";
import ReportIcon from "@mui/icons-material/Report";
import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import StarHalfSharpIcon from "@mui/icons-material/StarHalfSharp";
import Header from "../../../components/Header";
import Nav from "./Nav";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";

import AllInclusiveTwoToneIcon from "@mui/icons-material/AllInclusiveTwoTone";
import PhoneAndroidTwoToneIcon from "@mui/icons-material/PhoneAndroidTwoTone";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import { Link } from "react-router-dom";

export const Product = () => {
  const cardRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [headerVisible, setHeaderVisible] = useState(true); // State to control header visibility
  const [lastScrollY, setLastScrollY] = useState(0); // State to track last scroll position
  const [offset, setOffset] = useState(0);

  const handleScroll = () => {
    // Get the current scroll position
    const scrollY = window.scrollY;

    // Update the offset to create an upward movement effect
    if (scrollY >= 40) {
      setOffset(scrollY - 40); // The card starts to rise after 40px of scrolling
    }


    const currentScrollY = window.scrollY; // Get the current scroll position

    // Check if the user scrolled down more than 20 pixels (approximately 2 cm)
    if (currentScrollY > lastScrollY + 10) {
      setHeaderVisible(false); // Hide the header
    } else if (currentScrollY < lastScrollY - 20) {
      setHeaderVisible(true); // Show the header
    }

    // Update the last scroll position
    setLastScrollY(currentScrollY);
  };
  

 

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]); // Add lastScrollY as a dependency

  return (
    <div>
     
     
     <Nav/>
      {headerVisible && <Header className="z-50" />}
      
      {/* Nav with a lower z-index */}
      
   
      {/* <PlayCircleFilledRoundedIcon/> */}
      <div className="">
      <div className="bg-[#2563EB] min-h-[350px] p-10 flex items-center">
  <div className="lg:ml-[100px] ">
    <h1 className="text-white text-[37px] font-bold mb-7 mt-16">
      Learning Python for Data Analysis 
    </h1>

    <h3 className="white">
      Learn python and how to use it to analyze, visualize and present
      data. Includes tons of sample <br/> code and hours of video!
    </h3>

    <div>
      <span className="Ybox">Bestseller</span>
      <span className="darkyellow">
        4.3
        <span>
          <StarPurple500SharpIcon />
          <StarPurple500SharpIcon />
          <StarPurple500SharpIcon />
          <StarPurple500SharpIcon />
          <StarHalfSharpIcon />
        </span>
      </span>
    </div>

    <div className="Bcreated">
      <span className="white">Created by </span>
      <span className="purpal underline">Jose Portilla</span>
    </div>

    <div className="white BBbottom">
      <span className="BBicons">
        <ReportIcon />
      </span>
      <span className="BBbottomText">Last updated 9/2019</span>
      <span className="BBicons">
        <PublicTwoToneIcon />
      </span>
      <span className="BBbottomText">English</span>
      <span className="BBicons"></span>
    </div>
  </div>

  {/* Image section */}
  <div className="hidden overline lg:block mt-[90px] ml-[115px]">
    <img 
      src="/live/Hero.png" // Update with the correct image path
      alt="Python Data Analysis" 
      className="max-w-[350px] h-auto" // Adjust the size as needed
    />
  </div>
</div>

</div>


      {/* ////////////////////////////-------fixBox---------------//////// */}
      <div className="mt-[270px] lg:-ml-[50px]">
  <div className="">
    <div
      className="fixBox border w-[350px] border-blue-400 h-fit transition-transform duration-500" // Increased width slightly
      style={{ transform: `translateY(${-Math.min(offset, 200)}px)` }} // Negative translateY to make it rise
    >
      <div className="innerFixBox">
        <div className="Ftop2lines">
          <div className="flex FTH">
            <h1 className="FT1 text-[1.25rem]"> ₹455 </h1> {/* Increased text size */}
            <span className="FT2 text-[1rem]"> ₹3,499 </span> {/* Increased text size */}
            <span className="FT3 text-[1rem]"> 87% off </span> {/* Increased text size */}
          </div>
          <div className="red text-sm"> {/* Kept text size the same */}
            <AccessAlarmsIcon />
            <span className=""> 5 hours</span> left at this price!
          </div>
        </div>
        <Link to="/Cartpg">
          <button className="w-full bg-[#2563EB] text-white h-12 text-[110%] mt-3 rounded-md border-none cursor-pointer"> {/* Increased height and text size */}
            Go to Cart
          </button>
        </Link>
        <button className="w-full border border-black text-black h-12 text-[110%] rounded-md mt-3 cursor-pointer"> {/* Increased height and text size */}
          Buy now
        </button>

        <p className="center mb-6 text-sm">30-Day Money-Back Guarantee</p> {/* Kept text size the same */}

        <div className="ThisCourse">
          <h4 className="text-[1.2rem]">This course includes:</h4> {/* Increased text size */}
          <br />
          <p className="text-sm">
            <AllInclusiveTwoToneIcon /> Full lifetime access
          </p>
          <p className="text-sm">
            <PhoneAndroidTwoToneIcon /> Access on mobile and TV
          </p>
          <p className="text-sm">
            <EmojiEventsTwoToneIcon /> Certificate of completion
          </p>
        </div>

        <div className="gap underline pointer mt-6"> {/* Kept margin the same */}
          <input
            id="coupon"
            type="text"
            placeholder="Enter Coupon Code" // Removed extra spaces
            className="w-full h-[45px] mt-3 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" // Increased height slightly
          />
          <h4 className="text-sm">Apply Coupon</h4> {/* Kept text size the same */}
        </div>
      </div>
    </div>
  </div>
</div>


      {/* --------------------------------------------------------------- */}
      <div className="lg:ml-[135px]">
      <h2 className="-mt-[260px]  text-lg font-bold">Explore related topics</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="bg-gray-200 px-2 py-1 rounded text-xs font-semibold text-gray-700">Web Development</span>
              <span className="bg-gray-200 px-2 py-1 rounded text-xs font-semibold text-gray-700">Development</span>
            </div>

            <h2 className="mt-4 text-lg font-bold">What you'll learn</h2>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.</li>
              <li>Learn the latest technologies, including Javascript, React, Node, and even Web3 development.</li>
              <li>After the course you will be able to build ANY website you want.</li>
              <li>Build fully-fledged websites and web apps for your startup or business.</li>
            </ul>
      <br />
      <br />
      <br />
      <br />
      </div>
      <div className="mb-4 -mt-16 ml-4 md:ml-8 lg:ml-[135px]">
            <h2 className="text-2xl font-bold">Course content</h2>
            <p className="text-sm text-muted-foreground">44 sections • 373 lectures • 61h 44m total length</p>
          </div>

          <div className="space-y-2 ml-4 md:ml-8 lg:ml-[135px] w-full lg:w-[800px]">
            {/* Course sections */}
            {[{ title: "Front-End Web Development", duration: "10 hours", modules: "5 modules" },
            { title: "Introduction to HTML", duration: "5 hours", modules: "3 modules" },
              // Add other sections here
            ].map(({ title, duration, modules }) => (
              <div key={title}>
                <div className="flex items-center justify-between p-4 border rounded">
                  <div className="flex items-center cursor-pointer" onClick={() => toggleSection(title)}>
                    <span className={`mr-2 transition-transform duration-300 ${expandedSections[title] ? "rotate-90" : ""}`}>
                      ➔ {/* Arrow icon */}
                    </span>
                    <h3>{title}</h3>
                  </div>
                  <div className="flex space-x-4">
                    <a href="#" className="text-blue-600">Learn more</a>
                    <a href="#" className="text-blue-600">Take test</a>
                  </div>
                </div>
                <div
                  className={`ml-4 mt-2 transition-all duration-300 ease-in-out overflow-hidden ${expandedSections[title] ? "max-h-40" : "max-h-0"
                    }`}
                >
                  <div className="text-sm text-muted-foreground">
                    <p><strong>Duration:</strong> {duration}</p>
                    <p><strong>Modules:</strong> {modules}</p>
                  </div>
                </div>
              </div>
            ))}
             <div className="flex justify-center mt-4" ref={cardRef}>
            <button className="px-4 py-2 text-blue-600 border rounded">
              34 more sections
            </button>
          </div>
          </div>
         <More/>
    </div>
  );
};
