import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "../store/actions/storageActions";
import { baseUrl } from "../store/constants/baseUrl";
import { ILogSearchQuery } from "../components/Server/CenterPanel/Server/LogSearch/LogSearch";

//https://iconn.cocoon.technology:9143/iconn
export function getBlocks(): Promise<any> {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getAccessToken().token,
  };

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
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getAccessToken().token,
  };

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
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getAccessToken().token,
  };

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

export function getDataLogsAPI(query: ILogSearchQuery): Promise<any> {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getAccessToken().token,
  };

  const newQuery = {
    type: query.type ? query.type : null,
    status: query.status ? query.status : null,
    flowId: query.flowId ? query.status : null,
    blockId: query.blockId ? query.blockId : null,
    timeFrom: query.timeFrom ? new Date(query.timeFrom.toString()).toISOString() : null,
    timeTo: query.timeTo ? new Date(query.timeTo.toString()).toISOString() : null,
    searchText: query.searchText ? query.searchText : null,
  }

  console.log(newQuery);

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


