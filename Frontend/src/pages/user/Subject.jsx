import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Card, CardContent, Button } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ADMINENDPOINTS,USERENDPOINTS } from '../../constants/ApiConstants';

const SubjectComponent = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [activeTab, setActiveTab] = useState('physics');
  const [subjects, setSubjects] = useState([]);
  const [tests, setTests] = useState([]);
  
  // Fetch subjects when the component mounts
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(ADMINENDPOINTS.GETSUBJECTS, { // Update with your endpoint
          headers: { Authorization: `Bearer ${token}` }
        });
        setSubjects(response.data);
        if (response.data.length > 0) {
          setActiveTab(response.data[0].name); // Set the first subject as the active tab
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);

  // Fetch tests based on the selected subject
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(USERENDPOINTS.GET`?subject=${activeTab}`, { // Update with your endpoint
          headers: { Authorization: `Bearer ${token}` }
        });
        setTests(response.data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();
  }, [activeTab]);

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
            {subjects.map(subject => (
              <Tab key={subject.id} label={subject.name} value={subject.name} />
            ))}
          </Tabs>
          <div className="mt-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tests.map(test => (
                <Card key={test.id} className="h-full">
                  <CardContent className="flex flex-col items-start justify-between">
                    <div className="flex items-center gap-2">
                      <BookIcon className="w-6 h-6" />
                      <h3 className="text-lg font-bold">{test.title}</h3>
                    </div>
                    <div className="mt-2 text-muted-foreground text-sm">{test.date} - {test.duration} hours, {test.questions} questions</div>
                    <div className="flex gap-2 mt-4">
                      <Link to={`/start-test/${test.id}`}>
                        <Button variant="contained" className="px-4 py-2 text-sm">Take Test</Button>
                      </Link>
                      <Button variant="outlined" className="px-4 py-2 text-sm">Show Results</Button>
                    </div>
                  </CardContent>
                  <div className="text-muted-foreground text-sm">Register now to secure your spot.</div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SubjectComponent;
