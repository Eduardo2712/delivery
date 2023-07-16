import axios from "axios";

const axios_instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_API
});

axios_instance.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") ?? "") : {};

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } else {
        // TODO
    }

    return config;
});

axios_instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export default axios_instance;
