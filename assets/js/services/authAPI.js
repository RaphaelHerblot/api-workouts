import axios from "axios";
import jwtDecode from "jwt-decode";
import { USERS_API, LOGIN_API } from "../config";

function authentification(credentials) {
    return axios
        .post(LOGIN_API, credentials)
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

function findConnectedUser() {
    const token = jwtDecode(window.localStorage.getItem("authToken"));
    return axios
        .get(USERS_API + "/" + token.id)
}

export default {
    authentification,
    logout,
    setup,
    isAuthenticated,
    findConnectedUser
}