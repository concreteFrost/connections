import axios, { AxiosResponse } from "axios";
import { headers } from "./utils/headers";
import { baseUrl } from "../store/constants/baseUrl";
import { LogSearchQuery } from "../store/interfaces/IServer";
import { Subscription } from "../store/interfaces/INotification";

export function getBlocks(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    axios
      .get(baseUrl + "/data/blocklist", { headers })
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
      .get(baseUrl + "/data/blockLookupList", { headers })
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
      .get(baseUrl + "/data/serverstatus", { headers })
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
      headers,
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
      headers,
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
      headers,
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
      .get(baseUrl + "/data/flowListStatus", { headers })
      .then((res: AxiosResponse<any>) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
