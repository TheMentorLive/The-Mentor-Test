import React from 'react';
import { Card, CardContent, Button, Typography, Grid, Container, Box } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import moment from 'moment';

const demoTests = [
  {
    id: 1,
    description: 'Physics - Mechanics Test',
    category: 'JEE',
    createdAt: '2024-09-05T10:00:00Z',
    duration: 2,
    questions: [1, 2, 3]
  },
  {
    id: 2,
    description: 'Chemistry - Organic Chemistry Test',
    category: 'NEET',
    createdAt: '2024-09-10T14:00:00Z',
    duration: 1.5,
    questions: [1, 2]
  },
  {
    id: 3,
    description: 'Mathematics - Algebra Test',
    category: 'JEE',
    createdAt: '2024-09-15T09:00:00Z',
    duration: 3,
    questions: [1, 2, 3, 4]
  }
];

const UpcomingTestsPage = () => {
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
            {moment(test.createdAt).format('MMM D, YYYY h:mm A')} - {test.duration} hours, {test.questions.length} questions
          </Typography>
        </CardContent>
        <CardContent>
          <Button variant="contained" startIcon={<PlayCircleOutlineIcon />} sx={{ textTransform: 'none' }}>
            Take Test
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Upcoming Tests
        </Typography>
        <Typography variant="body1" paragraph>
          Stay ahead in your preparation by taking these upcoming tests. Our platform provides a range of tests for JEE and NEET to help you assess and improve your knowledge. Each test is designed to challenge your understanding and ensure you are well-prepared for the real exams.
        </Typography>
        <Typography variant="body1" paragraph>
          Browse through the upcoming tests listed below. Click on "Take Test" to start practicing and make the most of your study time. Remember to check the date and duration of each test to plan your study schedule effectively.
        </Typography>
        <Grid container spacing={4}>
          {demoTests.length > 0 ? (
            demoTests.map(renderTestCard)
          ) : (
            <Grid item xs={12}>
              <Typography>No upcoming tests available.</Typography>
            </Grid>
          )}
        </Grid>
      </Container>
      {/* <Box sx={{ p: 2, textAlign: 'center', backgroundColor: 'lightgray' }}>
        <Typography variant="body2">© 2024 Test Preparation Platform. All rights reserved.</Typography>
      </Box> */}
    </Box>
  );
};

export default UpcomingTestsPage;
