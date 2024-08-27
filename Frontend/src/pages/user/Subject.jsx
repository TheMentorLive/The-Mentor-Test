import React, { useState } from 'react';
import { Tabs, Tab, Card, CardContent, Button, InputAdornment } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import { Link } from 'react-router-dom';

const SubjectComponent = () => {
  const [activeTab, setActiveTab] = useState('physics');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen">
      <main className="flex-1 py-8 px-4 mx-auto w-full">
        <section className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Test Series - JEE</h2>
          </div>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            className="w-full"
            variant="fullWidth"
          >
            <Tab label="Physics" value="physics" />
            <Tab label="Chemistry" value="chemistry" />
            <Tab label="Biology" value="biology" />
            <Tab label="Full Length" value="full-length" />
          </Tabs>
          <div className="mt-4">
            {activeTab === 'physics' && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="h-full">
                  <CardContent className="flex flex-col items-start justify-between">
                    <div className="flex items-center gap-2">
                      <BookIcon className="w-6 h-6" />
                      <h3 className="text-lg font-bold">Physics Mock Test</h3>
                    </div>
                    <div className="mt-2 text-muted-foreground text-sm">August 22, 2023 - 2 hours, 60 questions</div>
                    <div className="flex gap-2 mt-4">
                        <Link
                        to="/start-test">
                                <Button variant="contained" className="px-4 py-2 text-sm">Take Test</Button>
                        </Link>
                  
                      <Button variant="outlined" className="px-4 py-2 text-sm">Show Results</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            {activeTab === 'chemistry' && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="h-full">
                  <CardContent className="flex flex-col items-start justify-between">
                    <div className="flex items-center gap-2">
                      <BookIcon className="w-6 h-6" />
                      <h3 className="text-lg font-bold">Chemistry Mock Test</h3>
                    </div>
                    <div className="mt-2 text-muted-foreground text-sm">September 5, 2023 - 2 hours, 50 questions</div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="contained" className="px-4 py-2 text-sm">Take Test</Button>
                      <Button variant="outlined" className="px-4 py-2 text-sm">Show Results</Button>
                    </div>
                  </CardContent>
                  <div className="text-muted-foreground text-sm">Register now to secure your spot.</div>
                </Card>
              </div>
            )}
            {activeTab === 'biology' && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="h-full">
                  <CardContent className="flex flex-col items-start justify-between">
                    <div className="flex items-center gap-2">
                      <BookIcon className="w-6 h-6" />
                      <h3 className="text-lg font-bold">Biology Mock Test</h3>
                    </div>
                    <div className="mt-2 text-muted-foreground text-sm">September 19, 2023 - 2 hours, 55 questions</div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="contained" className="px-4 py-2 text-sm">Take Test</Button>
                      <Button variant="outlined" className="px-4 py-2 text-sm">Show Results</Button>
                    </div>
                  </CardContent>
                  <div className="text-muted-foreground text-sm">Register now to secure your spot.</div>
                </Card>
              </div>
            )}
            {activeTab === 'full-length' && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="h-full">
                  <CardContent className="flex flex-col items-start justify-between">
                    <div className="flex items-center gap-2">
                      <BookIcon className="w-6 h-6" />
                      <h3 className="text-lg font-bold">Kinematics Mock Test</h3>
                    </div>
                    <div className="mt-2 text-muted-foreground text-sm">August 29, 2023 - 3 hours, 80 questions</div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="contained" className="px-4 py-2 text-sm">Take Test</Button>
                      <Button variant="outlined" className="px-4 py-2 text-sm">Show Results</Button>
                    </div>
                  </CardContent>
                  <div className="text-muted-foreground text-sm">Register now to secure your spot.</div>
                </Card>
                <Card className="h-full">
                  <CardContent className="flex flex-col items-start justify-between">
                    <div className="flex items-center gap-2">
                      <BookIcon className="w-6 h-6" />
                      <h3 className="text-lg font-bold">Thermodynamics Mock Test</h3>
                    </div>
                    <div className="mt-2 text-muted-foreground text-sm">September 12, 2023 - 3 hours, 75 questions</div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="contained" className="px-4 py-2 text-sm">Take Test</Button>
                      <Button variant="outlined" className="px-4 py-2 text-sm">Show Results</Button>
                    </div>
                  </CardContent>
                  <div className="text-muted-foreground text-sm">Register now to secure your spot.</div>
                </Card>
                <Card className="h-full">
                  <CardContent className="flex flex-col items-start justify-between">
                    <div className="flex items-center gap-2">
                      <BookIcon className="w-6 h-6" />
                      <h3 className="text-lg font-bold">Calculus Mock Test</h3>
                    </div>
                    <div className="mt-2 text-muted-foreground text-sm">September 26, 2023 - 3 hours, 70 questions</div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="contained" className="px-4 py-2 text-sm">Take Test</Button>
                      <Button variant="outlined" className="px-4 py-2 text-sm">Show Results</Button>
                    </div>
                  </CardContent>
                  <div className="text-muted-foreground text-sm">Register now to secure your spot.</div>
                </Card>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SubjectComponent;
