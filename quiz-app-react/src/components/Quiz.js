import React, { useState } from "react";
import quizData from "../data/quizData.json";
import Question from "./Question";
import Result from "./Result";

function Quiz() {
  // Check which question the user is on
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Store teh user's answers
  const [userAnswers, setUserAnswers] = useState(
    Array(quizData.questions.length).fill(null)
  );
  // States when to show the result screen
  const [showResult, setShowResult] = useState(false);

  // Question object for the current question
  const currentQuestion = quizData.questions[currentQuestionIndex];

  // Save the user's answer for the currentt question
  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  // Move to next question
  const handleNext = () => {
    if (userAnswers[currentQuestionIndex] === null) {
      alert("Please select an answer before continuing.");
      return;
    }

    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (userAnswers.includes(null)) {
        alert("Please answer all questions before finishing the quiz.");
      } else {
        setShowResult(true);
      }
    }
  };

  // Move to previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">{quizData.title}</h1>
      
      {/* Show questiosn while quiz is ongoing */}
      {!showResult ? (
        <div>
          <p className="text-center">
            Question {currentQuestionIndex + 1} of {quizData.questions.length}
          </p>
          {/* Render the current question */}
          <Question
            question={currentQuestion}
            onAnswer={handleAnswer}
            userAnswer={userAnswers[currentQuestionIndex]}
          />
          {/* Nav buttons */}
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>

            <button
              className="btn btn-primary"
              onClick={handleNext}
            >
              {currentQuestionIndex === quizData.questions.length - 1
                ? "Finish"
                : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <Result questions={quizData.questions} userAnswers={userAnswers} />
      )}
    </div>
  );
}

export default Quiz;
