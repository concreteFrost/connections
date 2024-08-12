import axios from "axios";
import { baseUrl } from "../store/constants/baseUrl";
import { getAccessToken } from "../store/actions/storageActions";
import {
  AlertFormat,
  Directive,
  NewAlertFormat,
} from "../store/interfaces/IAlerts";
import { Subscription } from "../store/interfaces/INotification";
import { headers } from "./utils/headers";

//GET
export function getDirectivesApi() {
  return axios.get(baseUrl + "/Ehd/GetDirectives", {
    headers: headers,
  });
}

export function getAlertFormatsApi() {
  return axios.get(baseUrl + "/Ehd/GetAlertFormats", {
    headers: headers,
  });
}

//POST
export function addDirectiveApi(directive: Directive) {
  const { category, ehControlId, ...rest } = directive;
  return axios.post(baseUrl + "/Ehd/AddDirective", rest, {
    headers: headers,
  });
}

export function updateDirectiveApi(directive: Directive) {
  return axios.post(baseUrl + "/Ehd/UpdateDirective", directive, {
    headers: headers,
  });
}

export function removeDirectiveApi(ehControlId: number) {
  return axios.post(baseUrl + "/Ehd/RemoveDirective", ehControlId, {
    headers: headers,
  });
}

export function addAlertFormatApi(alertFormat: NewAlertFormat) {
  return axios.post(baseUrl + "/Ehd/AddAlertFormat", alertFormat, {
    headers: headers,
  });
}

export function updateAlertFormatApi(alertFormat: AlertFormat) {
  return axios.post(baseUrl + "/Ehd/UpdateAlertFormat", alertFormat, {
    headers: headers,
  });
}

export function removeAlertFormatApi(alertFormatId: number) {
  return axios.post(baseUrl + "/Ehd/RemoveAlertFormat", alertFormatId, {
    headers: headers,
  });
}

export function enabliClientAlertsApi(subscription: Subscription) {
  return axios.post(baseUrl + "/Ehd/EnableClientAlerts", subscription, {
    headers: headers,
  });
}

export function disableClientAlertsApi() {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: baseUrl + "/Ehd/DisableClientAlerts",
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

export function getAlertsApi(unreadOnly: boolean) {
  return axios.post(baseUrl + "/Ehd/GetAlerts", unreadOnly, {
    headers: headers,
  });
}

export function alertMarkAsReadApi(alertId: number) {
  return axios.post(baseUrl + "/Ehd/AlertMarkAsRead", alertId, {
    headers: headers,
  });
}

export function alertRemoveApi(alertId: number) {
  return axios.post(baseUrl + "/Ehd/AlertRemove", alertId, {
    headers: headers,
  });
}
