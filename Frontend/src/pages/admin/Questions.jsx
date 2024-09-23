import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, Box, Paper, Divider } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ADMINENDPOINTS } from '../../constants/ApiConstants';

const GoogleDocsQuestionComponent = () => {
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

  // Fetch data from uploaded file
  const fetchFileData = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const parsedData = parseData(data);
      setTableData(parsedData);
    };
    if (file) {
      reader.readAsText(file);
    }
  };

  // Parse data
  const parseData = (data) => {
    const lines = data.split('\n').filter(line => line.trim() !== '');
    const parsedData = lines.map(line => line.split(','));
    return parsedData;
  };

  // Handle drag end for reordering questions
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(tableData);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    setTableData(reorderedItems);
  };

  // Download CSV template
  const downloadCSVTemplate = () => {
    const csvContent = "number,subject,category,description,duration,testType,level,text,answers,correctAnswer\n1,sample subject,category,description,duration,mock/main,difficulty level,Sample Question,Answer1|Answer2|Answer3,1";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'template.csv';
    link.click();
  };

  // Save test data to database
  const saveTestDataToDatabase = async () => {
    try {
      const response = await axios.post(`${ADMINENDPOINTS.ADDCSVTEST}`, {
        questions: tableData // Send the reordered tableData to backend
      });
      console.log('Test data successfully saved:', response.data);
      alert('Test data saved successfully');
    } catch (error) {
      console.error('Error saving test data:', error);
      alert('Error saving test data');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-12 p-4">
      <h1 className="mb-8 text-3xl font-bold">Upload a CSV/Text File</h1>
      <div className="flex gap-4 mb-8">
        <Button
          variant="contained"
          component="label"
          sx={{ minWidth: '150px' }}
        >
          Upload File
          <input
            type="file"
            hidden
            accept=".csv,.txt"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={fetchFileData}
          disabled={!file}
          sx={{ minWidth: '150px' }}
        >
          Fetch Data from File
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={downloadCSVTemplate}
          sx={{ minWidth: '150px' }}
        >
          Download CSV Template
        </Button>
      </div>

      {/* Usage Instructions */}
      <div className="w-full max-w-4xl bg-white shadow rounded-lg p-6">
        <h2 className="mb-4 text-xl font-bold">How to Use</h2>
        <ol className="space-y-2 list-decimal list-inside">
          <li>Download the CSV template by clicking the "Download CSV Template" button.</li>
          <li>Fill in your data in the downloaded CSV file following the template format.</li>
          <li>Upload the completed CSV file using the "Upload File" button.</li>
          <li>Click "Fetch Data from File" to load the data into the table.</li>
          <li>Reorder the rows by dragging and dropping them.</li>
          <li>Click "Save Test Data to Database" to save the data to the database.</li>
        </ol>
      </div>

      {/* Display table with drag-and-drop if data is available */}
      {tableData.length > 0 && (
        <Box sx={{ marginTop: '20px', display: 'flex', overflowX: 'auto', maxHeight: '500px', overflowY: 'auto' }}>
          <Box sx={{ flex: 2, minWidth: '600px' }}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="questions">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="w-full">
                    <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                      <div className="table-header">
                        <div className="grid grid-cols-4 gap-1 border-b-2 border-gray-300 p-1 bg-gray-200 text-sm font-medium">
                          <div className="text-center border border-gray-300 p-1 sticky top-0 bg-gray-200">Number</div>
                          <div className="text-center border border-gray-300 p-1 sticky top-0 bg-gray-200">Text</div>
                          <div className="text-center border border-gray-300 p-1 sticky top-0 bg-gray-200">Answers</div>
                          <div className="text-center border border-gray-300 p-1 sticky top-0 bg-gray-200">Correct Answer</div>
                        </div>
                      </div>
                      <div className="table-body">
                        {tableData.slice(1).map((row, rowIndex) => (
                          <Draggable key={rowIndex} draggableId={`row-${rowIndex}`} index={rowIndex}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="grid grid-cols-4 gap-1 border-b border-gray-300 p-1 text-sm hover:bg-gray-50 cursor-pointer"
                                onMouseEnter={() => setHoveredRow(row)}
                                onMouseLeave={() => setHoveredRow(null)}
                              >
                                <div className="text-center border border-gray-300 p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                  {row[0]}
                                </div>
                                <div className="text-center border border-gray-300 p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                  {row[7]} {/* Assuming 'text' is the 8th field */}
                                </div>
                                <div className="text-center border border-gray-300 p-1 overflow-x-auto whitespace-nowrap">
                                  {row[8]} {/* Assuming 'answers' is the 9th field */}
                                </div>
                                <div className="text-center border border-gray-300 p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                  {row[9]} {/* Assuming 'correctAnswer' is the 10th field */}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Box>

          {/* Detailed View */}
          <Box
            sx={{
              flex: 1,
              marginLeft: '20px',
              position: 'sticky',
              top: '20px',
              maxHeight: '500px',
              overflowY: 'auto',
            }}
          >
            {hoveredRow && (
              <Paper elevation={3} sx={{ padding: '20px' }}>
                <Typography variant="h6" gutterBottom>
                  Details
                </Typography>
                <Divider sx={{ marginBottom: '10px' }} />
                <Typography variant="body2">
                  <strong>Number:</strong> {hoveredRow[0]}
                </Typography>
                <Typography variant="body2">
                  <strong>Subject:</strong> {hoveredRow[1]}
                </Typography>
                <Typography variant="body2">
                  <strong>Category:</strong> {hoveredRow[2]}
                </Typography>
                <Typography variant="body2">
                  <strong>Description:</strong> {hoveredRow[3]}
                </Typography>
                <Typography variant="body2">
                  <strong>Duration:</strong> {hoveredRow[4]}
                </Typography>
                <Typography variant="body2">
                  <strong>Test Type:</strong> {hoveredRow[5]}
                </Typography>
                <Typography variant="body2">
                  <strong>Level:</strong> {hoveredRow[6]}
                </Typography>
                <Typography variant="body2">
                  <strong>Text:</strong> {hoveredRow[7]}
                </Typography>
                <Typography variant="body2">
                  <strong>Answers:</strong> {hoveredRow[8]}
                </Typography>
                <Typography variant="body2">
                  <strong>Correct Answer:</strong> {hoveredRow[9]}
                </Typography>
              </Paper>
            )}
          </Box>
        </Box>
      )}

      {/* Save Button */}
      <Button
        variant="contained"
        color="success"
        onClick={saveTestDataToDatabase}
        sx={{ marginTop: '20px' }}
      >
        Save Test Data to Database
      </Button>
    </div>
  );
};

export default GoogleDocsQuestionComponent;
