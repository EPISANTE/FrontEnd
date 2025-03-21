import React, { useState, useEffect } from 'react';
import './MainContent.css';
import { useNavigate } from 'react-router-dom';


const MainContent = () => {
    const navigate = useNavigate();

    const [, setPatientEmail] = useState('');
    useEffect(() => {
        const email = localStorage.getItem('patientEmail');
        if (email) {
            setPatientEmail(email);

        }
    }, []);



    return (
        <main className="content">

            <h1>Bienvenue sur EpiSante</h1>
            <p>Gérez vos données de santé efficacement.</p>

            <div className="card-container">
                <div className="card" onClick={() => navigate('/dashboard')}>
                    <h2>Tableau de bord</h2>
                    <p>Consultez et gérez les dossiers patients</p>
                </div>

                <div className="card" onClick={() => navigate('/rendezvous')}>
                    <h2>Rendez-Vous</h2>
                    <p>Prendre un nouveau rendez-vous</p>
                </div>

                <div className="card" onClick={() => navigate('/quiz')}>
                    <h2>Test Rapide</h2>
                    <p>Effectuer une évaluation médicale</p>
                </div>

                <div className="card card-disabled">
                    <h2>Diagnostic</h2>
                    <p>Fonctionnalité à venir...</p>
                </div>
            </div>
        </main>
    );
};

export default MainContent;