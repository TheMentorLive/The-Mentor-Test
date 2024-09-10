import { Link } from "react-router-dom";
import React from "react";
import { Select, MenuItem } from "@mui/material";

export default function Component() {
  const [qualification, setQualification] = React.useState("");
  const [interest, setInterest] = React.useState("");

  const handleQualificationChange = (event) => {
    setQualification(event.target.value);
  };

  const handleInterestChange = (event) => {
    setInterest(event.target.value);
  };

  return (
    <React.Fragment>
      <section className=" ml-1 mt-10 md:mt-0 lg:mt-0 md:ml-40 md:mr-20 md:py-10 lg:py-12 flex justify-center items-center ">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Master the Future <br />
                  With <br />
                  GenAI Learning
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-lg dark:text-gray-400">
                Take your knowledge to the next level with our comprehensive test series and expertly designed courses.
                </p>
              </div>
              <Link to="/register">
              <button
                type="submit"
                className="w-full max-w-[200px] bg-[#2563EB] hover:bg-blue-500 text-white font-medium py-2 px-4 rounded"
              >
                Get Started
              </button>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-full max-w-md border border-blue-200 rounded-lg shadow-md">
                <div className="p-6">
                  <h2 className="text-3xl font-bold">Get In Touch</h2>
                  
                </div>
                <div className="p-6 grid -mt-5 gap-4">
                  {/* Email Field */}
                  <div className="grid gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Phone Number Field */}
                  <div className="grid gap-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Highest Qualification */}
                  <div className="grid gap-2">
                    <label
                      htmlFor="qualification"
                      className="text-sm font-medium text-gray-700"
                    >
                      Highest Qualification
                    </label>
                    <Select
                      id="qualification"
                      value={qualification}
                      onChange={handleQualificationChange}
                      displayEmpty
                      className="w-full px-3 py-2 h-10 border border-gray-200 rounded-md "
                    >
                       <MenuItem value="" disabled>
                        <p className="text-gray-400 -ml-2">Select an option</p> {/* Placeholder */}
                      </MenuItem>
                      <MenuItem value="post-graduation">
                        Completed Post Graduation
                      </MenuItem>
                      <MenuItem value="graduation">Passed Graduation</MenuItem>
                      <MenuItem value="in-graduation">In Graduation</MenuItem>
                      <MenuItem value="class-12-10">
                        Class 12 - Class 10
                      </MenuItem>
                      <MenuItem value="class-10-below">
                        Class 10 & Below
                      </MenuItem>
                    </Select>
                  </div>

                  {/* Area of Interest */}
                  <div className="grid gap-2">
                    <label
                      htmlFor="interest"
                      className="text-sm font-medium text-gray-700"
                    >
                      Area Of Interest
                    </label>
                    <Select
                      id="interest"
                      value={interest}
                      onChange={handleInterestChange}
                      displayEmpty
                      className="w-full px-3 py-2 h-10 border border-gray-200 rounded-md"
                    >
                      <MenuItem value="" disabled>
                        <p className="text-gray-400 -ml-2">Select an option</p> {/* Placeholder */}
                      </MenuItem>
                      <MenuItem value="counselling">Counselling</MenuItem>
                      <MenuItem value="courses">Courses</MenuItem>
                      <MenuItem value="test-series">Test Series</MenuItem>
                      <MenuItem value="govt-exam-prep">Govt Exam Prep</MenuItem>
                      <MenuItem value="study-abroad">Study Abroad</MenuItem>
                    </Select>
                  </div>


                </div>
                <div className="p-6">
                  <button className="w-full bg-[#2563EB] hover:bg-blue-500 text-white font-medium py-2 px-4 rounded">
                    Send
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
