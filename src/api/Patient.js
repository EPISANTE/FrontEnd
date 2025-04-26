import api from './api'; // Adjust the path if needed

export const submitStressTest = (email, sr) => {
    return api.get('/api/patients/stress', {
        params: { email, sr },
        paramsSerializer: { indexes: null }
    })
        .then(res => res.data)
        .catch(err => {
            console.error("Erreur dans le test de stress :", err);
            throw err;
        });
};

export const generatePatientBilan = (email) => {
    return api.get('/api/patients/bilan', { params: { email } })
        .then(res => res.data)
        .catch(err => {
            console.error("Erreur dans la génération du bilan :", err);
            throw err;
        });
};

export const getPatientInfo = (email) => {
    return api.get('/api/patients/info', { params: { email } })
        .then(res => res.data)
        .catch(err => {
            console.error("Erreur lors de la récupération des informations :", err);
            throw err;
        });
};

export const login = (email, password) => {
    return api.post('/api/patients/login', { email, password })
        .then(res => res.data)
        .catch(err => {
            console.error("Erreur de connexion :", err);
            throw err;
        });
};

export const register = (patient) => {
    return api.post('/api/patients/register', patient)
        .then(res => res.data)
        .catch(err => {
            console.error("Erreur d'inscription :", err);
            throw err;
        });
};
