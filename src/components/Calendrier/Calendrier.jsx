import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";
import api from "../../axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendrier.css";

// Configuration de moment.js pour l'affichage en anglais
moment.locale("en");
const localizer = momentLocalizer(moment);

const Calendrier = ({ disponibilites = [], patientId }) => {
    const [events, setEvents] = useState([]);

    // Fonction pour transformer les disponibilites en evenements du calendrier
    const transformDisponibilitesEnEvents = (disponibilites) => {
        const allEvents = [];

        disponibilites.forEach((dispo) => {
            console.log("Verification - Date:", dispo.date, "Periode:", dispo.periode);

            // Convertir la date de la disponibilite en objet Date
            const startDate = dispo.date
                ? moment(dispo.date, "YYYY-MM-DD").toDate()
                : moment().day(dispo.jour).toDate();

            console.log("Date traitee :", startDate);

            // Definir les heures de debut et de fin en fonction de la periode (MATIN ou APRES-MIDI)
            const startHour = dispo.periode === "MATIN" ? 9 : 14;
            const endHour = dispo.periode === "MATIN" ? 13 : 17;
            let startTime = moment(startDate).set({ hour: startHour, minute: 0 });

            // Creer des creneaux de 30 minutes pour la periode donnee
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

    // Effet pour generer les evenements du calendrier lorsque les disponibilites changent
    useEffect(() => {
        console.log("Disponibilites recues dans le Calendrier :", disponibilites);

        if (!Array.isArray(disponibilites) || disponibilites.length === 0) {
            console.warn("Aucune disponibilite recue.");
            setEvents([]);
            return;
        }

        // Transformer les disponibilites en evenements et les stocker dans le state
        const allEvents = transformDisponibilitesEnEvents(disponibilites);
        console.log("Evenements generes :", allEvents);
        setEvents(allEvents);
    }, [disponibilites]);

    // Fonction pour gerer la selection d'un evenement (creneau horaire)
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
            // Envoyer une requete pour reserver le creneau selectionne
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
            alert("Une erreur est survenue lors de la reservation.");
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