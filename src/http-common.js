import axios  from 'axios';
import authHeader from "./services/AuthHeader";

export default axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
        "content-type": "application/json",
        ...authHeader(),
    }
});
