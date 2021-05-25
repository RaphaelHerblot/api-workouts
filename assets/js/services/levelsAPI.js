import axios from "axios";
import { LEVELS_API } from "../config";

function findAll() {
    return axios
    .get(LEVELS_API)
    .then(response =>  response.data['hydra:member'])
}

export default {
    findAll
}