import React, { useState, useEffect } from 'react';
import axios from '../../axios'; // Your axios instance

function AkinatorContainer() {
    const [currentNode, setCurrentNode] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        startDiagnosis();
    }, []);

    const startDiagnosis = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/decision-tree/start');
            setCurrentNode(response.data);
        } catch (error) {
            console.error("Error starting diagnosis:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswer = async (answer) => {
        if (!currentNode) return;
        setLoading(true);
        try {
            const response = await axios.get('/api/decision-tree/next', {
                params: { currentNodeId: currentNode.id, answer }
            });
            if (response.status === 204) {

                console.log("Diagnosis complete:", currentNode.text);
                alert("Diagnosis complete: " + currentNode.text);
                setCurrentNode(null);
            }
            else{
                setCurrentNode(response.data);
            }
        } catch (error) {
            console.error("Error getting next node:", error);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }

    if (!currentNode) {
        return (
            <div>
                <p>Diagnosis complete or not started.
                    <button onClick={startDiagnosis}>Restart Diagnosis</button>
                </p>
            </div>

        )
    }

    return (
        <div>
            <h2>{currentNode.text}</h2>
            {currentNode.type === "QUESTION" && (
                <div>
                    <button onClick={() => handleAnswer('yes')}>Yes</button>
                    <button onClick={() => handleAnswer('no')}>No</button>
                </div>
            )}
        </div>
    );
}

export default AkinatorContainer;