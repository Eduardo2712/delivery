import axios from "axios";
import { refreshToken } from "./auth.request";

const axios_instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_API
});

axios_instance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") as string) : null;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios_instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const original_request = error.config;

        if (error.response.status === 401 && !original_request._retry) {
            original_request._retry = true;

            const response = await refreshToken(JSON.parse(localStorage.getItem("refresh_token") as string));

            const token = response.data.token;

            if (response) {
                localStorage.setItem("token", JSON.stringify(token));

                axios_instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                return axios_instance(original_request);
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("user");

                window.location.href = "/";
            }
        }
        return Promise.reject(error);
    }
);

export default axios_instance;
