import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import {TypewriterEffectSmooth} from "../../../utils/typeWritter"; // Ensure this is the correct import path

export default function More() {
  const words = [
    {
      text: "Unlock",
      className: "text-lg sm:text-3xl md:text-5xl",
    },
    {
      text: "your ",
      className: "text-lg sm:text-3xl md:text-5xl",
    },
    {
      text: "potential  ",
      className: "text-lg sm:text-3xl md:text-5xl",
    },
    {
      text: "with  ",
      className: "text-lg sm:text-3xl md:text-5xl",
    },
    {
      text: "GenAi Learning.",
      className:
        "text-blue-500 dark:text-blue-500 text-lg sm:text-3xl md:text-5xl",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      {/* Adjust height and padding */}
      <p className="text-neutral-900 dark:text-neutral-900 text-sm sm:text-base">
        Your journey to a brighter future begins here
      </p>

      <TypewriterEffectSmooth words={words} className="mt-3 sm:mt-5" />
      {/* Adjust margin-top */}

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
        <button className="bg-slate-800 w-full sm:w-40 h-10 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-xl p-px text-xs font-semibold leading-6 text-white inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
          </span>
          <div className="relative h-8 flex justify-center items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
            <span>{`Contact Us`}</span>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
        </button>
        <Link to="/login">
          <button className="w-full sm:w-40 h-10 rounded-xl bg-white text-black border border-blue-500 text-sm">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}
