import { flow } from "../../testFlow/testFlow2";
import { RFState } from "../types/rfState";
import { setFlow, parseFloatVersion, checkExistingFlowInDataBase, flowVersionToInt } from "./utils/flowUtils";
import {
  saveFlowApi,
  getFlowApi,
  updateFlowApi,
} from "../../api/flow";

export const createFlow = (get: any, set: any) => () => { };

export const openTestFlow = (get: any, set: any) => () => {
  setFlow(flow, set);
};

export const loadFlow = (get: any, set: any) => (id: string) => {
  getFlowApi(id).then((res: any) => {
    setFlow(res.data.flowData, set);
  });
};

export const saveFlow = (get: any, set: any) => () => {
  const flow = get().flow;
  const flowName = flow.flowName;

  checkExistingFlowInDataBase(flowName).then((match: any) => {
    if (match) {
      if (flowVersionToInt(flow.flowVersion) <= flowVersionToInt(match.version)) {
        const parsedPreviousVersion = flowVersionToInt(match.version) + 1;
        const updatedPreviousVersion = parseFloatVersion(parsedPreviousVersion);
        flow.flowVersion = updatedPreviousVersion;
      }
      return true;
    }
    return false;
  }).then((needsOverride: boolean) => {
    if (needsOverride) {
      updateFlowApi(flow).then((res: any) => {
        console.log('success', res.data)
      }).catch(e => console.log(e))
    }
    else {
      saveFlowApi(flow).then((res: any) => {
        console.log('new flow was saved', res)
      }).catch((e) => {
        console.log('error on saving new flow', e);
      })
    }
  }).finally(() => {
    set((state: RFState) => ({
      flow: {
        ...state.flow,
        flowVersion: flow.flowVersion
      }
    }))
  })
};


export const setFlowName = (get: any, set: any) => (name: string) => {
  set((state: RFState) => ({
    flow: {
      ...state.flow,
      flowName: name,
    },
  }));
};

export const setFlowVersion = (get: any, set: any) => (version: string) => {
  const validFormat = /^\d*\.\d*\.\d*\.\d*$/;

  if (validFormat.test(version)) {
    set((state: RFState) => ({
      flow: {
        ...state.flow,
        flowVersion: version,
      },
    }));
  }

};


export const setFlowIsEnabled = (get: any, set: any) => () => {
  set((state: RFState) => ({
    flow: {
      ...state.flow,
      isEnabled: state.flow.isEnabled === "true" ? "false" : "true",
    },
  }));

};
