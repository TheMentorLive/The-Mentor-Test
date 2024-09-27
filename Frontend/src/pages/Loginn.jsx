"use client";

import React from "react";

export default function Sidebar1() {
  const cardData = [
    { name: "Live", org: "Counselling & Mentorship", image: "/cards/Live1.png" },
    { name: "Learn", org: "UpSkilling Courses", image: "/cards/Learn1.png" },
    { name: "Jobs", org: "Remote, Hybrid & Onsite", image: "/cards/Jobs1.png" },
    { name: "Community", org: "Connect & Grow", image: "/cards/Community1.png" },
  ];

  return (
    <div>
      <div>
        <p className="ml-5 mt-2 mb-8 text-2xl font-bold">Dashboard</p>
      </div>
      <div className="flex ml-6 mb-5 items-left">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cardData.map((app, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-1 border rounded-md bg-white border-gray-300"
            >
              <div className="border px-6 py-4 rounded-md bg-blue-100 border-gray-300">
                <img
                  src={app.image}
                  alt={app.name}
                  width="30"
                  height="30"
                  className="rounded-md border border-slate-300"
                  style={{ aspectRatio: "1/1", objectFit: "cover" }}
                />
              </div>
              <div className="text-left mt-2 w-full">
                <p className="text-xs font-semibold">{app.name}</p>
                {app.badge && (
                  <span className="text-[8px] px-1 py-0.5 bg-gray-200 text-gray-700 rounded-md mb-0.5">
                    {app.badge}
                  </span>
                )}
                <p className="text-gray-500 text-[7px]">{app.org}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <main className="flex-1 px-3 py-4 sm:px-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
              <div className="p-3">
                <h3 className="text-base font-semibold">Current Courses</h3>
                <p className="text-sm text-gray-500">Your active courses</p>
              </div>
              <div className="p-3">
                <div className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2563EB] text-primary-foreground">
                      <BookIcon className="h-4 w-4 text-white" />
                    </div>
                    <div className="grid gap-1">
                      <div className="text-sm font-medium">Introduction to Web Development</div>
                      <div className="text-xs text-muted-foreground">Completed: 75%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-secondary-foreground">
                      <CodeIcon className="h-4 w-4" />
                    </div>
                    <div className="grid gap-1">
                      <div className="text-sm font-medium">Advanced JavaScript</div>
                      <div className="text-xs text-muted-foreground">Completed: 50%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-accent-foreground">
                      <DatabaseIcon className="h-4 w-4" />
                    </div>
                    <div className="grid gap-1">
                      <div className="text-sm font-medium">Database Fundamentals</div>
                      <div className="text-xs text-muted-foreground">Completed: 30%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
              <div className="p-3">
                <h3 className="text-base font-semibold">Progress</h3>
                <p className="text-sm text-gray-500">Your overall progress</p>
              </div>
              <div className="p-3">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Courses Completed</div>
                    <div className="text-sm font-medium">8 / 12</div>
                  </div>
                  <Progress value={66.67} aria-label="Courses Completed" />
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Assignments Completed</div>
                    <div className="text-sm font-medium">42 / 60</div>
                  </div>
                  <Progress value={70} aria-label="Assignments Completed" />
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Quizzes Passed</div>
                    <div className="text-sm font-medium">18 / 20</div>
                  </div>
                  <Progress value={90} aria-label="Quizzes Passed" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
              <div className="p-3">
                <h3 className="text-base font-semibold">Upcoming</h3>
                <p className="text-sm text-gray-500">Your upcoming deadlines and events</p>
              </div>
              <div className="p-3">
                <div className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-accent-foreground">
                      <CalendarIcon className="h-4 w-4" />
                    </div>
                    <div className="grid gap-1">
                      <div className="text-sm font-medium">Final Project Deadline</div>
                      <div className="text-xs text-muted-foreground">Due: June 30, 2023</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-secondary-foreground">
                      <CalendarIcon className="h-4 w-4" />
                    </div>
                    <div className="grid gap-1">
                      <div className="text-sm font-medium">Midterm Exam</div>
                      <div className="text-xs text-muted-foreground">Date: May 15, 2023</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2563EB] text-primary-foreground">
                      <CalendarIcon className="h-4 w-4 text-white" />
                    </div>
                    <div className="grid gap-1">
                      <div className="text-sm font-medium">Career Counseling Session</div>
                      <div className="text-xs text-muted-foreground">Date: April 20, 2023</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
              <div className="p-3">
                <h3 className="text-base font-semibold">Community</h3>
                <p className="text-sm text-gray-500">Announcements and events</p>
              </div>
              <div className="p-3">
                <div className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2563EB] text-primary-foreground">
                      <MegaphoneIcon className="h-4 w-4 text-white" />
                    </div>
                    <div className="grid gap-1">
                      <div className="text-sm font-medium">New Course Announcement</div>
                      <div className="text-xs text-muted-foreground">Introduction to React.js</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-secondary-foreground">
                      <MegaphoneIcon className="h-4 w-4" />
                    </div>
                    <div className="grid gap-1">
                      <div className="text-sm font-medium">Community Meetup</div>
                      <div className="text-xs text-muted-foreground">Date: May 5, 2023</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-accent-foreground">
                      <MegaphoneIcon className="h-4 w-4" />
                    </div>
                    <div className="grid gap-1">
                      <div className="text-sm font-medium">Open Source Contributions</div>
                      <div className="text-xs text-muted-foreground">Due: April 25, 2023</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function AwardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
      <circle cx="12" cy="8" r="6" />
    </svg>
  )
}


function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}





function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}


function DatabaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  )
}



function MegaphoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  )
}


function Progress({ value, ariaLabel }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${value}%` }}
        aria-label={ariaLabel}
      />
    </div>
  );
}
