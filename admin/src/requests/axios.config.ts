import axios from "axios";
import { refreshToken } from "./auth.request";

const axios_instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_API
});

axios_instance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
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

        if (error.response && error.response.status === 401 && !original_request._retry) {
            original_request._retry = true;

            const refresh_token = localStorage.getItem("refresh_token");

            if (refresh_token) {
                try {
                    const response = await refreshToken(JSON.parse(refresh_token));
                    const token = response.data.token;

                    localStorage.setItem("token", JSON.stringify(token));
                    axios_instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                    return axios_instance(original_request);
                } catch (refreshError) {
                    console.error("Failed to refresh token:", refreshError);
                }
            }

            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");
        }
        return Promise.reject(error);
    }
);

export default axios_instance;
