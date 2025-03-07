import React, { useState } from "react";
import "./Notification.css";

const Notification = ({ notifications }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="notification-container">
            <button className="notification-icon" onClick={() => setIsOpen(!isOpen)}>
                🔔
            </button>

            {isOpen && (
                <div className="notification-dropdown">
                    {notifications.length === 0 ? (
                        <p>Aucune notification disponible.</p>
                    ) : (
                        notifications.map((notification) => (
                            <div key={notification.id} className="notification-item">
                                <p>{notification.message}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Notification;