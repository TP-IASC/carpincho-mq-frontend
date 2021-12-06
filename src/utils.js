import Axios from "axios";
import config from "./config.json";


const node = `http://${config.node.address}:${config.node.port}`;

export function carpinchoGet(endpoint) {
    return Axios.get(node + endpoint);
}

export function carpinchoPost(endpoint, data) {
    return Axios.post(node + endpoint, data);
}