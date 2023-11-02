import axios from "axios";
import { baseUrl } from "../store/constants/baseUrl";
import { getAccessToken } from "../store/actions/storageActions";

export function startServerAPI() {
    return new Promise((resolve, reject) => {
        axios({
            method: "POST",
            url: baseUrl + "/Server/Start",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getAccessToken().token
            }
        }).then((res) => resolve(res))
            .catch((e) => reject(e))
    })
}

export function stopServerAPI() {
    return new Promise((resolve, reject) => {
        axios({
            method: "POST",
            url: baseUrl + "/Server/Stop",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getAccessToken().token
            }
        }).then((res) => resolve(res))
            .catch((e) => reject(e))
    })
}

export function killServerAPI() {
    return new Promise((resolve, reject) => {
        axios({
            method: "POST",
            url: baseUrl + "/Server/Kill",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getAccessToken().token
            }
        }).then((res) => resolve(res))
            .catch((e) => reject(e))
    })
}
