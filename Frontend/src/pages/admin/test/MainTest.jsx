import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Modal, Box, TextField, Button, FormControlLabel, Switch, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ADMINENDPOINTS } from '../../../constants/ApiConstants';
import axios from 'axios';
import { toast } from 'react-toastify';  // Import react-toastify
import Swal from 'sweetalert2';

const MainTestPage = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [mainTests, setMainTests] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [filteredTests, setFilteredTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [editForm, setEditForm] = useState({ description: '', category: '', testType: '', duration: '', paymentAccess: false });
  const [testDetails, setTestDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch tests
  const fetchMainTests = async () => {
    try {
      const response = await axios.get(ADMINENDPOINTS.GETMAINTEST, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        const testData = response.data;
        setMainTests(testData);
        const subjectsSet = [...new Set(testData.map((test) => test.subject))];
        setSubjects(subjectsSet);
        setFilteredTests(testData);
        toast.success('Main tests fetched successfully!');
      }
    } catch (error) {
      console.error('Error fetching main tests:', error);
      setErrorMessage('Error fetching main tests, please try again.');
    }
  };

  useEffect(() => {
    fetchMainTests();
  }, [token]);


const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    try {
      const response = await axios.delete(`${ADMINENDPOINTS.DELETEMOCKTEST}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        toast.success('Test deleted successfully!');
        fetchMainTests();  // Fetch updated tests after deletion
      }
    } catch (error) {
      console.error('Error deleting test:', error);
      setErrorMessage('Error deleting test, please try again.');
    }
  }
};


  const handleEditClick = (test) => {
    setSelectedTest(test);
    setEditForm({
      description: test.description,
      category: test.category,
      testType: test.testType,
      duration: test.duration,
      paymentAccess: test.paymentAccess || false,
    });
    setOpenEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(`${ADMINENDPOINTS.EDITMOCKTEST}/${selectedTest._id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setOpenEditModal(false);
        toast.success('Test updated successfully!');
        fetchMainTests();  // Fetch updated tests after editing
      }
    } catch (error) {
      console.error('Error updating test:', error);
      setErrorMessage('Error updating test, please try again.');
    }
  };

  const handleViewClick = async (testId) => {
    try {
      const response = await axios.get(`${ADMINENDPOINTS.GETMOCKTESTDETAILS}/${testId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setTestDetails(response.data);
        setOpenViewModal(true);
        toast.success('Test details fetched successfully!');
      }
    } catch (error) {
      console.error('Error fetching test details:', error);
      setErrorMessage('Error fetching test details, please try again.');
    }
  };

  const handleInputChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (event) => {
    const subject = event.target.value;
    setSelectedSubject(subject);

    if (subject) {
      setFilteredTests(mainTests.filter((test) => test.subject === subject));
    } else {
      setFilteredTests(mainTests);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Main Tests
      </Typography>

      {/* Error Message */}
      {errorMessage && (
        <Typography variant="body2" color="error" gutterBottom>
          {errorMessage}
        </Typography>
      )}

      {/* Filter by subject */}
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel>Filter by Subject</InputLabel>
        <Select value={selectedSubject} onChange={handleSubjectChange} label="Filter by Subject">
          <MenuItem value="">All Subjects</MenuItem>
          {subjects.map((subject) => (
            <MenuItem key={subject} value={subject}>
              {subject}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Display tests in a table format */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Test Type</TableCell>
              <TableCell>Duration (minutes)</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Created At</TableCell> {/* New column for Created At */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>{test.description}</TableCell>
                <TableCell>{test.category}</TableCell>
                <TableCell>{test.testType}</TableCell>
                <TableCell>{test.duration}</TableCell>
                <TableCell>{test.subject}</TableCell>
                <TableCell>{new Date(test.createdAt).toLocaleDateString()}</TableCell> {/* Display Created At */}
                <TableCell>
                  <IconButton color="primary" onClick={() => handleViewClick(test._id)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleEditClick(test)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(test._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: '8px',
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Main Test
          </Typography>

          <TextField
            label="Description"
            name="description"
            value={editForm.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            value={editForm.category}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Test Type"
            name="testType"
            value={editForm.testType}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Duration (minutes)"
            name="duration"
            type="number"
            value={editForm.duration}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <FormControlLabel
            control={
              <Switch
                checked={editForm.paymentAccess}
                onChange={(e) => setEditForm({ ...editForm, paymentAccess: e.target.checked })}
                name="paymentAccess"
              />
            }
            label="Payment Access"
          />

          <Button variant="contained" color="primary" onClick={handleEditSubmit} style={{ marginTop: '16px' }}>
            Save
          </Button>
       
          </Box>
      </Modal>

      {/* View Modal */}
      <Modal open={openViewModal} onClose={() => setOpenViewModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            maxHeight: '80vh',
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: '8px',
            boxShadow: 24,
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Main Test Details
          </Typography>

          {testDetails && (
            <>
              <Typography variant="body1">
                <strong>Description:</strong> {testDetails.description}
              </Typography>
              <Typography variant="body1">
                <strong>Category:</strong> {testDetails.category}
              </Typography>
              <Typography variant="body1">
                <strong>Test Type:</strong> {testDetails.testType}
              </Typography>
              <Typography variant="body1">
                <strong>Duration:</strong> {testDetails.duration} minutes
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Questions:</strong>
              </Typography>
              <ul>
                {testDetails.questions.map((question, index) => (
                  <li key={index}>
                    <strong>Q{index + 1}:</strong> {question.text}
                    <ul>
                      {question.answers.map((answer, i) => (
                        <li key={i}>{answer}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default MainTestPage;
