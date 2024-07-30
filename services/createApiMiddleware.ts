import axios, { AxiosError } from 'axios';

export const createApiMiddleware = (url?: string) => {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    instance.interceptors.request.use(config => config);
    instance.interceptors.response.use(response => response, (error: AxiosError) => {
        // Handling network errors
        if (!error.response) {
            return Promise.reject(error);
        }

        return Promise.reject(error);
    });

    return instance;
};
