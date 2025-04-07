import api from '../axios';

export const fetchStartNode = async () => {
    try {
        const response = await api.get('/api/decision/start');
        console.log("Fetched start node:", response.data);
        return response.data;
    } catch (error) {
        console.error("API Error fetching start node:", error);
        throw error;
    }
};


export const postAnswer = async (nodeId, answer) => {
    try {
        const requestData = { nodeId, answer };
        const response = await api.post('/api/decision/answer', requestData);
        console.log("Received next node:", response.data);
        return response.data;
    } catch (error) {
        console.error("API Error posting answer:", error);
        if (error.response && error.response.data && error.response.data.decision) {
            throw new Error(error.response.data.decision);
        }
        throw error;
    }
};