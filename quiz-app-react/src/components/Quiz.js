// Import Statements
import React, { useState } from "react";
import quizData from "../data/quizData.json"; // Import quiz question data
import Question from "./Question"; 
import Result from "./Result"; 

function Quiz() {
  // Track which question the user is currently on
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Store user's answers in an array, initialized to null
  const [userAnswers, setUserAnswers] = useState(
    Array(quizData.questions.length).fill(null)
  );

  // Determine when to show the result screen
  const [showResult, setShowResult] = useState(false);

  // Get the current question based on index
  const currentQuestion = quizData.questions[currentQuestionIndex];

  // Function to save user's answer for current question
  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers]; // Copy current answers
    newAnswers[currentQuestionIndex] = answer; // Set answer for current question
    setUserAnswers(newAnswers); // Update state
  };

  // Go to the next question or show results if at the end
  const handleNext = () => {
    // Force user to answer before proceeding
    if (userAnswers[currentQuestionIndex] === null) {
      alert("Please select an answer before continuing.");
      return;
    }

    // If not last question, move forward
    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // If answers are complete, show result
      if (userAnswers.includes(null)) {
        alert("Please answer all questions before finishing the quiz.");
      } else {
        setShowResult(true);
      }
    }
  };

  // Go to the previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">{quizData.title}</h1>

      {/* If quiz is still ongoing, show question screen */}
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

          {/* Navigation buttons */}
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>

            <button className="btn btn-primary" onClick={handleNext}>
              {currentQuestionIndex === quizData.questions.length - 1
                ? "Finish"
                : "Next"}
            </button>
          </div>
        </div>
      ) : (
        // Show result component if quiz is finished
        <Result questions={quizData.questions} userAnswers={userAnswers} />
      )}
    </div>
  );
}

export default Quiz;
