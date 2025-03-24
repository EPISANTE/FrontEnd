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
        const creneauxUniques = new Set();

        return disponibilites.flatMap(dispo => {
            const creneaux = [];
            const periods = [
                { start: 9, end: 12 },
                { start: 13, end: 17 }
            ];

            periods.forEach(({ start, end }) => {
                let current = moment(dispo.date).set({ hour: start, minute: 0 });
                const finPeriode = moment(dispo.date).set({ hour: end, minute: 0 });
                let creneauIndex = 0;

                while (current.isBefore(finPeriode)) {
                    const finCreneau = moment(current).add(30, 'minutes');
                    const slotId = `${current.format()}-${finCreneau.format()}`;

                    if (!creneauxUniques.has(slotId)) {
                        creneauxUniques.add(slotId);

                        const estReserve = dispo.reserve || creneauIndex % 3 === 0;

                        creneaux.push({
                            title: estReserve ? "Réservé" : "Disponible",
                            start: current.toDate(),
                            end: finCreneau.toDate(),
                            disponibiliteId: dispo.id,
                            isDisponible: !estReserve,
                            style: {
                                backgroundColor: estReserve ? "#FF0000" : "#2196F3",
                                color: "#FFFFFF",
                                borderRadius: "4px",
                                border: estReserve ? "2px solid #CC0000" : "2px solid #1976D2",
                                cursor: estReserve ? "not-allowed" : "pointer",
                                opacity: 1,
                                transition: "all 0.2s ease"
                            }
                        });
                    }
                    current = finCreneau;
                    creneauIndex++;
                }
            });
            return creneaux;
        });
    };
    useEffect(() => {
        setEvents(genererEvenements(disponibilites));
    }, [disponibilites, patientEmail]);

    const reserverCreneau = async (disponibiliteId, eventIndex) => {
        if (!patientEmail) {
            alert("Connectez-vous pour réserver");
            return;
        }

        try {
            await api.post("/api/rendezvous/reserver",
                { disponibiliteId, patientEmail },
                { headers: { "Content-Type": "application/json" } }
            );


            setEvents(prev => prev.map((event, index) =>
                index === eventIndex
                    ? {
                        ...event,
                        title: "Réservé",
                        isDisponible: false,
                        style: {
                            ...event.style,
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
                timeslots={2}
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
                        const eventIndex = events.findIndex(e => e.disponibiliteId === event.disponibiliteId && e.start === event.start);
                        reserverCreneau(event.disponibiliteId, eventIndex);
                    }
                }}
                eventPropGetter={eventStyleGetter}
            />


        </div>
    );
};

export default Calendrier;
