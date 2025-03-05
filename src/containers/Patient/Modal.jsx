
import React from 'react';
import './Modal.css';


const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">

                <button className="modal-close" onClick={onClose}>
                    ×
                </button>

                {children}

                <button className="modal-close-button" onClick={onClose}>
                    Fermer
                </button>
            </div>
        </div>
    );
};

export default Modal;