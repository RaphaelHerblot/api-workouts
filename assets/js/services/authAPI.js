import axios from "axios";
import jwtDecode from "jwt-decode";

function authentification(credentials) {
    return axios
        .post("http://localhost:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem("authToken", token);
            axios.defaults.headers["Authorization"] = "Bearer " + token;

            return true;
        })
}

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setup() {
    const token = window.localStorage.getItem("authToken");

    if(token) {
        const {exp: expiration} = jwtDecode(token);

        if(expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token);
        } else {
            logout();         
        }
    } else {
        logout();
    }
}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");
    if(token) {
        const {exp: expiration} = jwtDecode(token);

        if(expiration * 1000 > new Date().getTime()) {
            return true;
        }
        return false;
    }
    return false;
}

function getUserInfo() {
    const token = window.localStorage.getItem("authToken");
    console.log("HELLLLLLO JWT : ", jwtDecode(token));
}

export default {
    authentification,
    logout,
    setup,
    isAuthenticated,
    getUserInfo
}