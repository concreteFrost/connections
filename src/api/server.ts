import axios from "axios";
import { baseUrl } from "../store/constants/baseUrl";
import { Registration } from "../store/interfaces/IServer";
import { headers } from "./utils/headers";

export function startServerAPI() {
    return new Promise((resolve, reject) => {
        axios({
            method: "POST",
            url: baseUrl + "/Server/Start",
            headers:headers
        }).then((res) => resolve(res))
            .catch((e) => reject(e))
    })
}

export function stopServerAPI() {
    return new Promise((resolve, reject) => {
        axios({
            method: "POST",
            url: baseUrl + "/Server/Stop",
            headers:headers
        }).then((res) => resolve(res))
            .catch((e) => reject(e))
    })
}

export function killServerAPI() {
    return new Promise((resolve, reject) => {
        axios({
            method: "POST",
            url: baseUrl + "/Server/Kill",
            headers:headers
        }).then((res) => resolve(res))
            .catch((e) => reject(e))
    })
}

export function getSettingsAPI() {
    return new Promise((resolve, reject) => {
        axios({
            method: "GET",
            url: baseUrl + "/Server/GetSettings",
            headers:headers
        }).then((res) => resolve(res))
            .catch((e) => reject(e))
    })
}

export function updateSettingAPI(id:number,value:string) {
    return new Promise((resolve, reject) => {
        axios({
            method: "POST",
            url: baseUrl + "/Server/UpdateSetting",
            headers:headers,
            data:{
                id:id,
                newValue:value
            }
        }).then((res) => resolve(res))
            .catch((e) => reject(e))
    })
}

export function keepAliveAPI(registration:Registration) {
    
    return new Promise((resolve, reject) => {
        axios({
            method: "POST",
            url: baseUrl + "/Server/KeepAlive",
            headers:headers,
            data:registration
        }).then((res) => resolve(res))
            .catch((e) => reject(e))
    })
}

