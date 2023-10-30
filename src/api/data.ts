import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "../store/actions/storageActions";
import { baseUrl } from "../store/constants/baseUrl";

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


