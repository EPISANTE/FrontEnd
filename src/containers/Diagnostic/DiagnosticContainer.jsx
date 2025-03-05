import React, { useState, useEffect } from 'react';
import Question from '../../components/Quiz/Question';
import DiagnosticAPI from '../../api/Diagnostic.js';


const DiagnosticContainer = () => {
    const [sessionId, setSessionId] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [diagnosis, setDiagnosis] = useState(null);
    const [error, setError] = useState(null);
    const [answers, setAnswers] = useState([]);


    useEffect(() => {
        const start = async () => {
            try {
                const {sessionId, firstQuestion} = await DiagnosticAPI.startDiagnosis();
                setSessionId(sessionId);
                setCurrentQuestion(firstQuestion);
            } catch (err) {
                setError("Failed to start diagnosis.");
            }
        };
        start();
    }, []);

    const handleAnswer = async (questionText, answer) => {

        setAnswers(prevAnswers => [...prevAnswers, { question: questionText, answer }]);
        try {
            const response = await DiagnosticAPI.submitAnswer(sessionId, answer ? 'yes' : 'no');
            if (response.startsWith("Diagnosis:")) {
                setDiagnosis(response);
            } else if (response.startsWith("Invalid answer.")) {
                setError(response);
            }
            else {
                setCurrentQuestion(response);
                setError(null);
            }
        } catch (err) {
            setError("Failed to process answer.");
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (diagnosis) {
        return (
            <div>
                <h2>Diagnosis:</h2>
                <p>{diagnosis}</p>
                <h3>Answer History:</h3>
                <ul>
                    {answers.map((a, index) => (
                        <li key={index}>
                            {a.question}: {a.answer ? 'Yes' : 'No'}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    if (!currentQuestion) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Question question={{ question: currentQuestion, id: 'current' }} onAnswer={handleAnswer} />
        </div>
    );
};

export default DiagnosticContainer;