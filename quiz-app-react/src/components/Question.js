import React from "react"; 

function Question({ question, onAnswer, userAnswer }) {
  // For multiple-choice answers
  const handleOptionClick = (option) => {
    onAnswer(option);
  };

  // For true/false answers
  const handleTrueFalseClick = (value) => {
    onAnswer(value);
  };

  return (
    <div className="card p-4">
      {/* Display the question prompt */}
      <h4>{question.question}</h4>

      {/* If it's multiple choice, show options as buttons */}
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
        // If it's a true/false question, show two buttons
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
