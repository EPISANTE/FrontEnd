import axios from 'axios';

const API_BASE_URL = "http://172.31.253.114:9090/api/rendezvous";


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