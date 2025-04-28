import React from "react";

function Question({ question, onAnswer, userAnswer }) {
  const handleOptionClick = (option) => {
    onAnswer(option);
  };

  const handleTrueFalseClick = (value) => {
    onAnswer(value);
  };

  return (
    <div className="card p-4">
      <h4>{question.question}</h4>

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
