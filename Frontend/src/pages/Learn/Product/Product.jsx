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
  const [headerVisible, setHeaderVisible] = useState(true);
  const [headerHidden, setHeaderHidden] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [offset, setOffset] = useState(0);

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY >= 40) {
      setOffset(scrollY - 40);
    }

    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY + 10) {
      setHeaderVisible(false);
    } else if (currentScrollY < lastScrollY - 20) {
      setHeaderVisible(true);
    }

    setLastScrollY(currentScrollY);

    const DetailsScrollY = window.scrollY;

    if (DetailsScrollY > lastScrollY + 10) {
      setHeaderHidden(true);
    } else if (DetailsScrollY < lastScrollY - 20) {
      setHeaderHidden(false);
    }

    setLastScrollY(DetailsScrollY);
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
  }, [lastScrollY]);

  return (
    <div>
      <Nav />
      {headerVisible && <Header className="z-50" />}

      {/* Main container */}
      <div className="">
        <div className="bg-[#2563EB] min-h-[350px] p-6 lg:p-10 flex items-center">
          <div className="lg:ml-[68px]">
            <h1 className="text-white text-[21px] lg:text-[37px] font-bold mb-4 lg:mb-7 mt-8 lg:mt-16">
              Learning Python for Data Analysis
            </h1>
            <h3 className="white text-[15px] lg:text-[15px]">
              Learn python and how to use it to analyze, visualize and present
              data. Includes tons of sample
              <br className="hidden lg:block" /> code and hours of video!
            </h3>

            <div cla>
              <span className="Ybox">Bestseller</span>
              <span className="darkyellow flex items-center space-x-1">
                4.3
                <span className="flex space-x-1">
                  <StarPurple500SharpIcon />
                  <StarPurple500SharpIcon />
                  <StarPurple500SharpIcon />
                  <StarPurple500SharpIcon />
                  <StarHalfSharpIcon />
                </span>
              </span>
            </div>

            <div className="Bcreated -mt-1">
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
            </div>
          </div>
        </div>
      </div>

{/* ////////////////////////////-------fixBox---------------//////// */}
<div className="hidden lg:flex lg:ml-[25px]">
  <div className="mt-[70px]">
    <div
      className="fixBox border w-[300px] border-blue-400 h-fit transition-transform duration-500" // Reduced width slightly more
      style={{ transform: `translateY(${-Math.min(offset, 0)}px)` }} // Negative translateY to make it rise
    >
      {headerVisible && (
        <div className="hidden overline lg:block ">
          <img
            src="/live/Hero.png" // Update with the correct image path
            alt="Python Data Analysis"
            className="max-w-[300px] h-auto" // Reduced image width slightly more
          />
        </div>
      )}
      <div className="innerFixBox">
        <div className="Ftop2lines">
          <div className="flex FTH">
            <h1 className="FT1 text-[0.9rem] sm:text-[1rem]">₹455</h1> {/* Reduced text size further */}
            <span className="FT2 text-[0.75rem] sm:text-[0.9rem]">₹3,499</span> {/* Reduced text size further */}
            <span className="FT3 text-[0.75rem] sm:text-[0.9rem]">87% off</span> {/* Reduced text size further */}
          </div>
          <div className="red text-xs sm:text-[0.85rem]"> {/* Further reduced text size */}
            <AccessAlarmsIcon />
            <span> 5 hours</span> left at this price!
          </div>
        </div>
        <Link to="/Cartpg">
          <button className="w-full bg-[#2563EB] text-white h-8 sm:h-9 text-[14px] sm:text-[15px] mt-3 rounded-md border-none cursor-pointer flex items-center justify-center">
            Go to Cart
          </button>
        </Link>
        <button className="w-full border border-black text-black h-8 sm:h-9 text-[90%] sm:text-[100%] rounded-md mt-3 cursor-pointer flex items-center justify-center">
          Buy now
        </button>

        <p className="center -mb-2 mt-4 text-xs sm:text-[0.85rem]">30-Day Money-Back Guarantee</p> {/* Further reduced text size */}

        {headerHidden && (
          <div className="ThisCourse">
            <h4 className="text-[0.9rem] sm:text-[1rem]">This course includes:</h4> {/* Reduced heading size further */}
            <br />
            <p className="text-xs sm:text-[0.85rem]">
              <AllInclusiveTwoToneIcon /> Full lifetime access
            </p>
            <p className="text-xs sm:text-[0.85rem]">
              <PhoneAndroidTwoToneIcon /> Access on mobile and TV
            </p>
            <p className="text-xs sm:text-[0.85rem]">
              <EmojiEventsTwoToneIcon /> Certificate of completion
            </p>
          </div>
        )}

        <div className="gap underline pointer mt-6">
          <input
            id="coupon"
            type="text"
            placeholder="  Enter Coupon Code" // Removed extra spaces
            className="w-full h-[35px] sm:h-[40px] mt-3 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-[0.85rem]" // Reduced height further
          />
          <h4 className="text-xs sm:text-[0.85rem]">Apply Coupon</h4> {/* Further reduced text size */}
        </div>
      </div>
    </div>
  </div>
</div>



      {/* Explore related topics */}
<div className="lg:ml-[105px] lg:mt-[190px] mt-[270px]">
  <h2 className="-mt-[250px] text-[1rem] font-bold lg:text-left text-center">
    Explore related topics
  </h2>
  <div className="mt-1 flex flex-wrap gap-1 justify-center lg:justify-start">
    <span className="bg-gray-200 px-2 py-1 rounded text-[0.75rem] font-semibold text-gray-700">
      Web Development
    </span>
    <span className="bg-gray-200 px-2 py-1 rounded text-[0.75rem] font-semibold text-gray-700">
      Development
    </span>
  </div>

  <h2 className="mt-3 text-[1rem] font-bold lg:text-left text-center">
    What you'll learn
  </h2>
  <ul className="mt-2 space-y-1 text-[0.8rem] text-muted-foreground lg:text-left text-center">
    <li>
      Build 16 web development projects for your portfolio, ready to apply
      for junior developer jobs.
    </li>
    <li>
      Learn the latest technologies, including Javascript, React, Node, and even Web3 development.
    </li>
    <li>After the course you will be able to build ANY website you want.</li>
    <li>Build fully-fledged websites and web apps for your startup or business.</li>
  </ul>
</div>

{/* Course content */}
<div className="mb-4 mt-14 ml-3 md:ml-6 lg:ml-[105px]">
  <h2 className="text-[1.35rem] font-bold text-center lg:text-left">
    Course content
  </h2>
  <p className="text-[0.8rem] text-muted-foreground text-center lg:text-left">
    44 sections • 373 lectures • 61h 44m total length
  </p>
</div>

<div className="space-y-2 ml-3 md:ml-6 lg:ml-[105px] w-full lg:w-[750px]">
  {/* Course sections */}
  {[
    {
      title: "Front-End Web Development",
      duration: "10 hours",
      modules: "5 modules",
    },
    {
      title: "Introduction to HTML",
      duration: "5 hours",
      modules: "3 modules",
    },
  ].map(({ title, duration, modules }) => (
    <div key={title}>
      <div className="flex items-center justify-between p-3 border rounded">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => toggleSection(title)}
        >
          <span
            className={`mr-2 transition-transform duration-300 ${
              expandedSections[title] ? "rotate-90" : ""
            }`}
          >
            ➔ {/* Arrow icon */}
          </span>
          <h3 className="text-[0.9rem]">{title}</h3> {/* Slightly reduced title size */}
        </div>
        <div className="flex space-x-3">
          <a href="#" className="text-blue-600 text-[0.75rem]">
            Learn more
          </a>
          <a href="#" className="text-blue-600 text-[0.75rem]">
            Take test
          </a>
        </div>
      </div>
      <div
        className={`ml-4 mt-2 transition-all duration-300 ease-in-out overflow-hidden ${
          expandedSections[title] ? "max-h-36" : "max-h-0"
        }`}
      >
        <div className="text-[0.75rem] text-muted-foreground">
          <p>
            <strong>Duration:</strong> {duration}
          </p>
          <p>
            <strong>Modules:</strong> {modules}
          </p>
        </div>
      </div>
    </div>
  ))}
  <div className="flex justify-center mt-3" ref={cardRef}>
    <button className="px-3 py-2 text-blue-600 border rounded text-[0.8rem]">
      34 more sections
    </button>
  </div>
</div>

      <More />
    </div>
  );
};
