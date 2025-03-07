import React, { useState, useEffect } from 'react';
import './MainContent.css';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification.jsx';
import axios from 'axios';

const MainContent = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [patientEmail, setPatientEmail] = useState('');
    const [patientId, setPatientId] = useState(null);

    const API_BASE_URL = "http://localhost:9090/api";

    useEffect(() => {
        const email = localStorage.getItem('patientEmail');
        if (email) {
            setPatientEmail(email);
            fetchPatientId(email);
        }
    }, []);

    const fetchPatientId = async (email) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/patients/email/${email}`);
            if (response.status === 200 && response.data) {
                const patient = response.data;
                setPatientId(patient.id);
                fetchNotifications(patient.id);
            } else {
                console.error("Patient non trouvé pour l'email :", email);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération de l'ID du patient :", error);
        }
    };

    const fetchNotifications = async (patientId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/notifications/patient/${patientId}`);
            const notificationData = response.data;

            if (
                notificationData &&
                notificationData.rendezVous &&
                notificationData.rendezVous.medecin &&
                notificationData.rendezVous.dateHeure
            ) {
                const medecinNom = notificationData.rendezVous.medecin.nom;
                const dateHeure = notificationData.rendezVous.dateHeure;
                const message = `Vous avez un rendez-vous avec le médecin ${medecinNom} le ${new Date(dateHeure).toLocaleString()}.`;
                setNotifications([{ id: notificationData.id, message }]);
            } else {
                console.error("La réponse de l'API ne contient pas les champs nécessaires.");
                setNotifications([]);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des notifications :", error);
            setNotifications([]);
        }
    };

    return (
        <main className="content">
            <Notification notifications={notifications} />

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