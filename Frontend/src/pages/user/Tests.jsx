import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Container,
  TextField,
  List,
  ListItem,
  ListItemText,
  Collapse,
  FormControlLabel,
  Checkbox,
  Divider,
  CircularProgress,
} from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SubjectIcon from '@mui/icons-material/Subject';
import moment from 'moment';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ADMINENDPOINTS, USERENDPOINTS } from '../../constants/ApiConstants';

const TestComponent = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [subjects, setSubjects] = useState([]);
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeSubject, setActiveSubject] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilters, setCategoryFilters] = useState({ NEET: false, JEE: false });
  const [difficultyFilters, setDifficultyFilters] = useState({ Easy: false, Medium: false, Hard: false });
  const [openCategory, setOpenCategory] = useState(false);
  const [openDifficulty, setOpenDifficulty] = useState(false);
  const [openSubjects, setOpenSubjects] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(ADMINENDPOINTS.GETSUBJECTS, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubjects(response.data);
        if (response.data.length > 0) {
          setActiveSubject(response.data[0].name); // Set the first subject as the active subject
        }
      } catch (error) {
        setError('Error fetching subjects');
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, [token]);

  useEffect(() => {
    const fetchTests = async () => {
      if (!activeSubject) return; // Prevent fetch if no active subject

      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${USERENDPOINTS.GETTESTS}?subject=${activeSubject}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTests(response.data);
        setFilteredTests(response.data); // Set filtered tests initially
      } catch (error) {
        setError('Error fetching tests');
        console.error('Error fetching tests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [activeSubject, token]);

  useEffect(() => {
    const filterTests = () => {
      let updatedTests = tests;

      // Filter by search term
      if (searchTerm) {
        const lowercasedTerm = searchTerm.toLowerCase();
        updatedTests = updatedTests.filter((test) =>
          test.description.toLowerCase().includes(lowercasedTerm)
        );
      }

      // Filter by categories
      if (categoryFilters.NEET) {
        updatedTests = updatedTests.filter((test) => test.category === 'NEET');
      }
      if (categoryFilters.JEE) {
        updatedTests = updatedTests.filter((test) => test.category === 'JEE');
      }

      // Filter by difficulty level
      if (difficultyFilters.Easy) {
        updatedTests = updatedTests.filter((test) => test.difficulty === 'easy');
      }
      if (difficultyFilters.Medium) {
        updatedTests = updatedTests.filter((test) => test.difficulty === 'Medium');
      }
      if (difficultyFilters.Hard) {
        updatedTests = updatedTests.filter((test) => test.difficulty === 'Hard');
      }

      setFilteredTests(updatedTests);
    };

    filterTests();
  }, [searchTerm, categoryFilters, difficultyFilters, tests]);

  const handleSubjectChange = (subject) => {
    setActiveSubject(subject);
  };

  const handleCategoryToggle = (category) => {
    setCategoryFilters((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleDifficultyToggle = (difficulty) => {
    setDifficultyFilters((prev) => ({ ...prev, [difficulty]: !prev[difficulty] }));
  };

  const renderTestCard = (test) => (
    <Grid item xs={12} sm={6} md={4} key={test.id}>
      <Card
        sx={{
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: 3,
          },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: 1,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: 1,
          mb: 1.5,
          padding: 1,
        }}
      >
        <CardContent>
          <img
            src="https://img.freepik.com/premium-vector/test-icon-illustration_430232-32.jpg"
            alt={test.description}
            style={{ width: '100%', height: '120px', borderRadius: '2px', objectFit: 'cover' }}
          />
          <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
            <BookIcon sx={{ color: 'primary.main', fontSize: '18px' }} />
            <Typography variant="body2" component="h3" fontWeight="bold" noWrap>
              {test.description}
            </Typography>
          </Box>
          <Typography variant="caption" color="textSecondary" mt={0.5}>
            {moment(test.createdAt).format('MMM D, YYYY h:mm A')} - {test.duration} hrs, {test.questions.length} Qs
          </Typography>
        </CardContent>

        <CardContent sx={{ mt: 'auto' }}>
          <Box display="flex" gap={1} justifyContent="center">
            <Link to={`/start-test?id=${test._id}`} style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                startIcon={<PlayCircleOutlineIcon sx={{ fontSize: 18 }} />}
                sx={{
                  textTransform: 'none',
                  bgcolor: '#2463EB',
                  '&:hover': { bgcolor: 'primary.dark' },
                  borderRadius: 2,
                  padding: '4px 8px',
                  fontSize: '14px',
                }}
              >
                Take Test
              </Button>
            </Link>
            <Button
              variant="outlined"
              sx={{
                textTransform: 'none',
                color: '#2463EB',
                borderColor: '#2463EB',
                '&:hover': { bgcolor: 'primary.light' },
                borderRadius: 2,
                padding: '4px 8px',
                fontSize: '14px',
              }}
            >
              Show Results
            </Button>
          </Box>
        </CardContent>

        <Typography variant="caption" color="textSecondary" p={1} textAlign="center">
          Register now to secure your spot.
        </Typography>
      </Card>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" fontWeight="bold" sx={{ color: 'primary.main' }}>
          Ready to Test Your Knowledge?
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mt: 2,fontSize: '14px' }}>
          Explore a variety of subjects, categories, and difficulty levels to find the perfect test for you.
        </Typography>
      </Box>

      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, padding: 2 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Filters
            </Typography>
            <TextField
              label="Search Tests"
              variant="outlined"
              fullWidth
              margin="normal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
            />
            <Divider sx={{ my: 1 }} />
            
            {/* Subject Filter */}
            <Typography variant="body2" onClick={() => setOpenSubjects(!openSubjects)} sx={{ cursor: 'pointer' }}>
              Subjects {openSubjects ? <ExpandLess /> : <ExpandMore />}
            </Typography>
            <Collapse in={openSubjects}>
              <List>
                {subjects.map((subject) => (
                  <ListItem key={subject.id} button onClick={() => handleSubjectChange(subject.name)}>
                    <ListItemText primary={subject.name} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
            <Divider sx={{ my: 1 }} />
            
            {/* Categories Filter */}
            <Typography variant="body2" onClick={() => setOpenCategory(!openCategory)} sx={{ cursor: 'pointer' }}>
              Categories {openCategory ? <ExpandLess /> : <ExpandMore />}
            </Typography>
            <Collapse in={openCategory}>
              <List>
                <ListItem>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={categoryFilters.NEET}
                        onChange={() => handleCategoryToggle('NEET')}
                        size="small"
                      />
                    }
                    label="NEET"
                  />
                </ListItem>
                <ListItem>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={categoryFilters.JEE}
                        onChange={() => handleCategoryToggle('JEE')}
                        size="small"
                      />
                    }
                    label="JEE"
                  />
                </ListItem>
              </List>
            </Collapse>
            <Divider sx={{ my: 1 }} />

            {/* Difficulty Filter */}
            <Typography variant="body2" onClick={() => setOpenDifficulty(!openDifficulty)} sx={{ cursor: 'pointer' }}>
              Difficulty Level {openDifficulty ? <ExpandLess /> : <ExpandMore />}
            </Typography>
            <Collapse in={openDifficulty}>
              <List>
                <ListItem>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={difficultyFilters.Easy}
                        onChange={() => handleDifficultyToggle('Easy')}
                        size="small"
                      />
                    }
                    label="Easy"
                  />
                </ListItem>
                <ListItem>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={difficultyFilters.Medium}
                        onChange={() => handleDifficultyToggle('Medium')}
                        size="small"
                      />
                    }
                    label="Medium"
                  />
                </ListItem>
                <ListItem>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={difficultyFilters.Hard}
                        onChange={() => handleDifficultyToggle('Hard')}
                        size="small"
                      />
                    }
                    label="Hard"
                  />
                </ListItem>
              </List>
            </Collapse>
          </Box>
        </Grid>

        <Grid item xs={12} md={9}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress size={24} />
            </Box>
          ) : error ? (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          ) : (
            <Box>
              {/* Selected Subject Text */}
              {activeSubject && (
                <Typography variant="body2" sx={{ mb: 1, textAlign: 'center' }}>
                  <SubjectIcon fontSize="small" sx={{ verticalAlign: 'middle', marginRight: 0.5 }} />
                  Showing tests for: <strong>{activeSubject}</strong>
                </Typography>
              )}
              <Grid container spacing={1}>
                {filteredTests.length > 0 ? (
                  filteredTests.map(renderTestCard)
                ) : (
                  <Typography variant="body2" sx={{ textAlign: 'center', width: '100%' }}>
                    No tests available. Expand your filters to see more.
                  </Typography>
                )}
              </Grid>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default TestComponent;
