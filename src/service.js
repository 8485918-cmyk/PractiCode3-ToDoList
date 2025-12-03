import axios from 'axios';

//axios.defaults.baseURL = "http://localhost:5049";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(
  response => response,
  error => {
    console.error("שגיאת axios:", error.response ? error.response.data : error.message);
    if (error.response && error.response.status == 401) {
      window.location.href = "/login.html";
    }
    return Promise.reject(error);
  }
);


export default {
  getTasks: async () => {
    const result = await axios.get('/items');
    return result.data;
  },

  addTask: async (name) => {
    const newTask = { name, isComplete: false };
    const result = await axios.post('/items', newTask);
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    const result = await axios.put(`/items/${id}`, { id, name, isComplete });
    return result.data;
  },

  deleteTask: async (id) => {
    await axios.delete(`/items/${id}`);
  }
};
