import axios from "axios"



export const API_URL =
process.env.NODE_ENV === "production"
    ? "http://somprourl.com/api"
    : "http://localhost:5000/"

const createInstance = (baseURL) => {
    const Instance = axios.create({

        baseURL: baseURL,
        headers: {"Content-Type": "application/json"},

    });
    return Instance;
}


export default createInstance(API_URL);