import { getBlockStatisticsAPI, getFlowApi } from "../../api/flow";
import { RFState } from "../types/rfState";

export const getCurrentFlow = (get: any, set: any) => (flowId: string) => {
  getFlowApi(flowId).then((res: any) => {
    set((state: RFState) => ({
      server: {
        ...state.server,
        currentFlow: res.data.flowData,
      },
    }));
  });
};

export const getBlockStatistics = (get: any, set: any) => (flowId: string) => {
  getBlockStatisticsAPI(flowId)
    .then((res: any) => {
      set((state: RFState) => ({
        server: {
          ...state.server,
          blockStatistics: res.data.statistics,
        },
      }));
    })
    .catch((e) => {
      console.log("error on getting stats", e);
      set((state: RFState) => ({
        server: {
          ...state.server,
          blockStatistics: null,
        },
      }));
    });
};
