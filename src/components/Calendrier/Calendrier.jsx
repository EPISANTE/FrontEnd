import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";
import api from "../../axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendrier.css";

moment.locale("en");
const localizer = momentLocalizer(moment);

const Calendrier = ({ disponibilites = [] }) => {
    const [events, setEvents] = useState([]);
    const [patientEmail, setPatientEmail] = useState(null);

    // Récupérer l'email du patient depuis le localStorage
    useEffect(() => {
        const storedPatientEmail = localStorage.getItem("patientEmail");
        if (storedPatientEmail) {
            setPatientEmail(storedPatientEmail);
        } else {
            console.warn("Aucun utilisateur connecté. Redirection vers la page de connexion...");
            // Rediriger vers la page de connexion
        }
    }, []);

    // Transformer les disponibilités en événements du calendrier
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

    // Charger les événements du calendrier
    useEffect(() => {
        const allEvents = transformDisponibilitesEnEvents(disponibilites);
        setEvents(allEvents);
    }, [disponibilites]);

    const handleSelectEvent = async (event) => {
        if (!event.isDisponible) {
            alert("Ce créneau n'est pas disponible.");
            return;
        }

        if (!patientEmail) {
            alert("Vous devez être connecté pour réserver un rendez-vous.");
            return;
        }

        // Confirmation avant la réservation
        const confirmation = window.confirm("Êtes-vous sûr de vouloir réserver ce rendez-vous ?");
        if (!confirmation) {
            return; // Annuler la réservation si l'utilisateur clique sur "Non"
        }

        console.log("disponibiliteId :", event.disponibiliteId);
        console.log("patientEmail :", patientEmail);

        try {
            const response = await api.post(`/api/rendezvous/reserver`, null, {
                params: {
                    disponibiliteId: event.disponibiliteId,
                    patientEmail: patientEmail,
                },
            });
            alert("Rendez-vous réservé avec succès !");
            console.log("Réservation réussie :", response.data);

            // Mettre à jour les événements pour rendre le créneau indisponible
            const updatedEvents = events.map((evt) => {
                if (evt.disponibiliteId === event.disponibiliteId) {
                    return { ...evt, isDisponible: false, className: "event-indisponible" };
                }
                return evt;
            });
            setEvents(updatedEvents);
        } catch (error) {
            console.error("Erreur lors de la réservation :", error);
            console.error("Détails de l'erreur :", error.response.data); // Afficher les données de la réponse
            console.error("Statut de l'erreur :", error.response.status); // Afficher le statut HTTP
            console.error("En-têtes de l'erreur :", error.response.headers); // Afficher les en-têtes
            alert("Erreur lors de la réservation.");
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-lg font-bold mb-2 text-gray-800">📅 Calendrier des disponibilités</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectEvent={handleSelectEvent} // Associer la fonction handleSelectEvent
                defaultView="week"
                views={["month", "week", "day"]}
                culture="en"
                min={new Date(0, 0, 0, 9, 0)} // Heure de début : 9h
                max={new Date(0, 0, 0, 17, 0)} // Heure de fin : 17h
                step={30} // Pas de 30 minutes
                timeslots={2} // Nombre de créneaux par heure
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