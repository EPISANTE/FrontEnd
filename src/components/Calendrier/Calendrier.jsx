import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendrier.css";

const localizer = momentLocalizer(moment);

const Calendrier = ({ disponibilites = [], onRdvPrendre }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (!Array.isArray(disponibilites) || disponibilites.length === 0) {
            console.warn("Aucune disponibilité reçue.");
            setEvents([]);
            return;
        }

        console.log("Disponibilités reçues :", disponibilites);

        const allEvents = [];


        const startDay = moment().startOf("week");
        const endDay = startDay.clone().add(1, "month");


        for (let date = startDay.clone(); date.isBefore(endDay, "day"); date.add(1, "day")) {
            if (date.isoWeekday() > 5) continue;

            for (let hour = 9; hour < 17; hour += 0.5) {
                let startTime = date.clone().set({ hour: Math.floor(hour), minute: (hour % 1) * 60 });
                let endTime = startTime.clone().add(30, "minutes");


                let isDisponible = disponibilites.some(dispo => {
                    return moment(dispo.date).isSame(date, "day") &&
                        dispo.periode === (hour < 13 ? "MATIN" : "SOIR");
                });

                allEvents.push({
                    title: isDisponible ? "Disponible" : "Indisponible",
                    start: startTime.toDate(),
                    end: endTime.toDate(),
                    allDay: false,
                    className: isDisponible ? "event-disponible" : "event-indispo",
                    isDisponible: isDisponible
                });
            }
        }

        setEvents(allEvents);
    }, [disponibilites]);

    const handleSelectEvent = (event) => {
        if (event.isDisponible) {
            onRdvPrendre(event.start);
        } else {
            alert("Ce créneau est indisponible.");
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-lg font-bold mb-2 text-gray-800"> Calendrier des disponibilités</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectEvent={handleSelectEvent}
                defaultView="week"
                views={["month", "week", "day"]}
                min={new Date(0, 0, 0, 9, 0)}
                max={new Date(0, 0, 0, 17, 0)}
                step={30}
                timeslots={2}
                eventPropGetter={(event) => ({
                    className: event.className,
                    style: {
                        fontSize: "14px",
                        borderRadius: "8px",
                        padding: "5px",
                        cursor: event.isDisponible ? "pointer" : "not-allowed"
                    }
                })}
                style={{ height: 500, maxWidth: "100%", margin: "auto" }}
            />
        </div>
    );
};

export default Calendrier;
