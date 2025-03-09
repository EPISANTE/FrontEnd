import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import api from '../../axios';
import moment from 'moment';
import 'moment/locale/fr';
import './NotificationBell.css';

moment.locale('fr');

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const patientEmail = localStorage.getItem('patientEmail');

    const fetchNotifications = async () => {
        if (!patientEmail) return;

        try {
            const encodedEmail = encodeURIComponent(patientEmail);
            const response = await api.get(`/api/notifications/patient/email/${encodedEmail}`);

            const formattedNotifications = response.data.map(notif => ({
                ...notif,
                dateCreation: moment(notif.dateCreation),
                dateRdv: moment(notif.dateRdv)
            }));

            setNotifications(formattedNotifications);
        } catch (error) {
            handleNotificationError(error);
        }
    };

    const handleNotificationError = (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    alert("Email invalide");
                    break;
                case 404:
                    console.log("Aucune notification trouvée");
                    break;
                case 500:
                    alert("Erreur serveur");
                    break;
                default:
                    alert("Erreur inconnue");
            }
        } else {
            console.error('Erreur réseau :', error.message);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 300000);
        return () => clearInterval(interval);
    }, [patientEmail]);

    return (
        <div className="notification-bell">
            <button onClick={() => setIsOpen(!isOpen)} className="bell-button">
                <FontAwesomeIcon icon={faBell} size="lg" />
                {notifications.length > 0 && (
                    <span className="notification-badge">{notifications.length}</span>
                )}
            </button>

            {isOpen && (
                <div className="notification-dropdown">
                    <div className="notification-header">
                        <h4>Vos Rendez-vous</h4>
                        <button onClick={() => setIsOpen(false)}>×</button>
                    </div>
                    <div className="notification-list">
                        {notifications.length === 0 ? (
                            <div className="notification-item empty">
                                Aucun rendez-vous programmé
                            </div>
                        ) : (
                            notifications.map(notification => (
                                <div key={notification.id} className="notification-item">
                                    <div className="notification-message">
                                        {notification.message}
                                    </div>
                                    <div className="notification-details">
                                        <span>Médecin : {notification.medecinNom}</span>
                                        <span>Spécialité : {notification.specialite}</span>
                                        <span>Date : {notification.dateRdv.format('LLLL')}</span>
                                    </div>
                                    <div className="notification-time">
                                        Reçu {notification.dateCreation.fromNow()}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;