import axios from 'axios';

const API_BASE_URL = "http://172.31.253.114:9090/api/notifications";

// Récupérer les notifications d'un patient par ID
export const getNotificationsByPatientId = (patientId) => {
    return axios.get(`${API_BASE_URL}/patient/${patientId}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur lors de la récupération des notifications :", error);
            throw error;
        });
};