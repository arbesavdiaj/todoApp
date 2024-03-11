import axios from "./axios";
const authApi = {
    register: async (userData) => {
        try {
            const response = await axios.post("/auth/register", userData);
            console.log(response)
            return response.data;
        } catch (error) {
            throw error.response.data
        }
    },
    login: async (email, password) => {
        try {
            const response = await axios.post("/auth/login", { email: email, password: password });
            console.log(response.data)
            return response.data;
        } catch (error) {
            throw error.response.data.message
        }
    },
    logout: async () => {
        try {
            const response = await axios.post("/auth/logout");
            return response
        } catch (error) {
            throw error.response ? error.response.data.message : 'Server Error';
        }
    }
};

export default authApi;