import axios from "axios";
import { baseUrl } from "../store/constants/baseUrl";
import { getAccessToken } from "../store/actions/storageActions";

export function saveFlowApi(data: any) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: baseUrl + "/Flow/UploadNew",
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
