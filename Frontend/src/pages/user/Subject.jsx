import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Card, CardContent, Button, Box, Typography, Grid, Container } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import QuizIcon from '@mui/icons-material/Quiz';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'; 
import { ADMINENDPOINTS, USERENDPOINTS } from '../../constants/ApiConstants';

const SubjectComponent = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [activeTab, setActiveTab] = useState('');
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

  const renderTestCard = (test) => (
    <Grid item xs={12} sm={6} md={4} key={test.id}>
  <Card sx={{
    width: "340px",
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'scale(1.04)',
      boxShadow: 10,
      bgcolor: 'primary.lighter', // Change background on hover for interaction
      borderColor: 'primary.main'
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 4,
    bgcolor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: 1,
    mx: 'auto', // Center the card
    mb: -1, // Adjust margin to reduce gap
  }}>
    <CardContent>
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnyI0pEJ45m-Z4HsH4kPEx3CQS-DKCPpV1PMyqDZcBXrLR1wFMR8H3Fd4Em36Z1RqpZk4&usqp=CAU" 
        alt={test.description} 
        style={{ width: '100%', height: 'auto', borderRadius: '4px', objectFit: 'cover' }} 
      />
      <Box display="flex" alignItems="center" gap={1} mt={1}>
        <BookIcon sx={{ color: 'primary.main' }} />
        <Typography variant="h6" component="h3" fontWeight="bold">
          {test.description}
        </Typography>
      </Box>
      <Typography variant="body2" color="textSecondary" mt={1}>
        {moment(test.createdAt).format('MMM D, YYYY h:mm A')} - {test.duration} hours, {test.questions.length} questions
      </Typography>
    </CardContent>

    <CardContent sx={{ mt: 'auto' }}>
      <Box display="flex" gap={2} justifyContent="center">
        <Link to={`/start-test?id=${test._id}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" startIcon={<PlayCircleOutlineIcon />} sx={{
            textTransform: 'none',
            bgcolor: '#2463EB',
            '&:hover': { bgcolor: 'primary.dark' },
            borderRadius: 2,
            padding: '8px 16px', // Added padding for better clickability
          }}>
            Take Test
          </Button>
        </Link>
        <Button variant="outlined" sx={{
          textTransform: 'none',
          color: '#2463EB',
          borderColor: '#2463EB',
          '&:hover': { bgcolor: 'primary.light' },
          borderRadius: 2,
          padding: '8px 16px', // Added padding for button size
        }}>
          Show Results
        </Button>
      </Box>
    </CardContent>

    <Typography variant="caption" color="textSecondary" p={2} textAlign="center">
      Register now to secure your spot.
    </Typography>
  </Card>
</Grid>

  );
  

  return (
    <div className="flex flex-1 flex-col min-h-screen">
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <section>
          <Typography variant="h4" component="h2" gutterBottom>
            Test Series - JEE & NEET
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {subjects.map(subject => (
                <Tab
                  key={subject.id}
                  label={subject.name}
                  value={subject.name}
                  icon={<QuizIcon />}
                  iconPosition="start"
                  sx={{ textTransform: 'none' }}
                />
              ))}
            </Tabs>
          </Box>
          {loading && <Typography>Loading tests...</Typography>}
          {error && <Typography color="error">{error}</Typography>}
          {!loading && !error && (
            <>
              {/* Section for non-NEET tests */}
              <Grid container spacing={4} mb={4}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h3" mb={2}>
                    JEE Tests
                  </Typography>
                </Grid>
                {tests.filter(test => test.category !== 'NEET').length > 0 ? (
                  tests.filter(test => test.category !== 'NEET').map(renderTestCard)
                ) : (
                  <Grid item xs={12}>
                    <Typography>No JEE tests available for this subject.</Typography>
                  </Grid>
                )}
              </Grid>
              {/* Section for NEET tests */}
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h3" mb={2}>
                    NEET Tests
                  </Typography>
                </Grid>
                {tests.filter(test => test.category === 'NEET').length > 0 ? (
                  tests.filter(test => test.category === 'NEET').map(renderTestCard)
                ) : (
                  <Grid item xs={12}>
                    <Typography>No NEET tests available for this subject.</Typography>
                  </Grid>
                )}
              </Grid>
            </>
          )}
        </section>
      </Container>
    </div>
  );
};

export default SubjectComponent;
