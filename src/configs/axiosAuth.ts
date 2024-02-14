import axios, { AxiosResponse } from "axios";
import { AuthService } from "../services";

const instance = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true
})

instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
})

instance.interceptors.response.use(function (response: AxiosResponse): AxiosResponse {
    if (response.config.url === '/auth/login') {
        const { accessToken, id } = response.data.data;
        localStorage.setItem('token', accessToken);
        instance.defaults.headers['x-client-id'] = id;
        instance.defaults.headers['authorization'] = `Bearer ${accessToken}`;
    }

    return response?.data;
}, async function (error) {

    if (error?.response?.data?.message === 'Token is expired') {
        const prevRequest = error.config;
        const token = localStorage.getItem('token');
        if (token) {
            const userId = prevRequest.headers['x-client-id'];
            const response = await AuthService.refreshToken(token, userId);
            const newAccessToken = response.data.accessToken;
            if (response.status !== 200) {
                localStorage.removeItem('token');
                return Promise.reject(error);
            }

            if (error?.config?.url === '/auth/validate') {
                prevRequest.data = JSON.stringify({ token: newAccessToken });
            } else {
                prevRequest.headers['authorization'] = `Bearer ${newAccessToken}`;

            }
            instance.defaults.headers['authorization'] = `Bearer ${newAccessToken}`;
            localStorage.setItem('token', newAccessToken);
            return instance.request(prevRequest);
        }
    }

    if (error?.response?.data?.message === 'Refresh Token is expired') {
        localStorage.removeItem('token');
        return Promise.reject(error);
    }

    return Promise.reject(error);
})

export const setHeader = (userId: string, accessToken: string) => {
    instance.defaults.headers['x-client-id'] = userId;
    instance.defaults.headers['authorization'] = `Bearer ${accessToken}`;
}

export default instance