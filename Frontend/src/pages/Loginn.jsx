import React, { useState } from 'react';

const Sidebar1 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState(
    Array.from({ length: 10 }, (_, index) => ({ id: index + 1, status: 'Not Answered' }))
  );
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextQuestion = (markForReview = false) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === currentQuestion - 1
          ? { ...q, status: markForReview ? 'Marked' : 'Answered' }
          : q
      )
    );
    if (currentQuestion < questions.length) setCurrentQuestion(currentQuestion + 1);
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index + 1);
  };

  const getQuestionStatusCount = (status) => questions.filter((q) => q.status === status).length;

  return (
    <>
      <div className="min-h-screen flex flex-col lg:ml-24 lg:mr-24 lg:flex-row p-4 mt-28 bg-gray-100">
        {/* Left Section: Question Area */}
        <div className="bg-white shadow-lg p-6 rounded-lg w-full lg:w-3/4 mb-6 lg:mb-0 lg:mr-6">
          {/* Header with Test Name and Timer */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Test: UPSC Prep</h2>
            <span className="text-gray-600">Time Left: 30:00</span>
          </div>

          {/* Question Content */}
          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Question No. {currentQuestion}</h3>
            <p className="text-gray-700 mb-4">
              Select the underlined word or phrase that needs to be changed to make the sentence correct. 
              Some sentences contain no error at all.
            </p>
            <p className="text-blue-600 underline mb-6">
              Passionate about computers, Kevin and Roy decided to become a software engineer and start a 
              company in their hometown.
            </p>

            {/* Answer Options */}
            <div className="space-y-4">
              {["decided to", "Passionate about computers", "a software engineer", "in their hometown"].map((option, index) => (
                <label key={index} className="block cursor-pointer">
                  <input type="radio" name="answer" className="mr-2" /> {option}
                </label>
              ))}
            </div>

            {/* Report a problem */}
            <a href="#" className="text-blue-600 underline block mt-4">Report a problem</a>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition duration-200"
              onClick={() => handleNextQuestion(true)}
            >
              Mark for Review & Next
            </button>
            <div className="space-x-2">
              <button
                className={`bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition duration-200 ${currentQuestion === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 1}
              >
                Previous
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                onClick={() => handleNextQuestion(false)}
              >
                Save & Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Sidebar */}
        <div className="bg-white shadow-lg p-6 rounded-lg w-full max-h-fit lg:w-1/4">
          {/* User Info */}
          <div className="mb-6 flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span>User</span>
          </div>

          {/* Question Status */}
          <div className="mb-6">
            {['Answered', 'Not Answered', 'Marked', 'Marked & Answered'].map((status) => (
              <div className="flex justify-between mb-2" key={status}>
                <span>{status}</span>
                <span>{getQuestionStatusCount(status)}</span>
              </div>
            ))}
          </div>

          {/* Question Navigator */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {questions.map((q, i) => (
              <button
                key={i}
                className={`border border-gray-300 text-gray-700 w-10 h-10 rounded hover:bg-gray-200 transition ${q.status === 'Answered' ? 'bg-green-200' : q.status === 'Marked' ? 'bg-purple-200' : ''}`}
                onClick={() => handleQuestionClick(i)}
                aria-label={`Question ${i + 1} - ${q.status}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition duration-200"
            onClick={handleOpenModal}
          >
            SUBMIT TEST
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" role="dialog" aria-labelledby="modal-title" aria-modal="true">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            {/* Header */}
            <h2 className="text-lg font-semibold mb-4" id="modal-title">Are you sure you want to submit?</h2>
            <p className="text-gray-600 mb-4">
              You still have {getQuestionStatusCount('Not Answered')} questions left.
            </p>

            {/* Status List */}
            <div className="mb-6">
              {['Answered', 'Not Answered', 'Marked', 'Marked & Answered'].map((status) => (
                <div key={status} className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className={`w-6 h-6 ${status === 'Answered' ? 'bg-green-500' : status === 'Not Answered' ? 'bg-red-500' : status === 'Marked' ? 'bg-purple-500' : 'bg-indigo-500'} rounded-full text-white text-center text-xs`}>
                      {status === 'Answered' ? '✓' : status === 'Not Answered' ? '!' : status === 'Marked' ? '★' : '★✓'}
                    </div>
                    <span className="ml-2 text-gray-800">{status}</span>
                  </div>
                  <span className="text-gray-600">{getQuestionStatusCount(status)}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition duration-200"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                onClick={() => {
                  alert('Test Submitted!'); // You can replace this with actual submission logic
                  handleCloseModal(); // Close modal after submission
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar1;
