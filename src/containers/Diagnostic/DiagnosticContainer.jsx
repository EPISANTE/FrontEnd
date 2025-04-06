import React, { useState, useEffect, useCallback } from 'react';
import { fetchStartNode, postAnswer } from '../../api/Diagnostic';
import QuestionDisplay from '../../components/Diagnostic/QuestionDisplay';
import ResultDisplay from '../../components/Diagnostic/ResultDisplay';
import LoadingIndicator from '../../components/Diagnostic/LoadingIndicator';


const DiagnosticContainer = () => {
    const [currentNode, setCurrentNode] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isComplete, setIsComplete] = useState(false);

    const loadStartNode = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setIsComplete(false);
        setCurrentNode(null);
        try {
            const startNode = await fetchStartNode();
            setCurrentNode(startNode);
            setIsComplete(startNode.type === 'leaf');
        } catch (err) {
            console.error("Failed to load start node:", err);
            setError(err.message || 'Could not start the diagnosis. Please try again later.');
            setIsComplete(true);
        } finally {
            setIsLoading(false);
        }
    }, []);


    useEffect(() => {
        loadStartNode();
    }, [loadStartNode]);

    const handleAnswer = async (answer) => {
        if (!currentNode || currentNode.type !== 'decision' || isLoading) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const nextNode = await postAnswer(currentNode.question, answer);
            setCurrentNode(nextNode);
            if (nextNode.type === 'leaf') {
                setIsComplete(true);
            }
        } catch (err) {
            console.error("Failed to process answer:", err);
            const errorMsg = err.message || 'An error occurred processing your answer.';
            setCurrentNode({ type: 'leaf', decision: `Error: ${errorMsg}` });
            setError(errorMsg);
            setIsComplete(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRestart = () => {
        loadStartNode();
    };

    const renderCurrentStep = () => {
        if (isLoading) {
            return <LoadingIndicator />;
        }


        if (error && !currentNode?.decision?.includes('Error:')) {
            return <ResultDisplay result={`Error: ${error}`} onRestart={handleRestart} isLoading={false} />;
        }

        if (!currentNode) {
            return <p>Initializing diagnostic...</p>;
        }

        if (currentNode.type === 'decision' && !isComplete) {
            return (
                <QuestionDisplay
                    question={currentNode.question}
                    onAnswer={handleAnswer}
                    isLoading={isLoading}
                />
            );
        }

        if (currentNode.type === 'leaf' || isComplete) {
            return (
                <ResultDisplay
                    result={currentNode.decision}
                    onRestart={handleRestart}
                    isLoading={isLoading}
                />
            );
        }

        return <p>An unexpected error occurred in the diagnostic flow.</p>;
    };

    return (
        <div className="diagnostic-container-wrapper">
            <h1>Symptom Checker</h1>
            {renderCurrentStep()}
        </div>
    );
};

export default DiagnosticContainer;