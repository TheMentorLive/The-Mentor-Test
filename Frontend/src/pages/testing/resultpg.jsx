import React, { useState, useEffect } from 'react';
import { Button, Typography, Paper, Divider, CircularProgress } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultsPg = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [testResults, setTestResults] = useState(null);
    const [testDetails, setTestDetails] = useState({ questions: [] });
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const testId = queryParams.get('id');

    useEffect(() => {
        // Replace API call with dummy data
        const dummyTestResults = {
            status: 'Passed',
            totalDuration: 5400,
            score: 85,
            rank: 5,
            completionTime: 1200,
            attempts: 1,
            accuracy: 90,
            totalCorrect: 18,
            answers: [0, 1, 2],
        };

        const dummyTestDetails = {
            questions: [
                { _id: 'q1', text: 'What is React?', answers: ['A library', 'A framework', 'A language'], correctAnswer: 0 },
                { _id: 'q2', text: 'What is JSX?', answers: ['JavaScript XML', 'JSON XML', 'JavaScript'], correctAnswer: 0 },
                { _id: 'q3', text: 'What is useState?', answers: ['A hook', 'A component', 'A prop'], correctAnswer: 0 },
            ],
        };

        setTimeout(() => {
            setTestResults(dummyTestResults);
            setTestDetails(dummyTestDetails);
            setLoading(false);
        }, 1000);
    }, [testId]);

    const handleShowDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleRetakeTest = () => {
        navigate(`/test?id=${testId}`);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <div className="flex flex-col w-full max-w-5xl bg-white rounded-lg shadow-lg p-8 mt-24 space-y-6">

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center">
                        <CircularProgress color="primary" />
                    </div>
                )}

                {!showDetails && !loading && (
                    <div className="flex flex-col md:flex-row space-y-6 p-12  md:space-y-0">
                        <div className="md:w-1/2 p-6 flex flex-col items-center space-y-6">
                            <img
                                src="/The-mentor-logo.png"
                                alt="GenAi Learning"
                                className="h-16 w-auto mx-auto"
                            />
                            <Paper className="bg-blue-800 text-white p-6 rounded-lg shadow-md mx-auto text-center space-y-4">
                                <Typography variant="h5" className="font-semibold">
                                    {testResults?.status === 'Passed' ? 'Congratulations!' : 'Better Luck Next Time!'}
                                </Typography>
                                <Typography variant="body1">
                                    You have completed the test.
                                </Typography>
                            </Paper>
                            <div className="flex space-x-4 justify-center">
                                <Button variant="contained" color="primary" onClick={() => { }} size="small">
                                    Give Feedback
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    onClick={handleShowDetails}
                                >
                                    {showDetails ? 'Hide Details' : 'Show Results'}
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    onClick={handleRetakeTest}
                                >
                                    Retake Test
                                </Button>
                            </div>
                        </div>

                        <div className="md:w-1/2 p-6 space-y-6">
                            <Typography variant="h5" className="font-semibold text-center">
                                Test Results
                            </Typography>
                            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center text-center gap-4">
                                {[
                                    { label: 'Test Duration', value: testResults?.totalDuration ? `${Math.floor(testResults.totalDuration / 60)} mins` : 'N/A' },
                                    { label: 'No. of Questions', value: testDetails?.questions.length || 'N/A' },
                                    { label: 'Score', value: `${testResults?.score || 'N/A'}`, valueClass: 'bg-green-100 text-green-800' },
                                    { label: 'Rank', value: `${testResults?.rank || 'N/A'}`, valueClass: 'bg-yellow-100 text-yellow-800' },
                                    { label: 'Completion Time', value: testResults?.completionTime ? (testResults.completionTime >= 60 ? `${Math.floor(testResults.completionTime / 60)} mins` : `${testResults.completionTime} sec`) : 'N/A', valueClass: 'bg-blue-100 text-blue-800' },
                                    { label: 'Attempts', value: testResults?.attempts || 'N/A' },
                                ].map(({ label, value, valueClass }, index) => (
                                    <div key={index} className="flex flex-col">
                                        <Typography variant="body2" className="text-sm text-gray-500">{label}</Typography>
                                        <Typography variant="body1" className={`font-medium p-2 rounded ${valueClass || 'bg-gray-200'}`}>
                                            {value}
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Detailed Results Section */}
                {showDetails && !loading && (
                    <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
                        <div className="flex justify-between items-center mb-4">
                            <Typography variant="h3" className="font-semibold">Detailed Results</Typography>
                            <Button variant="outlined" color="primary" onClick={handleShowDetails}>
                                Hide Details
                            </Button>
                        </div>
                        <Divider className="mb-4" />

                        <Typography variant="h6" className="font-medium mb-2">Exam Overview</Typography>
                        <div className="space-y-4">
                            <Typography variant="body2" className="text-sm text-gray-500">Time Taken</Typography>
                            <Typography variant="body1" className="font-medium bg-blue-100 p-2 rounded text-blue-800">
                                {testResults?.completionTime ? `${Math.floor(testResults.completionTime / 60)} mins` : 'N/A'}
                            </Typography>
                        </div>

                        <Typography variant="h6" className="font-medium mb-2">Results Breakdown</Typography>
                        <div className="space-y-4">
                            <Typography variant="body2" className="text-sm text-gray-500">Accuracy</Typography>
                            <Typography variant="body1" className="font-medium bg-green-100 p-2 rounded text-green-800">
                                {testResults?.accuracy || 'N/A'}%
                            </Typography>
                            <Typography variant="body2" className="text-sm text-gray-500">Correct Answers</Typography>
                            <Typography variant="body1" className="font-medium bg-yellow-100 p-2 rounded text-yellow-800">
                                {testResults?.totalCorrect || 'N/A'}
                            </Typography>
                        </div>

                        <Typography variant="h6" className="font-medium mb-2">Questions and Answers</Typography>
                        <Divider className="mb-4" />
                        <div className="space-y-6">
                            {(testDetails?.questions || []).map((question, index) => (
                                <div key={question._id} className="p-4 bg-white rounded-lg shadow-md">
                                    <Typography variant="h6" className="font-semibold text-lg mb-3">
                                        {index + 1}. {question.text}
                                    </Typography>

                                    <div className="ml-4 space-y-3">
                                        {question.answers.map((ans, ansIndex) => (
                                            <div key={ansIndex} className={`flex items-center space-x-2 ${testResults?.answers[index] === ansIndex ? 'bg-blue-50 border-l-4 border-blue-600' : ''} p-2 rounded-md`}>
                                                <Typography variant="body2" className={`flex items-center ${testResults?.answers[index] === ansIndex ? 'text-blue-600 font-medium' : 'text-gray-800'}`}>
                                                    {ansIndex === question.correctAnswer ? (
                                                        <CheckIcon color="success" className="mr-2" />
                                                    ) : (
                                                        <CloseIcon color="error" className="mr-2" />
                                                    )}
                                                    {ans}
                                                </Typography>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 ml-4">
                                        <Typography variant="body2" className="text-sm text-gray-600">
                                            Your answer:
                                            {testResults?.answers[index] === question.correctAnswer ? (
                                                <span className="text-green-600 font-medium">
                                                    <CheckIcon color="success" className="mr-1" />
                                                    {question.answers[testResults?.answers[index]]}
                                                </span>
                                            ) : (
                                                <span className="text-red-600 font-medium">
                                                    <CloseIcon color="error" className="mr-1" />
                                                    {question.answers[testResults?.answers[index]] || 'N/A'}
                                                </span>
                                            )}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultsPg;
