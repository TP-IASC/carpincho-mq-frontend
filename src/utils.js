import Axios from "axios";
import config from "./config.json";


const node = `http://${config.node.address}:${config.node.port}`;

export function handleError(error) {
    var message = "";
    if(error.response) {
        message = `${error.response.data.type}:\n\n${error.response.data.description}`;
    } else if(error.request) {
        message = `${error.request}`;
    } else {
        message = error.message;
    }
    alert(message);
}

export function carpinchoGet(endpoint) {
    return Axios.get(node + endpoint);
}

export function carpinchoPost(endpoint, data) {
    return Axios.post(node + endpoint, data);
}

export function carpinchoDelete(endpoint, data = {}) {
    return Axios.delete(node + endpoint, data);
}