import axios from "axios";
import { baseUrl } from "../store/constants/baseUrl";
import { getAccessToken } from "../store/actions/storageActions";
import { IAlertFormat, IDirective, INewAlertFormat} from "../store/interfaces/IAlerts";
import { ISubscription } from "../store/interfaces/INotification";

// Function to generate headers with authorization token
function generateJSONHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken().token,
    };
}

function generateHeaders(){
    return {
        Authorization: "Bearer " + getAccessToken().token,
    };
}

//GET
export function getDirectivesApi() {
    return axios.get(baseUrl + "/Ehd/GetDirectives", {
        headers: generateJSONHeaders()
    });
}

export function getAlertFormatsApi() {
    return axios.get(baseUrl + "/Ehd/GetAlertFormats", {
        headers: generateJSONHeaders()
    });
}

//POST
export function addDirectiveApi(directive: IDirective) {

    const {category,ehControlId,...rest} = directive
    return axios.post(baseUrl + "/Ehd/AddDirective", rest, {
        headers: generateJSONHeaders()
    });
}

export function updateDirectiveApi(directive: IDirective) {
    return axios.post(baseUrl + "/Ehd/UpdateDirective", directive, {
        headers: generateJSONHeaders()
    });
}

export function removeDirectiveApi(ehControlId: number) {
    return axios.post(baseUrl + "/Ehd/RemoveDirective", ehControlId, {
        headers: generateJSONHeaders()
    });
}

export function addAlertFormatApi(alertFormat: INewAlertFormat) {
    return axios.post(baseUrl + "/Ehd/AddAlertFormat", alertFormat, {
        headers: generateJSONHeaders()
    });
}

export function updateAlertFormatApi(alertFormat: IAlertFormat) {
    return axios.post(baseUrl + "/Ehd/UpdateAlertFormat", alertFormat, {
        headers: generateJSONHeaders()
    });
}

export function removeAlertFormatApi(alertFormatId: number) {
    return axios.post(baseUrl + "/Ehd/RemoveAlertFormat", alertFormatId, {
        headers: generateJSONHeaders()
    });
}

export function enabliClientAlertsApi(subscription: ISubscription) {
    return axios.post(baseUrl + "/Ehd/EnableClientAlerts", subscription, {
        headers: generateJSONHeaders()
    });
}

export function getAlertsApi(unreadOnly: boolean) {
    return axios.post(baseUrl + "/Ehd/GetAlerts", unreadOnly, {
        headers: generateJSONHeaders()
    });
}

export function alertMarkAsReadApi(alertId: number) {
    return axios.post(baseUrl + "/Ehd/AlertMarkAsRead",  alertId , {
      headers: generateJSONHeaders()
    });
  }
  

export function alertRemoveApi(alertId: number) {
    return axios.post(baseUrl + "/Ehd/AlertRemove", alertId, {
        headers: generateJSONHeaders()
    });
}
