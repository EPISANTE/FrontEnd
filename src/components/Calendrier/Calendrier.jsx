import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr";
import api from "../../axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendrier.css";

moment.locale("fr");
const localizer = momentLocalizer(moment);

const Calendrier = ({ disponibilites = [] }) => {
    const [events, setEvents] = useState([]);
    const [patientEmail, setPatientEmail] = useState(null);

    useEffect(() => {
        const storedPatientEmail = localStorage.getItem("patientEmail");
        storedPatientEmail && setPatientEmail(storedPatientEmail);
    }, []);

    const transformDisponibilitesEnEvents = (disponibilites) => {
        return disponibilites.map(dispo => {
            const start = moment(dispo.date).toDate();
            const end = moment(dispo.date).add(30, 'minutes').toDate();

            const isUserReservation = dispo.patient?.email === patientEmail;

            return {
                title: isUserReservation ? "Votre RDV" : dispo.reserve ? "Réservé" : "Disponible",
                start: start,
                end: end,
                isDisponible: !dispo.reserve,
                disponibiliteId: dispo.id,
                className: dispo.reserve ?
                    (isUserReservation ? "event-votre-rdv" : "event-indisponible")
                    : "event-disponible",
                style: {
                    backgroundColor: dispo.reserve ?
                        (isUserReservation ? "#c8e6c9" : "#ffcdd2")
                        : "#e3f2fd"
                }
            };
        });
    };

    useEffect(() => {
        setEvents(transformDisponibilitesEnEvents(disponibilites));
    }, [disponibilites, patientEmail]);

    const handleReservation = async (disponibiliteId) => {
        if (!patientEmail) {
            alert("Veuillez vous connecter pour réserver");
            return;
        }

        try {
            await api.post(
                "/api/rendezvous/reserver",
                { disponibiliteId, patientEmail },
                { headers: { 'Content-Type': 'application/json' } }
            );

            window.dispatchEvent(new Event('new-notification'));

            setEvents(prevEvents =>
                prevEvents.map(event =>
                    event.disponibiliteId === disponibiliteId
                        ? { ...event,
                            title: "Votre RDV",
                            isDisponible: false,
                            className: "event-votre-rdv",
                            style: {
                                backgroundColor: "#c8e6c9",
                                borderLeft: "3px solid #2e7d32"
                            }
                        }
                        : event
                )
            );

            alert("Réservation confirmée !");
        } catch (error) {
            const errorMessage = error.response?.data?.message ||
                error.response?.data ||
                "Erreur lors de la réservation";
            alert(`Échec : ${errorMessage}`);
        }
    };

    const eventStyleGetter = (event) => {
        return {
            className: event.className,
            style: {
                ...event.style,
                borderRadius: "4px",
                border: "none",
                color: "#333",
                cursor: event.isDisponible ? "pointer" : "not-allowed",
                opacity: 1
            }
        };
    };

    return (
        <div className="calendar-container">
            <h2>Calendrier de réservation</h2>
            <div className="calendar-legend">
                <div className="legend-item">
                    <div className="color-box disponible"></div>
                    <span>Disponible</span>
                </div>
                <div className="legend-item">
                    <div className="color-box reserve"></div>
                    <span>Réservé</span>
                </div>
                <div className="legend-item">
                    <div className="color-box votre-rdv"></div>
                    <span>Votre RDV</span>
                </div>
            </div>

            <Calendar
                localizer={localizer}
                events={events}
                step={30}
                timeslots={2}
                min={new Date().setHours(8, 0)}
                max={new Date().setHours(18, 0)}
                defaultView="week"
                views={["day", "week", "month"]}
                messages={{
                    today: "Aujourd'hui",
                    previous: "Précédent",
                    next: "Suivant",
                    month: "Mois",
                    week: "Semaine",
                    day: "Jour"
                }}
                onSelectEvent={event => {
                    if (!event.isDisponible) return;
                    if (window.confirm(
                        `Confirmer la réservation pour ${moment(event.start).format('dddd D MMMM [à] HH:mm')} ?`
                    )) {
                        handleReservation(event.disponibiliteId);
                    }
                }}
                eventPropGetter={eventStyleGetter}
            />
        </div>
    );
};

export default Calendrier;