import axios from 'axios';



export const submitStressTest = (email, sr) => {
    return axios.get(`http://172.31.250.99:9090/api/patients/stress`, {
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
    return axios.get(`http://172.31.250.99:9090/api/patients/bilan`, {
        params: { email }
    })
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur dans la génération du bilan :", error);
            throw error;
        });
};

export const getPatientInfo = (email) => {
    return axios.get(`http://172.31.250.99:9090/api/patients/info`, {
        params: { email }
    })
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur lors de la récupération des informations :", error);
            throw error;
        });
};

export const login = (email, password) => {
    return axios.post(`/api/patients/login`, { email, password })
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur de connexion :", error);
            throw error;
        });
};

export const register = (patient) => {
    return axios.post(`http://172.31.250.99:9090/api/patients/register`, patient)
        .then(response => response.data)
        .catch(error => {
            console.error("Erreur d'inscription :", error);
            throw error;
        });
};