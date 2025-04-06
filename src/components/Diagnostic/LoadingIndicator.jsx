import React from 'react';
import './Diagnostic.css';

const LoadingIndicator = () => {
    return (
        <div className="diagnostic-loading-container">
            <p className="diagnostic-loading-text">Loading...</p>
        </div>
    );
};

export default LoadingIndicator;