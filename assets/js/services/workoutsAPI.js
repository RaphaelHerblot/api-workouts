import axios from "axios";

function findAll() {
    return axios
    .get("http://localhost:8000/api/workouts")
    .then(response => response.data['hydra:member'])
}

function findOne(id) {
    return axios
    .get("http://localhost:8000/api/workouts/"+ id)
}

function deleteWorkout(id) {
    return axios
    .delete("http://localhost:8000/api/workouts/"+ id)
}

export default {
    findAll,
    findOne,
    delete: deleteWorkout
}