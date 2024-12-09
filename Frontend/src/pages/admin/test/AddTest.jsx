import { mainContext } from "/src/context/mainContex";
import { ADMINENDPOINTS } from "/src/constants/ApiConstants";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";

const AddTestPageCompact = () => {
  const [testData, setTestData] = useState({
    title: "",
    duration: "",
    category: "",
    description: "",
    summary: "",
    testType: "mock", // Default is 'mock'
    examType: "",
    level: "easy",
    price: "100.00", // Default price
    paymentAccess: false,
    image: "",
    tests: [],
  });
  const { token } = useContext(mainContext);
  const [categories, setCategories] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(ADMINENDPOINTS.GETSUBJECTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects(response.data);
    } catch (error) {
      console.error('Failed to fetch subjects', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(ADMINENDPOINTS.GETCATEGORIES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const fetchExamTypes = async () => {
    try {
      const response = await axios.get(ADMINENDPOINTS.GETEXAMTYPES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExamTypes(response.data);
    } catch (error) {
      console.error('Failed to fetch exam types', error);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchCategories();
    fetchExamTypes();
  }, []);

  const handleInputChange = (field, value) => {
    setTestData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTestTypeChange = (value) => {
    setTestData((prev) => ({
      ...prev,
      testType: value,
    }));
  };

  const handleAddTest = () => {
    setTestData((prev) => ({
      ...prev,
      tests: [
        ...prev.tests,
        {
          testTitle: "",
          subject: "",
          testdescription:"",
          questions: [],
          testModules: [],
        },
      ],
    }));
  };

  const handleRemoveTest = (testIndex) => {
    const updatedTests = testData.tests.filter((_, index) => index !== testIndex);
    setTestData((prev) => ({
      ...prev,
      tests: updatedTests,
    }));
  };

  const handleTestChange = (index, field, value) => {
    const updatedTests = [...testData.tests];
    updatedTests[index][field] = value;
    setTestData((prev) => ({
      ...prev,
      tests: updatedTests,
    }));
  };

  const handleAddQuestion = (testIndex) => {
    const updatedTests = [...testData.tests];
    const questionNumber = updatedTests[testIndex].questions.length + 1; // Increment the question number based on the current length
    updatedTests[testIndex].questions.push({
      number: questionNumber, // Add the question number here
      text: "",
      answers: ["", "", "", ""],
      correctAnswer: "",
    });
    setTestData((prev) => ({
      ...prev,
      tests: updatedTests,
    }));
  };
  

  const handleRemoveQuestion = (testIndex, questionIndex) => {
    const updatedTests = [...testData.tests];
    updatedTests[testIndex].questions = updatedTests[testIndex].questions.filter((_, index) => index !== questionIndex);
    setTestData((prev) => ({
      ...prev,
      tests: updatedTests,
    }));
  };

  const handleQuestionChange = (testIndex, questionIndex, field, value) => {
    const updatedTests = [...testData.tests];
    updatedTests[testIndex].questions[questionIndex][field] = value;
    setTestData((prev) => ({
      ...prev,
      tests: updatedTests,
    }));
  };
  

  const handleOptionChange = (testIndex, questionIndex, optionIndex, value) => {
    const updatedTests = [...testData.tests];
    updatedTests[testIndex].questions[questionIndex].answers[optionIndex] = value;
    setTestData((prev) => ({
      ...prev,
      tests: updatedTests,
    }));
  };

  const handleAddModule = (testIndex) => {
    const updatedTests = [...testData.tests];
    const moduleNumber = updatedTests[testIndex].testModules.length + 1; // Increment the module number based on the current length
    updatedTests[testIndex].testModules.push({
      moduleNumber, // Add the module number here
      title: "",
      description: "",
    });
    setTestData((prev) => ({
      ...prev,
      tests: updatedTests,
    }));
  };

  const handleModuleChange = (testIndex, moduleIndex, field, value) => {
    const updatedTests = [...testData.tests];
    updatedTests[testIndex].testModules[moduleIndex][field] = value;
    setTestData((prev) => ({
      ...prev,
      tests: updatedTests,
    }));
  };

  const handleSubmit = async () => {
    console.log("ADMINENDPOINTS.ADDTEST", testData);
  
    try {
  
      if (!token) {
        alert("Authentication token is missing.");
        return;
      }
  
      const response = await axios.post(
        ADMINENDPOINTS.ADDTEST,
        testData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Sending token as Bearer
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        alert("Test added successfully!");
        console.log(response.data);
      } else {
        alert("Failed to add test data. Please try again.");
        console.error("Error response:", response);
      }
    } catch (error) {
      alert("Failed to add test data.");
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="p-4 max-w-5xl mx-auto bg-gray-50 shadow-md rounded">
      <h1 className="text-xl font-bold mb-4">Add Test</h1>

      {/* Test Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Test Title"
          value={testData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={testData.duration}
          onChange={(e) => handleInputChange("duration", e.target.value)}
          className="p-2 border rounded"
        />

        {/* Category Select */}
        <select
          value={testData.category}
          onChange={(e) => handleInputChange("category", e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Exam Type Select */}
        <select
          value={testData.examType}
          onChange={(e) => handleInputChange("examType", e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Exam Type</option>
          {examTypes.map((examType) => (
            <option key={examType.id} value={examType.name}>
              {examType.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Description"
          value={testData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="p-2 border rounded col-span-2"
        />
        <textarea
          placeholder="Summary"
          value={testData.summary}
          onChange={(e) => handleInputChange("summary", e.target.value)}
          className="p-2 border rounded col-span-2"
        />

        {/* Price Setting */}
        <input
          type="number"
          placeholder="Price"
          value={testData.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
          className="p-2 border rounded"
        />

        {/* Test Type Selector */}
        <select
          value={testData.testType}
          onChange={(e) => handleTestTypeChange(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="mock">Mock</option>
          <option value="main">Main</option>
        </select>
      </div>

      {/* Tests */}
      <div className="space-y-4">
        {testData.tests.map((test, testIndex) => (
          <div key={testIndex} className="p-4 bg-white border rounded shadow">
            <h2 className="font-semibold">Test #{testIndex + 1}</h2>
            <button
              onClick={() => handleRemoveTest(testIndex)}
              className="text-red-500 text-sm mt-2"
            >
              Remove Test
            </button>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Test Title"
                value={test.testTitle}
                onChange={(e) => handleTestChange(testIndex, "testTitle", e.target.value)}
                className="p-2 border rounded"
              />

<input
                type="text"
                placeholder="Test description"
                value={test.testdescription}
                onChange={(e) => handleTestChange(testIndex, "testdescription", e.target.value)}
                className="p-2 border rounded"
              />

              {/* Subject Select */}
              <select
                value={test.subject}
                onChange={(e) => handleTestChange(testIndex, "subject", e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Questions */}
            <div className="mt-4">
              <h3 className="font-semibold">Questions</h3>
              {test.questions.map((question, questionIndex) => (
  <div key={questionIndex} className="p-2 border rounded mt-2">
    {/* Display the question number */}
    <input
      type="text"
      placeholder="Question Number"
      value={question.number}
      onChange={(e) =>
        handleQuestionChange(testIndex, questionIndex, "number", e.target.value)
      }
      className="p-2 w-full border rounded"
    />
    
    <input
      type="text"
      placeholder="Question"
      value={question.text}
      onChange={(e) =>
        handleQuestionChange(testIndex, questionIndex, "text", e.target.value)
      }
      className="p-2 w-full border rounded"
    />
    
    <div className="mt-2">
      {question.answers.map((answer, optionIndex) => (
        <input
          key={optionIndex}
          type="text"
          placeholder={`Option ${optionIndex + 1}`}
          value={answer}
          onChange={(e) =>
            handleOptionChange(testIndex, questionIndex, optionIndex, e.target.value)
          }
          className="p-2 border rounded"
        />
      ))}
    </div>
    
    <input
      type="number"
      placeholder="Correct Answer (1-4)"
      value={question.correctAnswer}
      onChange={(e) =>
        handleQuestionChange(testIndex, questionIndex, "correctAnswer", e.target.value)
      }
      className="p-2 w-full mt-2 border rounded"
    />
    
    <button
      onClick={() => handleRemoveQuestion(testIndex, questionIndex)}
      className="text-red-500 text-sm mt-2"
    >
      Remove Question
    </button>
  </div>
))}

              <button
                onClick={() => handleAddQuestion(testIndex)}
                className="text-blue-500 text-sm mt-2"
              >
                Add Question
              </button>
            </div>

            {/* Modules */}
            <div className="mt-4">
              <h3 className="font-semibold">Modules</h3>
              {test.testModules.map((module, moduleIndex) => (
  <div key={moduleIndex} className="p-2 border rounded mt-2">
    {/* Display the module number */}
    <input
      type="number"
      placeholder="Module Number"
      value={module.moduleNumber}
      onChange={(e) =>
        handleModuleChange(testIndex, moduleIndex, "moduleNumber", e.target.value)
      }
      className="p-2 w-full border rounded"
    />
    
    <input
      type="text"
      placeholder="Module Title"
      value={module.title}
      onChange={(e) =>
        handleModuleChange(testIndex, moduleIndex, "title", e.target.value)
      }
      className="p-2 w-full border rounded"
    />
    
    <textarea
      placeholder="Module Description"
      value={module.description}
      onChange={(e) =>
        handleModuleChange(testIndex, moduleIndex, "description", e.target.value)
      }
      className="p-2 w-full mt-2 border rounded"
    />
  </div>
))}

              <button
                onClick={() => handleAddModule(testIndex)}
                className="text-blue-500 text-sm mt-2"
              >
                Add Module
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={handleAddTest}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Test
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white py-2 px-4 rounded mt-4"
      >
        Submit Test Data
      </button>
    </div>
  );
};

export default AddTestPageCompact;
