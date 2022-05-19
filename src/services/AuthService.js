import { axios } from "axios"; 

class AuthService{
    authenticate(token) {
        return axios
            .get(`${process.env.VUE_APP_API_BASE_URL}/auth`, { header: { "content-type": "application/json",'Authorization': `Basic ${token}` } });
    }
    logout() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();