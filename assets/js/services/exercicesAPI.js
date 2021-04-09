import axios from "axios";

function findAll() {
    return axios
    .get("http://localhost:8000/api/exercices")
    .then(response => response.data['hydra:member'])
}

function findOne(id) {
    return axios
    .get("http://localhost:8000/api/exercices/"+ id)
}

export default {
    findAll,
    findOne
}