import React, { useState } from 'react';
import Question from '../../components/Quiz/Question';


const DiagnosticContainer = () => {
    const [currentQuestion, setCurrentQuestion] = useState("Do you have fever? yes/no");
    const [diagnosis, setDiagnosis] = useState(null);
    const [answers, setAnswers] = useState([]);

    const questions = [
        "Do you have fever? yes/no",
        "Do you have fatigue or muscle pain? (yes/no)",
        "Do you have a cough? (yes/no)",
        "Do you have a runny nose? (yes/no)",
    ];

    const handleAnswer = (questionText, answer) => {
        const newAnswers = [...answers, { question: questionText, answer }];
        setAnswers(newAnswers);

        if (questionText === questions[0]) {
            if (answer) {
                setCurrentQuestion(questions[1]);
            } else {
                setDiagnosis("Insufficient symptoms for a diagnosis. Please consult a doctor if you feel unwell.");
            }
        } else if (questionText === questions[1]) {
            if (answer) {
                setCurrentQuestion(questions[2]);
            } else {
                setDiagnosis("Diagnosis: Possible Common Cold (Rhume)");
            }
        } else if (questionText === questions[2]) {
            if (answer) {
                setDiagnosis("Diagnosis: Possible Flu (Grippe)");
            } else {
                setCurrentQuestion(questions[3]);
            }
        } else if (questionText === questions[3]) {
            if(answer){
                setDiagnosis("Diagnosis: Possible Common Cold (Rhume)");
            }else{
                setDiagnosis("Diagnosis: Possible COVID-19");
            }
        }
    };

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

    return (
        <div>
            <Question question={{ question: currentQuestion, id: 'current' }} onAnswer={handleAnswer} />
        </div>
    );
};

export default DiagnosticContainer;