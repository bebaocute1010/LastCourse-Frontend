import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.BASE_API_URL,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
        config.headers.Accept = "application/json"
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    const newToken = response.data.access_token;
    if (newToken) {
        localStorage.setItem('token', newToken);
    }
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default instance