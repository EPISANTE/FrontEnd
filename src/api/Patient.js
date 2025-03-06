import axios from 'axios';

const API_BASE_URL = "http://localhost:9090/api/patients";

export const submitStressTest = (email, sr) => {
    return axios.get(`${API_BASE_URL}/stress`, {
        params: {
            email,
            sr
        },
        paramsSerializer: {
            indexes: null
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur dans le test de stress :", error);
            throw error;
        });
};

export const generatePatientBilan = (email) => {
    return axios.get(`${API_BASE_URL}/bilan`, {
        params: { email }
    })
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur dans la génération du bilan :", error);
            throw error;
        });
};

export const getPatientInfo = (email) => {
    return axios.get(`${API_BASE_URL}/info`, {
        params: { email }
    })
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur lors de la récupération des informations :", error);
            throw error;
        });
};

export const login = (email, password) => {
    return axios.post(`${API_BASE_URL}/login`, { email, password })
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur de connexion :", error);
            throw error;
        });
};

export const register = (patient) => {
    return axios.post(`${API_BASE_URL}/register`, patient)
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur d'inscription :", error);
            throw error;
        });
};