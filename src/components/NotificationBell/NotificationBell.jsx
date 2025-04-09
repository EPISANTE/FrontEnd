 import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import api from '../../axios';
import moment from 'moment';
import 'moment/locale/fr';
import './NotificationBell.css';

moment.locale('fr');

const NotificationBell = () => {
    const [upcomingNotifications, setUpcomingNotifications] = useState([]);
    const [pastNotifications, setPastNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('upcoming');
    const patientEmail = localStorage.getItem('patientEmail');

    const fetchNotifications = async () => {
        if (!patientEmail) return;

        try {
            const encodedEmail = encodeURIComponent(patientEmail);
            const response = await api.get(`/api/notifications/patient/email/${encodedEmail}`);

            const now = moment();
            const upcoming = [];
            const past = [];

            response.data.forEach(notif => {
                const notification = {
                    ...notif,
                    dateCreation: moment(notif.dateCreation),
                    dateRdv: moment(notif.dateRdv)
                };
                if (notification.dateRdv.isAfter(now)) {
                    upcoming.push(notification);
                } else {
                    past.push(notification);
                }
            });

            setUpcomingNotifications(upcoming.sort((a, b) => a.dateRdv - b.dateRdv));
            setPastNotifications(past.sort((a, b) => b.dateRdv - a.dateRdv));
        } catch (error) {
            handleNotificationError(error);
        }
    };

    const handleAnnulation = async (notificationId) => {
        if (window.confirm("Voulez-vous vraiment annuler ce rendez-vous ?")) {
            try {
                await api.delete(`/api/rendezvous/annuler/${notificationId}`);
                fetchNotifications();
                window.dispatchEvent(new Event('reservation-update'));
                alert("Rendez-vous annulé avec succès !");
            } catch (error) {
                alert("Échec de l'annulation : " + (error.response?.data?.message || "Erreur serveur"));
            }
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

    const NotificationItem = ({ notification, isPast }) => (
        <div className={`notification-item ${isPast ? 'past' : ''}`}>
            <div className="notification-message">
                {isPast ? (
                    `Vous avez passé un rendez-vous avec Dr ${notification.medecinNom}`
                ) : (
                    notification.message
                )}
                <span className={`status-badge ${isPast ? 'past-badge' : 'upcoming-badge'}`}>
                    {isPast ? 'Terminé' : 'À venir'}
                </span>
            </div>
            <div className="notification-details">
                <span>Médecin : {notification.medecinNom}</span>
                <span>Spécialité : {notification.specialite}</span>
                <span>Date : {notification.dateRdv.format("dddd D MMMM YYYY [à] HH:mm")}</span>
            </div>
            <div className="notification-actions">
                <div className="notification-time">
                    {isPast ? "Effectué " : "Reçu "}
                    {notification.dateCreation.fromNow()}
                </div>
                {!isPast && (
                    <button
                        className="cancel-button"
                        onClick={() => handleAnnulation(notification.id)}
                    >
                        <FontAwesomeIcon icon={faTimesCircle} />
                        Annuler
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="notification-bell">
            <button onClick={() => setIsOpen(!isOpen)} className="bell-button">
                <FontAwesomeIcon icon={faBell} size="lg" />
                {upcomingNotifications.length > 0 && (
                    <span className="notification-badge">{upcomingNotifications.length}</span>
                )}
            </button>

            {isOpen && (
                <div className="notification-dropdown">
                    <div className="notification-header">
                        <h4>Vos Rendez-vous</h4>
                        <div className="tabs">
                            <button
                                className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                                onClick={() => setActiveTab('upcoming')}
                            >
                                À venir ({upcomingNotifications.length})
                            </button>
                            <button
                                className={`tab ${activeTab === 'past' ? 'active' : ''}`}
                                onClick={() => setActiveTab('past')}
                            >
                                Historique ({pastNotifications.length})
                            </button>
                        </div>
                        <button onClick={() => setIsOpen(false)}>×</button>
                    </div>

                    <div className="notification-list">
                        {activeTab === 'upcoming' ? (
                            upcomingNotifications.length === 0 ? (
                                <div className="notification-item empty">
                                    Aucun rendez-vous à venir
                                </div>
                            ) : (
                                upcomingNotifications.map(notification => (
                                    <NotificationItem
                                        key={notification.id}
                                        notification={notification}
                                        isPast={false}
                                    />
                                ))
                            )
                        ) : (
                            pastNotifications.length === 0 ? (
                                <div className="notification-item empty">
                                    Aucun rendez-vous dans l'historique
                                </div>
                            ) : (
                                pastNotifications.map(notification => (
                                    <NotificationItem
                                        key={notification.id}
                                        notification={notification}
                                        isPast={true}
                                    />
                                ))
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;