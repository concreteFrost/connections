import axios, { AxiosResponse } from "axios";
import { baseUrl } from "shared/constants/baseUrl";
import { LogSearchQuery } from "shared/interfaces/IServer";
import { Subscription } from "shared/interfaces/INotification";
import { IChartData } from "shared/interfaces/IStatistics";

export function getBlocks(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    axios
      .get(baseUrl + "/data/blocklist", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
        },
      })
      .then((res: AxiosResponse<any>) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function getBlockLookupListAPI(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    axios
      .get(baseUrl + "/data/blockLookupList", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
        },
      })
      .then((res: AxiosResponse<any>) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function getServerStatusAPI(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    axios
      .get(baseUrl + "/data/serverstatus", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
        },
      })
      .then((res: AxiosResponse<any>) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function getDataLogsAPI(query: LogSearchQuery): Promise<any> {
  function getEndOfDay(dateString: any) {
    // Parse the input string to create a Date object
    const date = new Date(dateString);

    // Set hours, minutes, seconds, and milliseconds to the end of the day
    date.setHours(23, 59, 59, 999);

    // Convert the Date object to ISO string
    return date.toISOString();
  }

  const newQuery = {
    type: query.type ? query.type : null,
    status: query.status ? query.status : null,
    flowId: query.flowId ? query.status : null,
    blockId: query.blockId ? query.blockId : null,
    timeFrom: query.timeFrom
      ? new Date(query.timeFrom.toString()).toISOString()
      : null,
    timeTo: query.timeTo ? getEndOfDay(query.timeTo) : null,
    searchText: query.searchText ? query.searchText : null,
  };

  return new Promise<any>((resolve, reject) => {
    axios(baseUrl + "/data/logs", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
      data: newQuery,
    })
      .then((res: AxiosResponse<any>) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function enableClientFlowStatusAPI(
  subscription: Subscription
): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    axios(baseUrl + "/data/enableClientFlowStatus", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
      method: "POST",
      data: {
        endpoint: subscription.endpoint,
        auth: subscription.auth,
        p256DH: subscription.p256dh,
      },
    })
      .then((res: AxiosResponse<any>) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function disableClientFlowStatusAPI(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    axios(baseUrl + "/data/disableClientFlowStatus", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
      method: "POST",
    })
      .then((res: AxiosResponse<any>) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function getFlowListStatusAPI(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    axios
      .get(baseUrl + "/data/flowListStatus", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
        },
      })
      .then((res: AxiosResponse<any>) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function getMetricsApi() {
  return new Promise<any>((resolve, reject) => {
    axios
      .get(baseUrl + "/data/GetMetrics", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
        },
      })
      .then((res: AxiosResponse<IChartData>) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function enableClientMetricsApi(subscription: Subscription) {
  return axios.post(baseUrl + "/Data/EnableClientMetrics", subscription, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
    },
  });
}

export function disableClientMetricsApi() {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: baseUrl + "/Data/DisableClientMetrics",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => reject(e));
  });
}
