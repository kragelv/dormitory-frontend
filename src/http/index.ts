import axios from "axios";
import { TOKEN_KEY, refresh } from "../store/action-creators/auth";
import { store } from "../store/store";

export const API_URL = 'http://localhost:8080/api';

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token !== null) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    if (error.response?.status == 401 && error.config && !error.config._isRetry) {
        const origRequest = error.config;
        origRequest._isRetry = true;
        await store.dispatch(refresh());
        return $api.request(origRequest);
    }
    throw error;
});

export default $api;