import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import api from "../../axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendrier.css";

moment.locale("en");
const localizer = momentLocalizer(moment);

const Calendrier = ({ disponibilites = [], patientId }) => {
    const [events, setEvents] = useState([]);

    // Transformer les disponibilites en evenements du calendrier
    const transformDisponibilitesEnEvents = (disponibilites) => {
        const allEvents = [];

        disponibilites.forEach((dispo) => {
            const startDate = dispo.date
                ? moment(dispo.date, "YYYY-MM-DD").toDate()
                : moment().day(dispo.jour).toDate();

            const startHour = dispo.periode === "MATIN" ? 9 : 14;
            const endHour = dispo.periode === "MATIN" ? 13 : 17;
            let startTime = moment(startDate).set({ hour: startHour, minute: 0 });

            while (startTime.hour() < endHour) {
                const endTime = moment(startTime).add(30, "minutes");

                allEvents.push({
                    title: `Disponible (${startTime.format("HH:mm")})`,
                    start: new Date(startTime),
                    end: new Date(endTime),
                    allDay: false,
                    className: "event-disponible",
                    isDisponible: true,
                    disponibiliteId: dispo.id,
                });

                startTime = endTime;
            }
        });

        return allEvents;
    };

    // Charger les evenements du calendrier
    useEffect(() => {
        const allEvents = transformDisponibilitesEnEvents(disponibilites);
        setEvents(allEvents);
    }, [disponibilites]);

    // Gestion de la reservation d'un creneau
    const handleSelectEvent = async (event) => {
        if (!event.isDisponible) {
            alert("Ce creneau n'est pas disponible.");
            return;
        }

        if (!patientId) {
            alert("Vous devez etre connecte pour reserver un rendez-vous.");
            return;
        }

        try {
            // Envoyer une requete pour reserver le creneau
            const response = await api.post(`/api/rendezvous/reserver`, null, {
                params: {
                    disponibiliteId: event.disponibiliteId,
                    patientId: patientId,
                },
            });
            alert("Rendez-vous reserve avec succes !");
            console.log("Reservation reussie :", response.data);
        } catch (error) {
            console.error("Erreur lors de la reservation :", error);
            alert("Erreur lors de la reservation.");
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-lg font-bold mb-2 text-gray-800">📅 Calendrier des disponibilites</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectEvent={handleSelectEvent}
                defaultView="week"
                views={["month", "week", "day"]}
                culture="en"
                min={new Date(0, 0, 0, 9, 0)} // Heure de debut : 9h
                max={new Date(0, 0, 0, 17, 0)} // Heure de fin : 17h
                step={30} // Pas de 30 minutes
                timeslots={2} // Nombre de creneaux par heure
                eventPropGetter={(event) => ({
                    className: event.className,
                    style: {
                        fontSize: "14px",
                        borderRadius: "8px",
                        padding: "5px",
                        cursor: event.isDisponible ? "pointer" : "not-allowed",
                    },
                })}
                style={{ height: 500, maxWidth: "100%", margin: "auto" }}
            />
        </div>
    );
};

export default Calendrier;