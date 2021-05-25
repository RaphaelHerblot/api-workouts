import axios from "axios";
import { TRAINING_PLACES_API } from "../config";

function findAll() {
    return axios
    .get(TRAINING_PLACES_API)
    .then(response => response.data['hydra:member'])
}

export default {
    findAll
}