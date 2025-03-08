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

    useEffect(() => {
        const storedPatientEmail = localStorage.getItem("patientEmail");
        storedPatientEmail && setPatientEmail(storedPatientEmail);
    }, []);

    const transformDisponibilitesEnEvents = (disponibilites) => {
        return disponibilites.flatMap(dispo => {
            const startDate = moment(dispo.date).startOf('day');

            return Array.from({ length: 8 }, (_, i) => {
                const startHour = 9 + (i * 0.5);
                return {
                    title: `Créneau ${i + 1}`,
                    start: startDate.clone().add(startHour, 'hours').toDate(),
                    end: startDate.clone().add(startHour + 0.5, 'hours').toDate(),
                    isDisponible: !dispo.reserve,
                    disponibiliteId: dispo.id,
                    className: dispo.reserve ? "event-indisponible" : "event-disponible"
                };
            });
        });
    };

    useEffect(() => {
        setEvents(transformDisponibilitesEnEvents(disponibilites));
    }, [disponibilites]);

    const handleReservation = async (disponibiliteId) => {
        try {
            await api.post("/api/rendezvous/reserver",
                { disponibiliteId, patientEmail },
                { headers: { 'Content-Type': 'application/json' } }
            );

            setEvents(events.map(event =>
                event.disponibiliteId === disponibiliteId
                    ? { ...event, isDisponible: false, className: "event-indisponible" }
                    : event
            ));
            alert("Réservation confirmée !");
        } catch (error) {
            alert(error.response?.data?.message || "Erreur de réservation");
        }
    };

    return (
        <div className="calendar-container">
            <Calendar
                localizer={localizer}
                events={events}
                step={30}
                timeslots={2}
                onSelectEvent={event => {
                    if (!event.isDisponible) return;
                    if (confirm(`Réserver le créneau du ${moment(event.start).format('HH:mm')} ?`)) {
                        handleReservation(event.disponibiliteId);
                    }
                }}
                eventPropGetter={event => ({
                    className: event.className,
                    style: {
                        cursor: event.isDisponible ? 'pointer' : 'not-allowed'
                    }
                })}
                min={new Date().setHours(8, 0)}
                max={new Date().setHours(18, 0)}
            />
        </div>
    );
};

export default Calendrier;