import axios from '../axios';

const DiagnosticAPI = {
    startDiagnosis: async () => {
        try {
            const response = await axios.post('/api/diagnostic/start');

            const [sessionId, firstQuestion] = response.data.split(',');
            return {sessionId, firstQuestion} ;
        } catch (error) {
            console.error("Error starting diagnosis:", error);
            throw error;
        }
    },

    submitAnswer: async (sessionId, answer) => {
        try {
            const response = await axios.post(`/api/diagnostic/answer/${sessionId}`, answer, {
                headers: { 'Content-Type': 'text/plain' }
            });
            return response.data;
        } catch (error) {
            console.error("Error submitting answer:", error);
            throw error;
        }
    }
};

export default DiagnosticAPI;