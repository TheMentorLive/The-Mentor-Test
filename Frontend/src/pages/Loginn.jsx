import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  CircularProgress,
  Alert
} from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import QuizIcon from '@mui/icons-material/Quiz';
import moment from 'moment';

const Sidebar = () => {
  const subjects = [{ id: 1, name: 'Physics' }, { id: 2, name: 'Chemistry' }]; // Dummy subjects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tests, setTests] = useState([]);
  const [activeTab, setActiveTab] = useState(subjects[0]?.name || '');

  useEffect(() => {
    const fetchData = async () => {
      // Simulating fetching data
      try {
        setLoading(true);
        // Simulated test data
        const response = [
          { id: 1, description: 'Test 1', createdAt: new Date(), duration: 2, questions: [], category: 'JEE', image: '' },
          { id: 2, description: 'Test 2', createdAt: new Date(), duration: 3, questions: [], category: 'NEET', image: '' },
        ];
        setTests(response);
      } catch (error) {
        setError('Error fetching tests!');
        console.error('Error fetching tests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderTestCard = (test) => (
    <Grid item xs={12} sm={6} md={4} key={test.id}>
      <Card sx={{
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 10,
          bgcolor: 'primary.lighter',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 8,
        bgcolor: 'background.paper',
        boxShadow: 2,
        mx: 'auto',
        mb: 2,
      }}>
        <CardContent>
          <img
            src={test.image || 'https://via.placeholder.com/340'}
            alt={test.description}
            style={{ width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
          />
          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <BookIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h5" component="h3" fontWeight="bold">
              {test.description}
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary" mt={1}>
            {moment(test.createdAt).format('MMM D, YYYY h:mm A')} - {test.duration} hours, {test.questions.length} questions
          </Typography>
        </CardContent>
        <Box display="flex" gap={2} justifyContent="center" sx={{ p: 2 }}>
          <Button variant="contained" startIcon={<PlayCircleOutlineIcon />} sx={{
            bgcolor: '#2463EB',
            '&:hover': { bgcolor: 'primary.dark' },
            borderRadius: '20px',
            padding: '10px 20px',
          }}>
           Buy Now
          </Button>
          <Button variant="outlined" sx={{
            color: '#2463EB',
            borderColor: '#2463EB',
            '&:hover': { bgcolor: 'primary.light' },
            borderRadius: '20px',
            padding: '10px 20px',
          }}>
            Show Results
          </Button>
        </Box>
      </Card>
    </Grid>
  );

  return (
    <div className="flex flex-1 flex-col min-h-screen">
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <section>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center">
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
          
          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error}</Alert>}
          {!loading && !error && tests.length === 0 && (
            <Typography>No tests available for this subject.</Typography>
          )}

          {!loading && !error && (
            <>
              <Grid container spacing={4} mb={4}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h3" mb={2}>
                    JEE Tests
                  </Typography>
                </Grid>
                {tests.filter(test => test.category !== 'NEET').length > 0 ?
                  tests.filter(test => test.category !== 'NEET').map(renderTestCard) : (
                    <Grid item xs={12}>
                      <Typography>No JEE tests available for this subject.</Typography>
                    </Grid>
                )}
              </Grid>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h3" mb={2}>
                    NEET Tests
                  </Typography>
                </Grid>
                {tests.filter(test => test.category === 'NEET').length > 0 ?
                  tests.filter(test => test.category === 'NEET').map(renderTestCard) : (
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

export default Sidebar;
