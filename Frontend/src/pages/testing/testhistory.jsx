import React from 'react';

const TestHistoryPage = () => {
  const testHistoryData = [
    { id: 1, image: 'https://via.placeholder.com/150', score: 85, status: 'pass', dateTaken: '2024-01-01' },
    { id: 2, image: 'https://via.placeholder.com/150', score: 65, status: 'fail', dateTaken: '2024-01-02' },
    { id: 3, image: 'https://via.placeholder.com/150', score: 75, status: 'pass', dateTaken: '2024-01-03' },
    { id: 4, image: 'https://via.placeholder.com/150', score: 90, status: 'pass', dateTaken: '2024-01-04' },
    // Add more test data as needed
  ];

  const handleTakeTestAgain = (id) => {
    console.log(`Retake test ${id}`);
  };

  const handleViewTest = (id) => {
    console.log(`View test ${id}`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-600">Test History</h2>
      {testHistoryData.length === 0 ? (
        <p className="text-center text-gray-500">No test history available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {testHistoryData.map((test) => (
            <div
              key={test.id}
              className="bg-white shadow-lg rounded-lg p-4 transition hover:shadow-2xl w-full sm:w-auto"
            >
              <img src={test.image} alt="Test Thumbnail" className="w-full h-40 object-cover rounded-md mb-3" />
              <div className="mb-2">
                <p className="text-lg font-semibold">Score: {test.score}</p>
                <p className="text-sm text-gray-500">Date Taken: {test.dateTaken}</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    test.status === 'pass' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {test.status === 'pass' ? 'Passed' : 'Failed'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-2 mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full sm:w-auto mb-2 sm:mb-0"
                  onClick={() => handleTakeTestAgain(test.id)}
                >
                  Retake Test
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition w-full sm:w-auto"
                  onClick={() => handleViewTest(test.id)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestHistoryPage;
