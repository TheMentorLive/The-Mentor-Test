"use client";

import { useState, useEffect } from "react";

export default function Component() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(3600);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleQuestionChange = (direction) => {
    if (direction === "prev" && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (direction === "next" && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answerIndex,
    }));
  };

  const handleQuestionFlag = (questionIndex) => {
    if (flaggedQuestions.includes(questionIndex)) {
      setFlaggedQuestions(flaggedQuestions.filter((index) => index !== questionIndex));
    } else {
      setFlaggedQuestions([...flaggedQuestions, questionIndex]);
    }
  };

  const questions = [
    {
      id: 1,
      text: "What is the capital of France?",
      answers: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: 0,
    },
    {
      id: 2,
      text: "Which of these is not a primary color?",
      answers: ["Red", "Blue", "Green", "Purple"],
      correctAnswer: 3,
    },
    {
      id: 3,
      text: "What is the largest ocean on Earth?",
      answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: 3,
    },
    {
      id: 4,
      text: "Which of these is not a common programming language?",
      answers: ["JavaScript", "Python", "Java", "Elvish"],
      correctAnswer: 3,
    },
  ];

  return (
    <div className="flex flex-col h-screen mt-10 bg-white text-black">
      <main className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-8 pt-20 p-4 md:p-8">
        <div className="bg-card text-card-foreground rounded-md p-4 md:p-6">
          <CustomCard title="Question Map" description="View the status of all questions at a glance.">
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 md:w-8 md:h-8 rounded-md flex items-center justify-center cursor-pointer transition-colors ${
                    currentQuestion === index
                      ? "bg-primary text-primary-foreground"
                      : flaggedQuestions.includes(index)
                      ? "bg-yellow-500 text-white"
                      : answers[index] !== undefined
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </CustomCard>
        </div>

        <div className="bg-card text-card-foreground rounded-md p-4 md:p-6">
          <div className="space-y-4">
            <p className="font-bold text-3xl">Exam</p>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-medium">Question {currentQuestion + 1}</span>
                {flaggedQuestions.includes(currentQuestion) && <FlagIcon className="h-4 w-4 md:h-5 md:w-5 text-primary" />}
              </div>
              <div className="text-lg px-4 py-3 rounded-md  text-white bg-blue-500">
                {formatTime(timeRemaining)}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-lg font-medium">{questions[currentQuestion].text}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <CustomButton
                    key={index}
                    variant={answers[currentQuestion] === index ? "primary" : "outline"}
                    onClick={() => handleAnswerSelect(currentQuestion, index)}
                    className="justify-start"
                  >
                    {answer}
                  </CustomButton>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
              <CustomButton
                variant={flaggedQuestions.includes(currentQuestion) ? "primary" : "outline"}
                onClick={() => handleQuestionFlag(currentQuestion)}
                className="mb-4 md:mb-0"
              >
                {flaggedQuestions.includes(currentQuestion) ? "Unflag" : "Flag"}
              </CustomButton>
              <div className="flex items-center gap-2">
                <span>
                  {flaggedQuestions.length} flagged
                </span>
                <span>
                  {Object.keys(answers).length} answered
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
  <div className="flex items-center gap-2">
    <span>
      Progress: {currentQuestion + 1}/{questions.length}
    </span>
    <CustomProgress value={((currentQuestion + 1) / questions.length) * 100} />
  </div>
  <div className="mt-6 flex gap-2 flex-col md:flex-row items-center">
    <CustomButton
      onClick={() => handleQuestionChange("prev")}
      disabled={currentQuestion === 0}
      className="bg-gray-300 text-gray-700 hover:bg-gray-400"
    >
      Prev
    </CustomButton>
    <CustomButton
      onClick={() => handleQuestionChange("next")}
      disabled={currentQuestion === questions.length - 1}
      className="bg-gray-300 text-gray-700 hover:bg-gray-400"
    >
      Next
    </CustomButton>
  </div>
</div>

<div className="flex items-center justify-end mt-4"> {/* Align to the right */}
  <CustomButton className="bg-blue-500 text-white px-9 py-3" size="xl">
    Submit
  </CustomButton>
</div>


            
          </div>
        </div>
      </main>
      
    </div>
  );
}

function CustomButton({ variant, size, className, children, onClick, disabled }) {
  const baseStyle = "px-4 py-1 rounded-md focus:outline-none focus:ring-2";
  const variantStyle =
    variant === "primary"
      ? "bg-blue-500 text-white hover:bg-blue-600"
      : variant === "outline"
      ? "border border-gray-300 text-black hover:bg-gray-200"
      : "text-black";
  const sizeStyle = size === "sm" ? "text-sm" : "text-base";
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className} ${disabledStyle}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function CustomCard({ title, description, children }) {
  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function CustomProgress({ value }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-500 h-2.5 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function FlagIcon(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a1 1 0 00-1 1v10.585L8.707 11.293a1 1 0 00-1.414 1.414L11.293 16l.707.707 3-3a1 1 0 00-1.414-1.414L12 12.586V3a1 1 0 00-1-1z"/></svg>;
}
