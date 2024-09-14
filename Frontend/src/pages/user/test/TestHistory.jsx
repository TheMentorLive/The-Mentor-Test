import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Container, Box } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import axios from 'axios';
import moment from 'moment';
import { USERENDPOINTS } from '../../../constants/ApiConstants';

const spinnerStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #2563EB;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
`;

const TestHistoryPage = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [testHistory, setTestHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch test history when the component mounts
  useEffect(() => {
    const fetchTestHistory = async () => {
      try {
        const response = await axios.get(USERENDPOINTS.GETTESTHISTORY, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTestHistory(response.data);
      } catch (error) {
        setError('Error fetching test history');
        console.error('Error fetching test history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestHistory();
  }, [token]);

  const convertSecondsToMinSec = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
  };

  const renderTestCard = (test) => (
    <Grid item xs={12} sm={6} md={4} key={test.id}>
      <Card sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
      }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
            <BookIcon sx={{ mr: 1 }} />
            {test.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Completed on {moment(test.createdAt).format('MMM D, YYYY h:mm A')} - TotalDuration: {convertSecondsToMinSec(test.totalDuration)} hours
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
           Competion Time: {convertSecondsToMinSec(test.completionTime)} hours
          </Typography>
          <Typography variant="body2" color="text.primary" mt={1}>
            Score: {test.score}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Test History
        </Typography>
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
          <style>{spinnerStyles}</style>
          <div className="spinner"></div>
          <p className="ml-4 text-blue-500">Loading...</p>
        </div>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={4}>
            {testHistory.length > 0 ? (
              testHistory.map(renderTestCard)
            ) : (
              <Grid item xs={12}>
                <Typography>No test history available.</Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
      {/* <Box sx={{ p: 2, textAlign: 'center', backgroundColor: 'lightgray' }}>
        <Typography variant="body2">© 2024 Test Preparation Platform. All rights reserved.</Typography>
      </Box> */}
    </Box>
  );
};

export default TestHistoryPage;
