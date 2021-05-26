import axios from "axios";
import { EXERCISES_API } from "../config";

// Find all exercises
function findAll() {
    return axios
    .get(EXERCISES_API)
    .then(response => response.data['hydra:member'])
}

// Find all exercises by title order
function findAllMusculations() {
    return axios
    .get(EXERCISES_API + "?order[title]=asc", {
        params: {
            type: "Musculation"
        }
    })
    .then(response => response.data['hydra:member'])
}

// Find all stretches by title order
function findAllStretches() {
    return axios
    .get(EXERCISES_API + "?order[title]=asc", {
        params: {
            type: "Stretch"
        }
    })
    .then(response => response.data['hydra:member'])
}

// Find one exercise by its id
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