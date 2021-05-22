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

function findAllByIdDesc() {
    return axios
    .get("http://localhost:8000/api/workouts?order[id]=desc")
    .then(response => response.data['hydra:member'])
}

function findAllByMostFav() {
    return axios
    .get("http://localhost:8000/api/workouts?order[likedUsers]=desc",{
        params: {
            _limit: 2
        }
    })
    .then(response => response.data['hydra:member'])
}

function findAllById(id) {
    return axios
    .get("http://localhost:8000/api/workouts?id="+ id)
    .then(response => response.data['hydra:member'])
}

export default {
    findAll,
    findOne,
    delete: deleteWorkout,
    findAllByIdDesc,
    findAllByMostFav
}