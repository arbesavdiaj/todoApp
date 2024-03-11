import axios from "./axios";
const taskApi = {
    create: async (taskData) => {
        try {
            const response = await axios.post("/task/create", taskData);
            console.log(response)
            return response.data;
        } catch (error) {
            throw error.response.data
        }
    },
    userTasks: async () => {
        try {
            const response = await axios.get("/task/userTasks");
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    deleteTask: async (taskId) => {
        try {
            await axios.delete(`/task/delete/${taskId}`);
            return true;
        } catch (error) {
            console.error('Error deleting task:', error);
            return false;
        }
    },
    updateTask: async (taskId, taskData) => {
        try {
            const response = await axios.put(`/task/update/${taskId}`, taskData);
            console.log(response);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
};
export default taskApi;