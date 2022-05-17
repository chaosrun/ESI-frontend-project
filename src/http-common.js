import { axios } from "axios";

export default axios.create({
    apiURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
        "content-type": "application/json"
    }
});