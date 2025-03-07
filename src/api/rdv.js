import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/rendezvous"; // Remplacez par l'URL de votre backend

// Récupérer les rendez-vous d'un patient par email
export const getRendezVousByEmail = (email) => {
    return axios.get(`${API_BASE_URL}/rendezvs`, {
        params: { email }
    })
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur lors de la récupération des rendez-vous :", error);
            throw error;
        });
};