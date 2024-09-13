import React, { useState } from 'react';
import axios from 'axios';
import { 
  Button, Typography, Box 
} from '@mui/material'; // Retain MUI components for non-table elements

const GoogleDocsQuestionComponent = () => {
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [sortField, setSortField] = useState(null);

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

  // Parse and sort data
  const parseData = (data) => {
    const lines = data.split('\n').filter(line => line.trim() !== '');
    const parsedData = lines.map(line => line.split(',')); // Assuming CSV or comma-separated
    if (parsedData.length > 1 && sortField !== null) {
      // Sorting by the field in the header row
      parsedData.slice(1).sort((a, b) => {
        const fieldIndex = parsedData[0].indexOf(sortField);
        const aValue = a[fieldIndex];
        const bValue = b[fieldIndex];
        return aValue.localeCompare(bValue);
      });
    }
    return parsedData;
  };

  // Handle sort field change
  const handleSortFieldChange = (event) => {
    setSortField(event.target.value);
  };

  // Send data to backend
  const sendDataToBackend = async () => {
    try {
      console.log("tabledata", tableData);
      // Replace with your backend endpoint
      const response = await axios.post('https://your-backend-endpoint.com/api/upload', {
        data: tableData
      });
      console.log('Data successfully sent to backend:', response.data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Upload a CSV/Text File
      </Typography>

      {/* File Upload Input */}
      <Button
        variant="contained"
        component="label"
        sx={{ marginBottom: '20px' }}
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
        sx={{ marginLeft: '10px' }}
      >
        Fetch Data from File
      </Button>

      {/* Sort Field Input */}
      {tableData.length > 0 && (
        <Box sx={{ marginTop: '20px' }}>
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>
            Sort by:
          </Typography>
          <select onChange={handleSortFieldChange} value={sortField} className="p-2 border border-gray-300 rounded-md">
            <option value="">Select Field</option>
            {tableData[0].map((header, index) => (
              <option key={index} value={header}>{header}</option>
            ))}
          </select>
        </Box>
      )}

      {/* Button to send data to backend */}
      {tableData.length > 0 && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={sendDataToBackend}
          sx={{ marginTop: '20px' }}
        >
          Send Data to Backend
        </Button>
      )}

      {/* Display table if data is available */}
      {tableData.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {tableData[0].map((header, index) => (
                  <th 
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex}
                      className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap border-r border-gray-300"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Box>
  );
};

export default GoogleDocsQuestionComponent;
