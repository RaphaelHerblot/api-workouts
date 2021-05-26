import axios from "axios";
import { WORKOUTS_API } from "../config";

// Find all workouts
function findAll() {
    return axios
    .get(WORKOUTS_API)
    .then(response => response.data['hydra:member'])
}

// Find one workout by its id
function findOne(id) {
    return axios
    .get(WORKOUTS_API + "/" + id)
}

// Delete a workout by its id
function deleteWorkout(id) {
    return axios
    .delete(WORKOUTS_API + "/" + id)
}

// Find all workouts by order of creation (desc)
function findAllByIdDesc() {
    return axios
    .get(WORKOUTS_API + "?order[id]=desc")
    .then(response => response.data['hydra:member'])
}

// Find all the favorite workouts of a user
function findAllByMostFav() {
    return axios
    .get(WORKOUTS_API + "?order[likedUsers]=desc",{
        params: {
            _limit: 2
        }
    })
    .then(response => response.data['hydra:member'])
}

// Find all the perfect workouts of a user
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