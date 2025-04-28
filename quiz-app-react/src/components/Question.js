import React from "react";

function Question({ question, onAnswer, userAnswer }) {
  // Handle selecting a multiple choice option
  const handleOptionClick = (option) => {
    onAnswer(option);
  };

  // Handle selecting true/false
  const handleTrueFalseClick = (value) => {
    onAnswer(value);
  };

  return (
    <div className="card p-4">
      <h4>{question.question}</h4>

      {/* Render multiple-choice options */}
      {question.type === "multiple-choice" ? (
        <div className="mt-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`btn btn-outline-primary m-2 ${
                userAnswer === option ? "active" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        // Render true/false buttons
        <div className="mt-3">
          <button
            className={`btn btn-outline-success m-2 ${
              userAnswer === true ? "active" : ""
            }`}
            onClick={() => handleTrueFalseClick(true)}
          >
            True
          </button>
          <button
            className={`btn btn-outline-danger m-2 ${
              userAnswer === false ? "active" : ""
            }`}
            onClick={() => handleTrueFalseClick(false)}
          >
            False
          </button>
        </div>
      )}
    </div>
  );
}

export default Question;
