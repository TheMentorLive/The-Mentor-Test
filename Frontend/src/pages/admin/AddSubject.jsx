import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import axios from 'axios';
import { ADMINENDPOINTS } from '../../constants/ApiConstants';

const AddSubject = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [subjectName, setSubjectName] = useState('');
  const [description, setDescription] = useState('');
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = async () => {
    try {
     
      const response = await axios.get(ADMINENDPOINTS.GETSUBJECTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        ADMINENDPOINTS.ADDSUBJECT,
        {
          name: subjectName,
          description: description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        alert('Subject added successfully!');
        setSubjectName('');
        setDescription('');
        fetchSubjects(); // Fetch the updated list after adding
      } else {
        alert('Error adding subject. Please try again.');
      }
    } catch (error) {
      console.error('Error adding subject:', error);

      if (error.response) {
        alert(`Error adding subject: ${error.response.data.message}`);
      } else {
        alert('Error adding subject. Please try again.');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${ADMINENDPOINTS.DELETESUBJECT}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        alert('Subject deleted successfully!');
        fetchSubjects(); // Fetch the updated list after deleting
      } else {
        alert('Error deleting subject. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting subject:', error);

      if (error.response) {
        alert(`Error deleting subject: ${error.response.data.message}`);
      } else {
        alert('Error deleting subject. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="md" className='bg-white'>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Subject
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Subject Name"
                variant="outlined"
                margin="normal"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Add Subject
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h2" gutterBottom>
              Subject List
            </Typography>
            <Paper elevation={3} sx={{ padding: 2, maxHeight: '400px', overflow: 'auto' }}>
              <List>
                {subjects.map((subject) => (
                  <ListItem key={subject._id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ListItemText
                      primary={subject.name}
                      secondary={subject.description}
                    />
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(subject._id)}>
                      <Delete />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddSubject;
