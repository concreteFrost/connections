import { getAccessToken } from "store/actions/storageActions";

export const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getAccessToken().token,
  };