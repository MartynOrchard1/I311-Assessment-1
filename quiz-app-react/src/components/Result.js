import React from "react";

function Result({ questions, userAnswers }) {
  // Calculate final score
  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();

  return (
    <div className="card p-4">
      <h2 className="text-center">Quiz Complete!</h2>
      <h3 className="text-center">
        You scored {score} out of {questions.length}
      </h3>

      {/* Review each question with user's answer and correct answer */}
      <div className="mt-4">
        <h4>Review:</h4>
        {questions.map((question, index) => (
          <div key={index} className="mb-3">
            <p><strong>Q{index + 1}: {question.question}</strong></p>
            <p>Your Answer: {String(userAnswers[index])}</p>
            <p>Correct Answer: {String(question.correctAnswer)}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Result;
