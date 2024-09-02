import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Card, CardContent, Button } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'; 
import { ADMINENDPOINTS, USERENDPOINTS } from '../../constants/ApiConstants';

const SubjectComponent = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [activeTab, setActiveTab] = useState('physics');
  const [subjects, setSubjects] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch subjects when the component mounts
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(ADMINENDPOINTS.GETSUBJECTS, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSubjects(response.data);
        if (response.data.length > 0) {
          setActiveTab(response.data[0].name); // Set the first subject as the active tab
        }
      } catch (error) {
        setError('Error fetching subjects');
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, [token]);

  // Fetch tests based on the selected subject
  useEffect(() => {
    const fetchTests = async () => {
      if (!activeTab) return; // Prevent fetch if no active tab

      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${USERENDPOINTS.GETTESTS}?subject=${activeTab}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTests(response.data);
      } catch (error) {
        setError('Error fetching tests');
        console.error('Error fetching tests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [activeTab, token]);

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
            {loading && <p>Loading tests...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && tests.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tests.map(test => (
                  <Card key={test.id} className="h-full">
                    <CardContent className="flex flex-col items-start justify-between">
                      <div className="flex items-center gap-2">
                        <BookIcon className="w-6 h-6" />
                        <h3 className="text-lg font-bold">{test.description}</h3>
                      </div>
                      <div className="mt-2 text-muted-foreground text-sm">
                      {moment(test.createdAt).format('MMM D, YYYY h:mm A')}  - {test.duration} hours, {test.questions.length} questions
                      </div>
                      <div className="flex gap-2 mt-4">
                      <Link to={`/start-test?id=${test._id}`}>
  <Button variant="contained" className="px-4 py-2 text-sm">Take Test</Button>
</Link>
                        <Button variant="outlined" className="px-4 py-2 text-sm">Show Results</Button>
                      </div>
                    </CardContent>
                    <div className="text-muted-foreground text-sm">Register now to secure your spot.</div>
                  </Card>
                ))}
              </div>
            ) : (
              <p>No tests available for this subject.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SubjectComponent;
