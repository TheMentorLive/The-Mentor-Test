import React from 'react';
import { Card, CardHeader, CardContent, Typography, LinearProgress } from '@mui/material';
import { Book as BookIcon, Code as CodeIcon, CalendarToday as CalendarIcon, EmojiEvents as AwardIcon, Campaign as MegaphoneIcon } from '@mui/icons-material';

const UserDashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Main Content */}
      <div className="flex-1">
        <main className="flex-1 px-4 py-6 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Current Courses Card */}
            <Card className="shadow-md">
              <CardHeader
                title="Current Courses"
                subheader="Your active courses"
                titleTypographyProps={{ variant: 'h6' }}
                subheaderTypographyProps={{ variant: 'body2' }}
              />
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white">
                      <BookIcon />
                    </div>
                    <div className="grid gap-1">
                      <Typography variant="body1">Introduction to Web Development</Typography>
                      <Typography variant="caption" color="text.secondary">Completed: 75%</Typography>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white">
                      <CodeIcon />
                    </div>
                    <div className="grid gap-1">
                      <Typography variant="body1">Advanced JavaScript</Typography>
                      <Typography variant="caption" color="text.secondary">Completed: 50%</Typography>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card className="shadow-md">
              <CardHeader
                title="Progress"
                subheader="Your overall progress"
                titleTypographyProps={{ variant: 'h6' }}
                subheaderTypographyProps={{ variant: 'body2' }}
              />
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <Typography variant="body1">Courses Completed</Typography>
                    <Typography variant="body1">8 / 12</Typography>
                  </div>
                  <LinearProgress variant="determinate" value={66.67} />

                  <div className="flex items-center justify-between">
                    <Typography variant="body1">Assignments Completed</Typography>
                    <Typography variant="body1">42 / 60</Typography>
                  </div>
                  <LinearProgress variant="determinate" value={70} />

                  <div className="flex items-center justify-between">
                    <Typography variant="body1">Quizzes Passed</Typography>
                    <Typography variant="body1">18 / 20</Typography>
                  </div>
                  <LinearProgress variant="determinate" value={90} />
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events Card */}
            <Card className="shadow-md">
              <CardHeader
                title="Upcoming"
                subheader="Your upcoming deadlines and events"
                titleTypographyProps={{ variant: 'h6' }}
                subheaderTypographyProps={{ variant: 'body2' }}
              />
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-white">
                      <CalendarIcon />
                    </div>
                    <div className="grid gap-1">
                      <Typography variant="body1">Final Project Deadline</Typography>
                      <Typography variant="caption" color="text.secondary">Due: June 30, 2023</Typography>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                      <CalendarIcon />
                    </div>
                    <div className="grid gap-1">
                      <Typography variant="body1">Midterm Exam</Typography>
                      <Typography variant="caption" color="text.secondary">Date: May 15, 2023</Typography>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Card */}
            <Card className="shadow-md">
              <CardHeader
                title="Community"
                subheader="Announcements and events"
                titleTypographyProps={{ variant: 'h6' }}
                subheaderTypographyProps={{ variant: 'body2' }}
              />
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white">
                      <MegaphoneIcon />
                    </div>
                    <div className="grid gap-1">
                      <Typography variant="body1">New Course Announcement</Typography>
                      <Typography variant="caption" color="text.secondary">Introduction to React.js</Typography>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                      <AwardIcon />
                    </div>
                    <div className="grid gap-1">
                      <Typography variant="body1">Student of the Month</Typography>
                      <Typography variant="caption" color="text.secondary">Congratulations, John Doe!</Typography>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
