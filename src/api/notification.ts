import axios from "axios";
import { baseUrl } from "../store/constants/baseUrl";
import { getAccessToken } from "../store/actions/storageActions";
import { INotification } from "../store/interfaces/INotification";

export function getNotificationTypesAPI() {
    return new Promise((resolve, reject) => {
        axios.get(baseUrl + "/Notification/GetTypes", {
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

export function getNotificationsAPI(userId?: string, userGroup?: string) {
    return new Promise((resolve, reject) => {
        axios.get(baseUrl + "/Notification/List", {

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

export function newNotificationAPI(notificationRecord: INotification) {
    console.log(notificationRecord)
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: baseUrl + "/Notification/NewNotification",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getAccessToken().token,
            },

            data: notificationRecord

        })
            .then((res) => {
                resolve(res);
            })
            .catch((e) => reject(e));
    });
}


export function removeNotificationAPI(notificationID: string) {
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: baseUrl + "/Notification/RemoveNotification",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getAccessToken().token,
            },
            params: {
                notificationId: notificationID
            }
        })
            .then((res) => {
                resolve(res);
            })
            .catch((e) => reject(e));
    });
}

export function updateNotificationAPI(notificationRecord: INotification) {
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: baseUrl + "/Notification/UpdateNotification",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getAccessToken().token,
            },
            data: notificationRecord

        })
            .then((res) => {
                resolve(res);
            })
            .catch((e) => reject(e));
    });
}

export function registerClientNotificationAPI(notificationId: string, callbackURI: string) {
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: baseUrl + "/Notification/RegisterClientNotification",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getAccessToken().token,
            },
            params: {
                notificationId: notificationId,
                callbackURI: callbackURI
            }
        })
            .then((res) => {
                resolve(res);
            })
            .catch((e) => reject(e));
    });
}

/**
 * 
 * @param yourCallbackUrl - your client url you want to receive a callback from
 * @param user -credentials: username to access your client url
 * @param pass -credentials: password to access your client url
 * @param anyText -Text here will be changed before sending to the client url as HttpContent string
 * @returns 
 */

export function testClientCallbackAPI(yourCallbackUrl: string, user: string, pass: string, anyText: string) {
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: baseUrl + "/Notification/TestClientCallback",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getAccessToken().token,
            },
            params: {
                yourCallbackUrl: yourCallbackUrl,
                user: user,
                pass: pass,
                anyText: anyText
            }
        })
            .then((res) => {
                resolve(res);
            })
            .catch((e) => reject(e));
    });
}










