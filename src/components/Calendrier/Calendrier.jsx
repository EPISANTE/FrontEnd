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
        const email = localStorage.getItem("patientEmail");
        if (email) setPatientEmail(email);
    }, []);

    const genererEvenements = (disponibilites) => {
        const creneauxTries = [...disponibilites].sort((a, b) =>
            new Date(a.dateHeure) - new Date(b.dateHeure)
        );

        return creneauxTries.map((dispo, index) => {
            const start = moment(dispo.dateHeure);
            const end = moment(dispo.dateHeure).add(30, 'minutes');

            const groupeIndex = index % 3;
            const estReserveVisuel = groupeIndex !== 0;
            const estReserve = dispo.reserve || estReserveVisuel;

            return {
                title: estReserve ? "Réservé" : "Disponible",
                start: start.toDate(),
                end: end.toDate(),
                disponibiliteId: dispo.id,
                isDisponible: !dispo.reserve,
                style: {
                    backgroundColor: estReserve ? "#FF0000" : "#2196F3",
                    color: "#FFFFFF",
                    borderRadius: "4px",
                    border: estReserve ? "2px solid #CC0000" : "2px solid #1976D2",
                    cursor: dispo.reserve ? "not-allowed" : "pointer",
                    opacity: 1,
                    transition: "all 0.2s ease"
                }
            };
        });
    };

    useEffect(() => {
        setEvents(genererEvenements(disponibilites));
    }, [disponibilites, patientEmail]);

    const reserverCreneau = async (disponibiliteId) => {
        if (!patientEmail) {
            alert("Connectez-vous pour réserver");
            return;
        }

        try {
            await api.post("/api/rendezvous/reserver",
                { disponibiliteId, patientEmail },
                { headers: { "Content-Type": "application/json" } }
            );

            setEvents(prev => prev.map(event =>
                event.disponibiliteId === disponibiliteId
                    ? { ...event,
                        title: "Réservé",
                        isDisponible: false,
                        style: { ...event.style,
                            backgroundColor: "#FF0000",
                            border: "2px solid #CC0000",
                            cursor: "not-allowed"
                        }
                    }
                    : event
            ));

            window.dispatchEvent(new Event('reservation-update'));
            alert("Réservé avec succès !");
        } catch (error) {
            alert("Échec : " + (error.response?.data?.message || "Erreur serveur"));
        }
    };

    const eventStyleGetter = (event) => ({
        style: event.style
    });

    return (
        <div className="calendar-container">
            <h2 className="titre-calendrier">Planification des rendez-vous</h2>
            <Calendar
                localizer={localizer}
                events={events}
                step={30}
                timeslots={1}
                min={new Date().setHours(8, 0)}
                max={new Date().setHours(18, 0)}
                defaultView="week"
                views={["day", "week", "month"]}
                messages={{
                    today: "Aujourd'hui",
                    previous: "◄",
                    next: "►",
                    month: "Mois",
                    week: "Semaine",
                    day: "Jour"
                }}
                onSelectEvent={event => {
                    if (event.isDisponible && window.confirm(
                        `Confirmer le rendez-vous le ${moment(event.start).format("dddd Do MMMM [à] HH:mm")} ?`
                    )) {
                        reserverCreneau(event.disponibiliteId);
                    }
                }}
                eventPropGetter={eventStyleGetter}
            />
        </div>
    );
};

export default Calendrier;