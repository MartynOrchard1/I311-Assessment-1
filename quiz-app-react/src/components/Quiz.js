import React, { useState } from "react";
import quizData from "../data/quizData.json";
import Question from "../Question";
import Result from "../Result";

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quizData.questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">{quizData.title}</h1>

      {!showResult ? (
        <div>
          <p className="text-center">
            Question {currentQuestionIndex + 1} of {quizData.questions.length}
          </p>
          <Question
            question={currentQuestion}
            onAnswer={handleAnswer}
            userAnswer={userAnswers[currentQuestionIndex]}
          />
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
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
