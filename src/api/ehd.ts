import axios from "axios";
import { baseUrl } from "../store/constants/baseUrl";
import { getAccessToken } from "../store/actions/storageActions";
import { IAlertFormat, IDirective, INewAlertFormat} from "../store/interfaces/IAlerts";
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

    const {category,ehControlId,...rest} = directive
    return axios.post(baseUrl + "/Ehd/AddDirective", rest, {
        headers: generateHeaders()
    });
}

export function updateDirectiveApi(directive: IDirective) {
    return axios.post(baseUrl + "/Ehd/UpdateDirective", directive, {
        headers: generateHeaders()
    });
}

export function removeDirectiveApi(ehControlId: number) {
    return axios.post(baseUrl + "/Ehd/RemoveDirective", ehControlId, {
        headers: generateHeaders()
    });
}

export function addAlertFormatApi(alertFormat: INewAlertFormat) {
    return axios.post(baseUrl + "/Ehd/AddAlertFormat", alertFormat, {
        headers: generateHeaders()
    });
}

export function updateAlertFormatApi(alertFormat: IAlertFormat) {
    return axios.post(baseUrl + "/Ehd/UpdateAlertFormat", alertFormat, {
        headers: generateHeaders()
    });
}

export function removeAlertFormatApi(alertFormatId: number) {
    return axios.post(baseUrl + "/Ehd/RemoveAlertFormat", alertFormatId, {
        headers: generateHeaders()
    });
}

export function enabliClientAlertsApi(subscription: ISubscription) {
    return axios.post(baseUrl + "/Ehd/EnableClientAlerts", subscription, {
        headers: generateHeaders()
    });
}

export function getAlertsApi(unreadOnly: boolean) {
    return axios.post(baseUrl + "/Ehd/GetAlerts", unreadOnly, {
        headers: generateHeaders()
    });
}

export function alertMarkAsReadApi(alertId: number) {
    return axios.post(baseUrl + "/Ehd/AlertMarkAsRead", alertId, {
        headers: generateHeaders()
    });
}

export function alertRemoveApi(alertId: number) {
    return axios.post(baseUrl + "/Ehd/AlertRemove", alertId, {
        headers: generateHeaders()
    });
}
