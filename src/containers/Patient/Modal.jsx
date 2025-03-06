
// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Modal.css';


// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
                <button className="modal-close-button" onClick={onClose}>
                    Fermer
                </button>
            </div>
        </div>
    );
};

export default Modal;