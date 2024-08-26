import {getEnvVariables} from "../helpers";
import axios from "axios";


const {VITE_BASE_URL} = getEnvVariables();

const automotiveWorkshopApi = axios.create({
    baseURL: VITE_BASE_URL
});

automotiveWorkshopApi.interceptors.request.use((config:any) => {
    config.headers = {
        ...config.headers,
        /* TODO: AQUI DEBERIA IR EL TOKEN
        'Authorization': `Bearer ${localStorage.getItem('token')}`
         */
    }
    return config;
});

export default automotiveWorkshopApi;