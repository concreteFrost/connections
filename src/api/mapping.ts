import axios, { AxiosResponse } from "axios";
import { baseUrl } from "store/constants/baseUrl";
import {
  MappingList,
  MappingState,
  SchemaDocument,
} from "store/interfaces/IVisualMapping";

export async function generateStructureFromSample(
  file: File | Blob
): Promise<
  AxiosResponse<{ message: string; success: string; xsd: SchemaDocument }>
> {
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
  mappingState: MappingState,
  forceOverwrite: boolean
): Promise<AxiosResponse<any>> {
  return new Promise((resolve, reject) => {
    return axios(baseUrl + "/Mapping/Save", {
      method: "POST",
      data: { ...mappingState, forceOverwrite: forceOverwrite },
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
  AxiosResponse<{ files: MappingList[] }>
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

export async function loadMapStructure(
  mappingReference: string
): Promise<AxiosResponse<MappingState>> {
  return new Promise((resolve, reject) => {
    return axios(baseUrl + "/Mapping/Get", {
      method: "GET",
      params: { mappingReference: mappingReference },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export async function deleteMapStructure(mappingReference: string): Promise<
  AxiosResponse<{
    success: string;
    mwssage: string;
    errorNum: string;
  }>
> {
  return new Promise((resolve, reject) => {
    return axios(baseUrl + "/Mapping/Delete", {
      method: "GET",
      params: { mappingReference: mappingReference },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}
