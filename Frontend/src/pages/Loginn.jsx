// src/Sidebar1.js

import React from 'react';
import { Card, CardContent, Button, Box, Typography, Grid } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Link } from 'react-router-dom';
import moment from 'moment';

const tests = [
  {
    id: 1,
    description: 'Sample Test Description 1',
    createdAt: new Date(),
    duration: 1.5,
    questions: new Array(10).fill('Question'),
    _id: '12345',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnyI0pEJ45m-Z4HsH4kPEx3CQS-DKCPpV1PMyqDZcBXrLR1wFMR8H3Fd4Em36Z1RqpZk4&usqp=CAU' // Updated image URL for 100x100 size
  },
  {
    id: 2,
    description: 'Sample Test Description 2',
    createdAt: new Date(),
    duration: 2,
    questions: new Array(5).fill('Question'),
    _id: '67890',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnyI0pEJ45m-Z4HsH4kPEx3CQS-DKCPpV1PMyqDZcBXrLR1wFMR8H3Fd4Em36Z1RqpZk4&usqp=CAU' // Updated image URL for 100x100 size
  },
  // Add more test objects as needed
];

const Sidebar1 = () => {
  return (
    <Grid container spacing={0} className='gap-1'> {/* Set spacing to 0 */}
      {tests.map(test => (
       <Grid item xs={12} sm={6} md={3} key={test.id}>
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
      <img src={test.image} alt={test.description} style={{ width: '100%', height: 'auto', borderRadius: '4px', objectFit: 'cover' }} />
      <Box display="flex" alignItems="center" gap={1} mt={1}>
        <BookIcon sx={{ color: 'primary.main' }} />
        <Typography variant="h7" component="h3" fontWeight="bold">
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
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
            borderRadius: 2,
            padding: '8px 16px', // Added padding for better clickability
          }}>
            Take Test
          </Button>
        </Link>
        
        <Button variant="outlined" sx={{
          textTransform: 'none',
          color: 'primary.main',
          borderColor: 'primary.main',
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

      ))}
    </Grid>
  );
}

export default Sidebar1;
