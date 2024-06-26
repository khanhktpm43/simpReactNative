
import axios from 'axios';

import AuthService from './AuthService';
const api = axios.create({
    baseURL: 'http://192.168.1.7:8080'
});

// Add a request interceptor
api.interceptors.request.use(
    async function (config) {
        await AuthService.checkTokenExpiration()
        // Retrieve token from AsyncStorage
        const token = await AuthService.getToken('token');
        // If token exists, add it to the request headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        else {
            ToastAndroid.show('Login session expired.', ToastAndroid.SHORT);
            navigation.replace('Login');
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default api;
