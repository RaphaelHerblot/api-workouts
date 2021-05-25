import axios from "axios";
import { WORKOUTS_API } from "../config";

function findAll() {
    return axios
    .get(WORKOUTS_API)
    .then(response => response.data['hydra:member'])
}

function findOne(id) {
    return axios
    .get(WORKOUTS_API + "/" + id)
}

function deleteWorkout(id) {
    return axios
    .delete(WORKOUTS_API + "/" + id)
}

function findAllByIdDesc() {
    return axios
    .get(WORKOUTS_API + "?order[id]=desc")
    .then(response => response.data['hydra:member'])
}

function findAllByMostFav() {
    return axios
    .get(WORKOUTS_API + "?order[likedUsers]=desc",{
        params: {
            _limit: 2
        }
    })
    .then(response => response.data['hydra:member'])
}

function findPerfectForUser(levelId, goalId, trainingPlaceId) {
    return axios
    .get(WORKOUTS_API + "?level=" + levelId + "&goal=" + goalId + "&trainingPlace=" + trainingPlaceId)
    .then(response => response.data['hydra:member'])
}

export default {
    findAll,
    findOne,
    delete: deleteWorkout,
    findAllByIdDesc,
    findAllByMostFav,
    findPerfectForUser
}