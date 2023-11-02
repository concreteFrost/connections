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

export const createFlow = (get: () => RFState, set: any) => () => {
  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: initializeFlow(initialNodes, initialEdges)
    }

  }))
};

export const openTestFlow = (get: () => RFState, set: any) => () => {
  setFlow(flow, set);
};

export const loadFlow = (get: () => RFState, set: any) => (id: string) => {
  getFlowApi(id).then((res: any) => {
    setFlow(res.data.flowData, set);
  }).catch((e) => {
    console.log('error loading flow', e)
  });
};

export const saveFlow = (get: () => RFState, set: any) => () => {
  const flow = get().flowSlice.flow;
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

export const updateFlow = (get: () => RFState, set: any) => (match: any) => {
  const flow = get().flowSlice.flow;

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


export const setFlowName = (get: () => RFState, set: any) => (name: string) => {
  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        flowName: name,
      }

    },
  }));
};

export const setFlowVersion = (get: () => RFState, set: any) => (version: string) => {
  const validFormat = /^\d*\.\d*\.\d*\.\d*$/;

  if (validFormat.test(version)) {
    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: {
          ...state.flowSlice.flow,
          flowVersion: version,
        }

      },
    }));
  }

};


export const setFlowIsEnabled = (get: () => RFState, set: any) => () => {
  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        isEnabled: state.flowSlice.flow.isEnabled === "true" ? "false" : "true"
      }
    },
  }));

};
