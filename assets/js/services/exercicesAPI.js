import axios from "axios";
import { EXERCISES_API } from "../config";

function findAll() {
    return axios
    .get(EXERCISES_API)
    .then(response => response.data['hydra:member'])
}

function findAllMusculations() {
    return axios
    .get(EXERCISES_API + "?order[title]=asc", {
        params: {
            type: "Musculation"
        }
    })
    .then(response => response.data['hydra:member'])
}

function findAllStretches() {
    return axios
    .get(EXERCISES_API + "?order[title]=asc", {
        params: {
            type: "Stretch"
        }
    })
    .then(response => response.data['hydra:member'])
}

function findOne(id) {
    return axios
    .get(EXERCISES_API + "/" + id)
}

export default {
    findAll,
    findOne,
    findAllMusculations,
    findAllStretches
}