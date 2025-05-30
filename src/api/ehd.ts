import axios from "axios";
import { baseUrl } from "store/constants/baseUrl";
import { getAccessToken } from "store/actions/storageActions";
import {
  AlertFormat,
  Directive,
  NewAlertFormat,
} from "store/interfaces/IAlerts";
import { Subscription } from "store/interfaces/INotification";

//GET
export function getDirectivesApi() {
  return axios.get(baseUrl + "/Ehd/GetDirectives", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
    },
  });
}

export function getAlertFormatsApi() {
  return axios.get(baseUrl + "/Ehd/GetAlertFormats", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
    },
  });
}

//POST
export function addDirectiveApi(directive: Directive) {
  const { category, ehControlId, ...rest } = directive;
  return axios.post(baseUrl + "/Ehd/AddDirective", rest, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
    },
  });
}

export function updateDirectiveApi(directive: Directive) {
  return axios.post(baseUrl + "/Ehd/UpdateDirective", directive, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
    },
  });
}

export function removeDirectiveApi(ehControlId: number) {
  return axios.post(baseUrl + "/Ehd/RemoveDirective", ehControlId, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
    },
  });
}

export function addAlertFormatApi(alertFormat: NewAlertFormat) {
  return axios.post(baseUrl + "/Ehd/AddAlertFormat", alertFormat, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
    },
  });
}

export function updateAlertFormatApi(alertFormat: AlertFormat) {
  return axios.post(baseUrl + "/Ehd/UpdateAlertFormat", alertFormat, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
    },
  });
}

export function removeAlertFormatApi(alertFormatId: number) {
  return axios.post(baseUrl + "/Ehd/RemoveAlertFormat", alertFormatId, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
    },
  });
}

export function enabliClientAlertsApi(subscription: Subscription) {
  return axios.post(baseUrl + "/Ehd/EnableClientAlerts", subscription, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
    },
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
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
    },
  });
}

export function alertMarkAsReadApi(alertId: number) {
  return axios.post(baseUrl + "/Ehd/AlertMarkAsRead", alertId, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
    },
  });
}

export function alertRemoveApi(alertId: number) {
  return axios.post(baseUrl + "/Ehd/AlertRemove", alertId, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
    },
  });
}
