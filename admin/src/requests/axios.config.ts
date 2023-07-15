import axios from "axios";

let token = "";

if (typeof window !== "undefined") {
    token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") ?? "") : {};
}

const axios_instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_API,
    headers: token
        ? {
              common: {
                  Authorization: `Bearer ${token}`
              }
          }
        : {}
});

export default axios_instance;
