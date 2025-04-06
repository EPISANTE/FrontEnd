import React from 'react';
import PropTypes from 'prop-types';
import './Diagnostic.css';

const ResultDisplay = ({ result, onRestart, isLoading }) => {
    const isError = result?.toLowerCase().startsWith('error:');

    return (
        <div className="diagnostic-result-container">
            <h2 className="diagnostic-result-title">Result</h2>
            <p className={`diagnostic-result-text ${isError ? 'diagnostic-error-text' : ''}`}>
                {result || "Diagnosis process complete."}
            </p>
            {!isError && (
                <p className="diagnostic-disclaimer">
                    Disclaimer: This is a simplified model and IS NOT a substitute for professional medical advice. Always consult a healthcare professional.
                </p>
            )}
            <button
                onClick={onRestart}
                disabled={isLoading}
                className="diagnostic-button diagnostic-button-restart"
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