import axios, { AxiosResponse } from "axios";


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
    return response.data;
}, function (error) {
    return Promise.reject(error);
})

export const setHeader = (userId: string, accessToken: string) => {
    instance.defaults.headers['x-client-id'] = userId;
    instance.defaults.headers['authorization'] = `Bearer ${accessToken}`;
}

export default instance