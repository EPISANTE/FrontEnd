// src/components/Diagnostic/ResultDisplay.jsx
import React from 'react';
import PropTypes from 'prop-types';


const ResultDisplay = ({ result, onRestart, isLoading }) => {
    const isError = result?.toLowerCase().startsWith('error:');


    const baseResultTextClasses = "my-4 p-3 text-lg text-left rounded border-l-4";
    const normalResultClasses = "bg-teal-50 border-teal-500 text-gray-800";
    const errorResultClasses = "bg-red-50 border-red-500 text-red-700 font-semibold"; // Corrected color hex typo earlier


    const baseButtonClasses = "py-2 px-5 text-base rounded-md cursor-pointer transition-colors duration-200 ease-in-out min-w-[80px] text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed";
    const restartButtonClasses = "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500";


    return (

        <div className="p-5 my-5 mx-auto bg-gray-50 border border-gray-200 rounded-lg max-w-md text-center shadow-sm">

            <h2 className="text-2xl font-semibold text-slate-700 mb-4">Result</h2>


            <p className={`${baseResultTextClasses} ${isError ? errorResultClasses : normalResultClasses}`}>
                {result || "Diagnosis process complete."}
            </p>


            {!isError && (
                <p className="text-sm text-gray-500 mt-5 italic">
                    Have you a good health :)
                </p>
            )}

            <button
                onClick={onRestart}
                disabled={isLoading}
                className={`mt-5 ${baseButtonClasses} ${restartButtonClasses}`}
            >
                Start Over
            </button>
        </div>
    );
};

ResultDisplay.propTypes = {
    result: PropTypes.string,
    onRestart: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default ResultDisplay;