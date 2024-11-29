import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
  Tabs,
  Tab,
  MenuItem,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import axios from 'axios';
import { ADMINENDPOINTS } from '../../constants/ApiConstants';

const AddSubject = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [activeTab, setActiveTab] = useState(0); // Track the active tab
  const [subjectName, setSubjectName] = useState('');
  const [description, setDescription] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [examTypeName, setExamTypeName] = useState('');
  const [examTypes, setExamTypes] = useState([]);
  const [selectedExamType, setSelectedExamType] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(ADMINENDPOINTS.GETSUBJECTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(ADMINENDPOINTS.GETCATEGORIES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchExamTypes = async () => {
    try {
      const response = await axios.get(ADMINENDPOINTS.GETEXAMTYPES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExamTypes(response.data);
    } catch (error) {
      console.error('Error fetching exam types:', error);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchCategories();
    fetchExamTypes();
  }, [token]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddSubject = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        ADMINENDPOINTS.ADDSUBJECT,
        { name: subjectName, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201) {
        alert('Subject added successfully!');
        setSubjectName('');
        setDescription('');
        fetchSubjects();
      }
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  const handleAddExamType = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        ADMINENDPOINTS.ADDEXAMTYPE,
        { name: examTypeName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201) {
        alert('Exam type added successfully!');
        setExamTypeName('');
        fetchExamTypes();
      }
    } catch (error) {
      console.error('Error adding exam type:', error);
    }
  };

  const handleAddCategory = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        ADMINENDPOINTS.ADDCATEGORY,
        { name: categoryName, examTypeId: selectedExamType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201) {
        alert('Category added successfully!');
        setCategoryName('');
        fetchCategories();
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'An error occurred while adding the category.';
      alert(errorMessage);
      console.error('Error adding category:', error);
    }
  };

  const handleDelete = async (id, type) => {
    let endpoint;
    switch (type) {
      case 'subject':
        endpoint = `${ADMINENDPOINTS.DELETESUBJECT}/${id}`;
        break;
      case 'category':
        endpoint = `${ADMINENDPOINTS.DELETECATEGORY}/${id}`;
        break;
      case 'examType':
        endpoint = `${ADMINENDPOINTS.DELETEEXAMTYPE}/${id}`;
        break;
      default:
        return;
    }

    try {
      const response = await axios.delete(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        alert(`${type} deleted successfully!`);
        if (type === 'subject') fetchSubjects();
        if (type === 'category') fetchCategories();
        if (type === 'examType') fetchExamTypes();
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" fontSize="16px">Subjects</Typography>
            <form onSubmit={handleAddSubject}>
              <TextField
                fullWidth
                label="Subject Name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                margin="normal"
                required
                size="small"
              />
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={3}
                margin="normal"
                required
                size="small"
              />
              <Button type="submit" variant="contained" color="primary" size="small" sx={{ marginTop: 1 }}>
                Add Subject
              </Button>
            </form>
            <Box sx={{ maxHeight: '300px', overflowY: 'auto', marginTop: '20px', padding: '10px' }}>
              <List>
                {subjects.map((subject) => (
                  <ListItem
                    key={subject._id}
                    sx={{
                      '&:hover': { backgroundColor: '#f0f0f0', cursor: 'pointer' },
                      transition: 'background-color 0.3s',
                      padding: '5px 10px',
                    }}
                  >
                    <ListItemText primary={subject.name} secondary={subject.description} />
                    <IconButton onClick={() => handleDelete(subject._id, 'subject')}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="body1" fontSize="14px">Exam Types</Typography>
                  <form onSubmit={handleAddExamType}>
                    <TextField
                      fullWidth
                      label="Exam Type Name"
                      value={examTypeName}
                      onChange={(e) => setExamTypeName(e.target.value)}
                      margin="normal"
                      required
                      size="small"
                    />
                    <Button type="submit" variant="contained" color="primary" size="small" sx={{ marginTop: 1 }}>
                      Add Exam Type
                    </Button>
                  </form>
                  <Box sx={{backgroundColor: '#f0f0f0', maxHeight: '300px', overflowY: 'auto', marginTop: '20px', padding: '10px' }}>
                    <List>
                      {examTypes.map((examType) => (
                        <ListItem
                          key={examType._id}
                          sx={{
                            '&:hover': { backgroundColor: '#f0f0f0', cursor: 'pointer' },
                            transition: 'background-color 0.3s',
                            padding: '5px 10px',
                          }}
                        >
                          <ListItemText primary={examType.name} />
                          <IconButton onClick={() => handleDelete(examType._id, 'examType')}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="body1" fontSize="14px">Categories</Typography>
                  <form onSubmit={handleAddCategory}>
                    <TextField
                      fullWidth
                      label="Category Name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      margin="normal"
                      required
                      size="small"
                    />
                    <TextField
                      fullWidth
                      select
                      label="Select Exam Type"
                      value={selectedExamType}
                      onChange={(e) => setSelectedExamType(e.target.value)}
                      margin="normal"
                      required
                      size="small"
                    >
                      {examTypes.map((examType) => (
                        <MenuItem key={examType._id} value={examType._id}>
                          {examType.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Button type="submit" variant="contained" color="primary" size="small" sx={{ marginTop: 1 }}>
                      Add Category
                    </Button>
                  </form>
                  <Box sx={{backgroundColor: '#f0f0f0', maxHeight: '300px', overflowY: 'auto', marginTop: '20px', padding: '10px' }}>
                    <List>
                      {categories.map((category) => (
                        <ListItem
                          key={category._id}
                          sx={{
                            '&:hover': { backgroundColor: '#f0f0f9', cursor: 'pointer' },
                            transition: 'background-color 0.3s',
                            padding: '5px 10px',
                          }}
                        >
                          <ListItemText primary={category.name} />
                          <IconButton onClick={() => handleDelete(category._id, 'category')}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ padding: '10px' }}>
      <Tabs value={activeTab} onChange={handleTabChange} aria-label="Tabs" textColor="primary" indicatorColor="primary">
        <Tab label="Subjects" />
        <Tab label="Exam Types & Categories" />
      </Tabs>
      <Box sx={{ marginTop: 2 }}>{renderTabContent()}</Box>
    </Box>
  );
};

export default AddSubject;
