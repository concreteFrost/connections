import axios from "axios";
import { baseUrl } from "../store/constants/baseUrl";
import { getAccessToken } from "../store/actions/storageActions";
import { IAlertFormat, IDirective, INewAlertFormat, IUpdateDirective } from "../store/interfaces/IAlerts";
import { ISubscription } from "../store/interfaces/INotification";

// Function to generate headers with authorization token
function generateHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken().token,
    };
}

//GET
export function getDirectivesApi() {
    return axios.get(baseUrl + "/Ehd/GetDirectives", {
        headers: generateHeaders()
    });
}

export function getAlertFormatsApi() {
    return axios.get(baseUrl + "/Ehd/GetAlertFormats", {
        headers: generateHeaders()
    });
}

//POST
export function addDirectiveApi(directive: IDirective) {
    return axios.post(baseUrl + "/Ehd/AddDirective", directive, {
        headers: generateHeaders()
    });
}

export function UpdateDirectiveApi(directive: IUpdateDirective) {
    return axios.post(baseUrl + "/Ehd/UpdateDirective", directive, {
        headers: generateHeaders()
    });
}

export function RemoveDirectiveApi(ehControlId: number) {
    return axios.post(baseUrl + "/Ehd/RemoveDirective", ehControlId, {
        headers: generateHeaders()
    });
}

export function AddAlertFormatApi(alertFormat: INewAlertFormat) {
    return axios.post(baseUrl + "/Ehd/AddAlertFormat", alertFormat, {
        headers: generateHeaders()
    });
}

export function UpdateAlertFormatApi(alertFormat: IAlertFormat) {
    return axios.post(baseUrl + "/Ehd/UpdateAlertFormat", alertFormat, {
        headers: generateHeaders()
    });
}

export function RemoveAlertFormatApi(alertFormatId: number) {
    return axios.post(baseUrl + "/Ehd/RemoveAlertFormat", alertFormatId, {
        headers: generateHeaders()
    });
}

export function EnabliClientAlertsApi(subscription: ISubscription) {
    return axios.post(baseUrl + "/Ehd/EnableClientAlerts", subscription, {
        headers: generateHeaders()
    });
}

export function GetAlertsApi(unreadOnly: boolean) {
    return axios.post(baseUrl + "/Ehd/GetAlerts", unreadOnly, {
        headers: generateHeaders()
    });
}

export function AlertMarkAsReadApi(alertId: number) {
    return axios.post(baseUrl + "/Ehd/AlertMarkAsRead", alertId, {
        headers: generateHeaders()
    });
}

export function AlertRemoveApi(alertId: number) {
    return axios.post(baseUrl + "/Ehd/AlertRemove", alertId, {
        headers: generateHeaders()
    });
}
