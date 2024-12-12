import React from "react"; 
import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section className="relative flex flex-col md:flex-row items-center justify-center md:-mt-11 h-auto md:h-[400px]">
            {/* Background Image */}
            <img
                src="./test/test-hero.png"
                alt="Hero Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between max-w-[1200px] w-full px-[16px] md:px-[32px] space-y-8 md:space-y-0 md:space-x-[32px]">
                {/* Hero Content */}
                <div className="text-white flex flex-col items-center md:items-start lg:-ml-[40px] space-y-[16px]">
                    <h1 className="text-[24px] sm:text-[30px] md:text-[40px] lg:text-[48px] p-[8px] font-bold tracking-tight leading-tight text-center md:text-left">
                        India's Structured Online Test series platform
                    </h1>
                    <p className="max-w-[544px] text-gray-400 text-center md:text-left p-[8px] text-[14px] md:text-[16px] hidden md:block">
                        Boost your exam preparation with Test Series for Banking, SSC, RRB & All other Govt. Exams
                    </p>
                    <div className="py-[8px]">
                        <Link to="/register">
                            <button
                                type="button"
                                className="w-full max-w-[180px] bg-[#2563EB] hover:bg-blue-500 p-[8px] text-white font-medium py-[8px] px-[16px] rounded hidden md:block"
                            >
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Form Section */}
            </div>
        </section>
    );
}
