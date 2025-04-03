import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1/',
    headers: {
        "Content-Type": "application/json",
    },
});


api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {

        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error)
        return Promise.reject(error);
    }
);

export default api;
