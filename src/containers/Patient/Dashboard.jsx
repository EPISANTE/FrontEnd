// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { generatePatientBilan, getPatientInfo, submitStressTest } from 'src/api/Patient';
import Modal from './Modal';
import './Dashboard.css';

const Dashboard = () => {
    const [patientInfo, setPatientInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isStressTestOpen, setIsStressTestOpen] = useState(false);
    const [bilanMessage, setBilanMessage] = useState("");
    const [stressResponses, setStressResponses] = useState(Array(6).fill(0));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showStressResult, setShowStressResult] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);

    const userEmail = localStorage.getItem('userEmail');

    const originalStressTestQuestions = [
        "Les autres vous ont-ils dit que vous sembliez plus irritable que d'habitude ?",
        "Avez-vous remarqué des tensions musculaires (p. ex., mâchoire serrée) ?",
        "Avez-vous évité des interactions sociales récemment ?",
        "À quel point vous sentez-vous anxieux ces derniers temps ?",
        "À quelle fréquence ressentez-vous des maux de tête ou des troubles digestifs ?",
        "À quel point avez-vous du mal à vous concentrer ?"
    ];

    const shuffle = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    useEffect(() => {
        if (userEmail) {
            loadPatientInfo(userEmail);
        } else {
            setError("Veuillez vous connecter");
            window.location.href = '/';
        }
    }, []);

    const loadPatientInfo = (email) => {
        setLoading(true);
        setError("");

        getPatientInfo(email)
            .then((response) => {
                setPatientInfo(response);
            })
            .catch((error) => {
                setError(error.response?.data?.error || "Erreur de chargement");
            })
            .finally(() => setLoading(false));
    };

    const handleGenerateBilan = () => {
        generatePatientBilan(userEmail)
            .then((response) => {
                setBilanMessage(response.messageBilan);
                setIsModalOpen(true);
            })
            .catch((error) => {
                setError(error.response?.data?.error || "Erreur de génération");
            });
    };

    const handleStressTestStart = () => {
        const shuffled = shuffle(originalStressTestQuestions);
        setShuffledQuestions(shuffled);
        setStressResponses(Array(6).fill(0));
        setCurrentQuestionIndex(0);
        setShowStressResult(false);
        setIsStressTestOpen(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleStressTestSubmit = () => {
        submitStressTest(userEmail, stressResponses)
            .then((response) => {
                setBilanMessage(response.messageBilan);
                setShowStressResult(true);
            })
            .catch((error) => {
                setError(error.response?.data?.error || "Erreur lors du test de stress");
            });
    };

    const updateResponse = (index, value) => {
        const newResponses = [...stressResponses];
        newResponses[index] = parseInt(value, 10);
        setStressResponses(newResponses);
    };

    const isAllAnswered = stressResponses.every(response => response !== 0);
    const currentResponse = stressResponses[currentQuestionIndex];

    const closeModal = () => {
        setIsModalOpen(false);
        setIsStressTestOpen(false);
    };

    return (
        <div className="dashboard">
            <h2>Tableau de Bord</h2>
            {error && <p className="error-message">{error}</p>}

            {loading ? (
                <p>Chargement...</p>
            ) : patientInfo ? (
                <div className="patient-info">
                    <div className="info-grid">
                        <div><strong>Nom:</strong> {patientInfo.nom}</div>
                        <div><strong>Prénom:</strong> {patientInfo.prenom}</div>
                        <div><strong>Email:</strong> {patientInfo.email}</div>
                        <div><strong>Téléphone:</strong> {patientInfo.telephone}</div>
                        <div><strong>Adresse:</strong> {patientInfo.adresse}</div>
                        <div><strong>Taille:</strong> {patientInfo.taille} cm</div>
                        <div><strong>Poids:</strong> {patientInfo.poids} kg</div>
                        <div><strong>Sexe:</strong> {patientInfo.sexe === 'H' ? 'Homme' : 'Femme'}</div>
                        <div><strong>Âge:</strong> {patientInfo.age} ans</div>
                    </div>
                    <div className="button-group">
                        <button onClick={handleGenerateBilan}>Générer Bilan</button>
                        <button onClick={handleStressTestStart}>Test de Stress</button>
                    </div>
                </div>
            ) : (
                <p>Aucune donnée trouvée</p>
            )}

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h3>Bilan Médical</h3>
                <div className="bilan-content">
                    {bilanMessage || "Aucun bilan disponible"}
                </div>
                <button className="close-button" onClick={closeModal}>
                    Fermer
                </button>
            </Modal>

            <Modal isOpen={isStressTestOpen} onClose={closeModal}>
                {showStressResult ? (
                    <div className="stress-result">
                        <h3>Résultat du Test de Stress</h3>
                        <div className="result-content">{bilanMessage}</div>
                        <button className="close-button" onClick={closeModal}>
                            Fermer
                        </button>
                    </div>
                ) : (
                    <div className="stress-test">
                        <h3>Question {currentQuestionIndex + 1}/{shuffledQuestions.length}</h3>

                        <div className="question-container">
                            <p>{shuffledQuestions[currentQuestionIndex]}</p>
                            <div className="scale">
                                {[0, 1, 2, 3].map((value) => (
                                    <label key={value}>
                                        <input
                                            type="radio"
                                            name={`question-${currentQuestionIndex}`}
                                            value={value}
                                            checked={currentResponse === value}
                                            onChange={(e) => updateResponse(currentQuestionIndex, e.target.value)}
                                        />
                                        {value}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="navigation-buttons">
                            <button
                                onClick={handlePrevQuestion}
                                disabled={currentQuestionIndex === 0}
                            >
                                Précédent
                            </button>

                            {currentQuestionIndex === shuffledQuestions.length - 1 ? (
                                <button
                                    onClick={handleStressTestSubmit}
                                    disabled={!isAllAnswered}
                                    className="submit-button"
                                >
                                    Soumettre
                                </button>
                            ) : (
                                <button
                                    onClick={handleNextQuestion}
                                    disabled={currentResponse === 0}
                                >
                                    Suivant
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Dashboard;
