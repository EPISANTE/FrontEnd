
import React from 'react';
import './Modal.css';


const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Bouton de fermeture */}
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>
                {/* Contenu de la modale */}
                {children}
                {/* Bouton supplémentaire pour fermer la modale */}
                <button className="modal-close-button" onClick={onClose}>
                    Fermer
                </button>
            </div>
        </div>
    );
};

export default Modal;