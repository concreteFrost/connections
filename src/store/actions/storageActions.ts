import { BackgroundVariant } from "react-flow-renderer";
import { FlowStatus } from "../interfaces/IStatistics";

const connectionsPrefix = "iCon_";
const connectionsSettingsPrefix = "_iConSettings";

type userSetting = {
  designer: {
    isGridSnapped: boolean|null,
    gridStep: string|null,
    canvasView: BackgroundVariant;
  };
};

export const initialSettings :userSetting ={
    designer:{
        isGridSnapped: false,
        gridStep:"5",
        canvasView: BackgroundVariant.Dots
    }
}

type sessionType = {
  token: string | null;
  expires_in: string | null;
  expires: string | null;
  issued: string | null;
  is_logged_in: string | null;
  userName: string | null;
};

export const setAccessToken = (data: any, userName: string) => {
  localStorage.setItem(connectionsPrefix + "access_token", data.access_token);
  localStorage.setItem(connectionsPrefix + "expires_in", data.expires_in);
  localStorage.setItem(connectionsPrefix + "expires", data[".expires"]);
  localStorage.setItem(connectionsPrefix + "issued", data[".issued"]);
  localStorage.setItem(connectionsPrefix + "is_logged_in", true.toString());
  localStorage.setItem(connectionsPrefix + "userName", userName);
};

export const getAccessToken = () => {
  const session: sessionType = {
    token: localStorage.getItem(connectionsPrefix + "access_token"),
    expires_in: localStorage.getItem(connectionsPrefix + "expires_in"),
    expires: localStorage.getItem(connectionsPrefix + "expires"),
    issued: localStorage.getItem(connectionsPrefix + "issued"),
    is_logged_in: localStorage.getItem(connectionsPrefix + "is_logged_in"),
    userName: localStorage.getItem(connectionsPrefix + "userName"),
  };

  return session;
};

export const clearUserData = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(connectionsPrefix)) {
      localStorage.removeItem(key);
    }
  });
};

export const getUserSettingsData = () => {
    let settings : userSetting;

    if(!localStorage.getItem(connectionsSettingsPrefix)){
        localStorage.setItem(connectionsSettingsPrefix,JSON.stringify({
            ...initialSettings
        }))
    }
    settings = JSON.parse(localStorage.getItem(connectionsSettingsPrefix) || "{}");

    return settings;
};

export const setDesignerSettings=(key: keyof userSetting['designer'], value:any)=>{
    if(localStorage.getItem(connectionsSettingsPrefix)){
        const userSettings =localStorage.getItem(connectionsSettingsPrefix);
        const parsedSetting = JSON.parse(userSettings || "{}" );
        parsedSetting.designer[key] =value;
        localStorage.setItem(connectionsSettingsPrefix, JSON.stringify(parsedSetting));
    }
}

export const setFlowStatusStorage=(data:any)=>{
  localStorage.setItem(connectionsPrefix + "status",JSON.stringify(data))
}

export const getFlowStatusStorage = (): FlowStatus[] | null => {
  const item = localStorage.getItem(connectionsPrefix + "status");
  if (item) {
    return JSON.parse(item) as FlowStatus[];
  }
  return null;
}