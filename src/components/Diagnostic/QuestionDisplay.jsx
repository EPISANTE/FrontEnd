import React from 'react';
import PropTypes from 'prop-types';
import './Diagnostic.css';

const QuestionDisplay = ({ question, onAnswer, isLoading }) => {
    return (
        <div className="diagnostic-question-container">
            <h2 className="diagnostic-question-text">{question}</h2>
            <div className="diagnostic-button-group">
                <button
                    onClick={() => onAnswer('yes')}
                    disabled={isLoading}
                    className="diagnostic-button diagnostic-button-yes"
                >
                    Yes
                </button>
                <button
                    onClick={() => onAnswer('no')}
                    disabled={isLoading}
                    className="diagnostic-button diagnostic-button-no"
                >
                    No
                </button>
            </div>
        </div>
    );
};

QuestionDisplay.propTypes = {
    question: PropTypes.string.isRequired,
    onAnswer: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default QuestionDisplay;