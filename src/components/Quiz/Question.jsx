// src/components/Quiz/Question.jsx
import React from 'react';

const Question = ({ question, onAnswer }) => {
    const handleAnswer = (answer) => {
        onAnswer(question.question, answer);
    };

    return (
        <div>
            <h2>{question.question}</h2>
            <button onClick={() => handleAnswer(true)}>Yes</button>
            <button onClick={() => handleAnswer(false)}>No</button>
        </div>
    );
};

export default Question;