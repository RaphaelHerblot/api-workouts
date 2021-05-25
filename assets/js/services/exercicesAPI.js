import axios from "axios";

function findAll() {
    return axios
    .get("http://localhost:8000/api/exercices")
    .then(response => response.data['hydra:member'])
}

function findAllMusculations() {
    return axios
    .get("http://localhost:8000/api/exercices?order[title]=asc", {
        params: {
            type: "Musculation"
        }
    })
    .then(response => response.data['hydra:member'])
}

function findAllStretches() {
    return axios
    .get("http://localhost:8000/api/exercices?order[title]=asc", {
        params: {
            type: "Stretch"
        }
    })
    .then(response => response.data['hydra:member'])
}

function findOne(id) {
    return axios
    .get("http://localhost:8000/api/exercices/"+ id)
}

export default {
    findAll,
    findOne,
    findAllMusculations,
    findAllStretches
}