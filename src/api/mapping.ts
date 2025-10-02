import axios, { AxiosResponse } from "axios";
import { baseUrl } from "store/constants/baseUrl";
import {
  MappingState,
  MappingStructure,
} from "store/interfaces/IVisualMapping";

export async function generateStructureFromSample(
  file: File | Blob
): Promise<AxiosResponse<MappingStructure>> {
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

export async function saveMappingStructure(
  mappingState: MappingState[]
): Promise<
  AxiosResponse<{
    success: boolean;
    message: string;
    errorNum: string;
  }>
> {
  return new Promise((resolve, reject) => {
    return axios(baseUrl + "/Mapping/Save", {
      method: "POST",
      data: mappingState,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export async function getMappingStructureList(): Promise<
  AxiosResponse<MappingState[]>
> {
  return new Promise((resolve, reject) => {
    return axios(baseUrl + "/Mapping/GetList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}
