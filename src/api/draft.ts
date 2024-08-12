import axios from "axios";
import { baseUrl } from "../store/constants/baseUrl";
import { headers } from "./utils/headers";

export function saveDraftFlowApi(data: any) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: baseUrl + "/Draft/Save",
      headers: headers,
      data: data,
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function getDraftListApi() {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Draft/List", {
        headers: headers,
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
        headers: headers,
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
      headers: headers,
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
      headers: headers,
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
        headers: headers,
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
        headers: headers,
      })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}
