import axios, { AxiosResponse } from "axios";
import { baseUrl } from "../store/constants/baseUrl";

export function saveDraftFlowApi(data: any) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: baseUrl + "/Draft/Save",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
      data: data,
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function getDraftListApi(): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Draft/List", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
        },
      })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function getDraftApi(id: any): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Draft/Get", {
        params: {
          draftId: id, // Correctly passing id as a query parameter
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
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
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
      params: {
        draftId: data,
      },
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function approveAndReleaseAPI(draftId: string, keepDraft: boolean) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: baseUrl + "/Draft/ApproveAndRelease",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
      params: {
        draftId: draftId,
        keepDraft: keepDraft,
      },
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function createDraftFromLiveTemplateAPI(
  liveFlowID: string,
  newDraftName: string
) {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Draft/CreateNewDraftFromLiveTemplate", {
        params: {
          originalFlowReference: liveFlowID,
          newFlowName: newDraftName,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
        },
      })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function createUpdateDraftFromLiveAPI(liveFlowID: string) {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Draft/CreateUpdateDraftFromLive", {
        params: {
          flowReference: liveFlowID,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
        },
      })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}
