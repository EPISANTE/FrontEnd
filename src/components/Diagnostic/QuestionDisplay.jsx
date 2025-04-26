import React from 'react';
import PropTypes from 'prop-types';


const QuestionDisplay = ({ question, onAnswer, isLoading }) => {
    // Base button classes (reusable)
    const baseButtonClasses = "py-2 px-5 text-base rounded-md cursor-pointer transition-colors duration-200 ease-in-out min-w-[80px] text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed";
    const yesButtonClasses = "bg-green-600 hover:bg-green-700 focus:ring-green-500";
    const noButtonClasses = "bg-red-600 hover:bg-red-700 focus:ring-red-500";

    return (

        <div className="p-5 my-5 mx-auto bg-gray-50 border border-gray-200 rounded-lg max-w-md text-center shadow-sm">

            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 leading-relaxed">
                {question}
            </h2>

            <div className="flex justify-center gap-4 mt-5">
                <button
                    onClick={() => onAnswer('yes')}
                    disabled={isLoading}
                    className={`${baseButtonClasses} ${yesButtonClasses}`}
                >
                    Yes
                </button>
                <button
                    onClick={() => onAnswer('no')}
                    disabled={isLoading}
                    className={`${baseButtonClasses} ${noButtonClasses}`}
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