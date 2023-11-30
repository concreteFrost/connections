import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "../store/actions/storageActions";
import { baseUrl } from "../store/constants/baseUrl";

export function getUserListAPI() {
    return new Promise((resolve, reject) => {
        axios.get(baseUrl + "/Security/UserList", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getAccessToken().token,
            },

        })
            .then((res) => {
                resolve(res);
            })
            .catch((e) => reject(e));
    });
}

export function getGroupListAPI() {
    return new Promise((resolve, reject) => {
        axios.get(baseUrl + "/Security/GroupList", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getAccessToken().token,
            },

        })
            .then((res) => {
                resolve(res);
            })
            .catch((e) => reject(e));
    });
}