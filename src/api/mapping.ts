import axios, { AxiosResponse } from "axios";
import { baseUrl } from "store/constants/baseUrl";

export async function generateStructureFromSample(
  file: File | Blob
): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("sampleDocument", file);

    return axios(baseUrl + "/Mapping/GenerateStructureFromSample", {
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}
