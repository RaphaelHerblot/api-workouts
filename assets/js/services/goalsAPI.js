import axios from "axios";
import { GOALS_API } from "../config";

// Find all goals
function findAll() {
    return axios
    .get(GOALS_API)
    .then(response => response.data['hydra:member'])
}

export default {
    findAll
}