import axios from "axios";

export default {
  user: {
    id: "",
    email: "",
    role: "",
    name: "",
    library: "",
    token: "",
    authenticated: false,
  },
  login: function (context, email, password) {
    let token = window.btoa(email + ":" + password);
    axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/auth`, {
        headers: { Authorization: `Basic ${token}` },
      })
      .then((response) => {
        this.user = response.data;
        this.user.token = token;
        this.user.authenticated = true;

        window.localStorage.setItem("token-" + this.email, token);
        window.localStorage.setItem("user", JSON.stringify(this.user));
        window.localStorage.setItem("user-token", token);
        window.localStorage.setItem("username", this.user.name);

        return this.user;
      })
      .then((user) => {
        if (user.role === process.env.VUE_APP_LIBRARIAN_ROLE) {
          context.$router.push({ name: "admin-dashboard" });
        } else {
          context.$router.push({ name: "user-dashboard" });
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid email or password");
      });
  },
  isRole: function (role) {
    return this.user.role == role;
  },
  logout: function () {
    window.localStorage.removeItem("token-" + this.username);
    window.localStorage.clear();
    this.user = {
      id: "",
      email: "",
      role: "",
      name: "",
      library: "",
      token: "",
      authenticated: false,
    };
  },
  authenticated: function () {
    return this.user.authenticated;
  },
  userID: function () {
    return this.user.id;
  }
};
