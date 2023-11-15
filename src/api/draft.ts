import axios from "axios";
import { baseUrl } from "../store/constants/baseUrl";
import { getAccessToken } from "../store/actions/storageActions";

export function saveDraftFlowApi(data: any) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: baseUrl + "/Draft/Save",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken().token,
      },
      data: data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => reject(e));
  });
}

export function getDraftListApi() {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Draft/List", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAccessToken().token,
        },
      })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function getDraftApi(id: any) {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Draft/Get", {
        params: {
          draftId: id, // Correctly passing id as a query parameter
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAccessToken().token,
        },
      })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function deleteDraftFlowAPI(data: any) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: baseUrl + "/Draft/Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAccessToken().token,
      },
      params: {
        draftId: data
      }
    })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => reject(e));
  });
}


