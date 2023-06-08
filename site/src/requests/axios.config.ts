import axios from "axios";

let user = { token: "" };

if (typeof window !== "undefined") {
    user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") ?? "") : {};
}

const axios_instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_API,
    headers: user?.token
        ? {
              common: {
                  Authorization: `Bearer ${user?.token}`
              }
          }
        : {}
});

export default axios_instance;
