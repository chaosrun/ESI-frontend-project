import { axios } from "axios"; 

class AuthService{
    authenticate(token) {
        return axios
            .get("https://esi-project-team-j.herokuapp.com/auth", { header: { "content-type": "application/json",'Authorization': `Basic ${token}` } });
    }
    logout() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();