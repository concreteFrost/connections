import axios from "axios";
import { baseUrl } from "../store/constants/baseUrl";


export function saveFlowApi(data: any) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: baseUrl + "/Flow/UploadNew",
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

export function getFlowListApi() {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Data/FlowList", {
         headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
      })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function getFlowApi(id: any) {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Flow/Get", {
        params: {
          flowReference: id, // Correctly passing id as a query parameter
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

export function getBlockStatisticsAPI(id: string) {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Flow/BlockStatistics", {
        params: {
          flowIdentifier: id, // Correctly passing id as a query parameter
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

export function enableFlowAPI(id: string) {
  return new Promise((resolve, reject) => {
    axios(baseUrl + "/Flow/Enable", {
      method: "POST",
      params: {
        flowReference: id,
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

export function disableFlowAPI(id: string) {
  return new Promise((resolve, reject) => {
    axios(baseUrl + "/Flow/Disable", {
      method: "POST",
      params: {
        flowReference: id,
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

export function startFlowAPI(id: string) {
  return new Promise((resolve, reject) => {
    axios(baseUrl + "/Flow/Start", {
      method: "POST",
      params: {
        flowReference: id,
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

export function restartFlowAPI(id: string) {
  return new Promise((resolve, reject) => {
    axios(baseUrl + "/Flow/Restart", {
      method: "POST",
      params: {
        flowReference: id,
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

export function terminateFlowAPI(id: string) {
  return new Promise((resolve, reject) => {
    axios(baseUrl + "/Flow/Terminate", {
      method: "POST",
      params: {
        flowReference: id,
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

export function stopFlowAPI(id: string) {
  return new Promise((resolve, reject) => {
    axios(baseUrl + "/Flow/Stop", {
      method: "POST",
      params: {
        flowReference: id,
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
