import { flow } from "../../testFlow/testFlow2";
import { RFState } from "../types/rfState";
import initialNodes from "../nodes"
import initialEdges from "../edges";
import { setFlow, parseFloatVersion, flowVersionToInt, updateFlowAfterSaving, initializeFlow } from "./utils/flowUtils";
import {
  saveFlowApi,
  getFlowApi,
  updateFlowApi,
} from "../../api/flow";

export const createFlow = (get: any, set: any) => () => {
  set((state: RFState) => ({
    ...state,
    flow: initializeFlow(initialNodes, initialEdges)
  }))
};

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
  saveFlowApi(flow).then((res: any) => {
    if (res.data.success) {
      updateFlowAfterSaving(set, flow, 'success!');
    }
    else {
      updateFlowAfterSaving(set, flow, res.data.message);
    }
  }).catch((e) => {
    updateFlowAfterSaving(set, flow, e);
  })

};

export const updateFlow = (get: any, set: any) => (match: any) => {
  const flow = get().flow;

  if (flowVersionToInt(flow.flowVersion) <= flowVersionToInt(match.version)) {
    const parsedPreviousVersion = flowVersionToInt(match.version) + 1;
    const updatedPreviousVersion = parseFloatVersion(parsedPreviousVersion);
    flow.flowVersion = updatedPreviousVersion;
  }

  updateFlowApi(flow).then((res: any) => {
    if (res.data.success) {
      console.log('update flow success', res);
      updateFlowAfterSaving(set, flow, 'success!')
    }
    else {
      updateFlowAfterSaving(set, flow, res.data.message)
    }
  }).catch((e) => {
    console.log('update flow error', e);
    updateFlowAfterSaving(set, flow, e)
  })
}


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
