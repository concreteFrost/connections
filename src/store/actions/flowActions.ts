import { flow } from "../../testFlow/testFlow2";
import { RFState } from "../types/rfState";
import initialNodes from "../nodes"
import initialEdges from "../edges";
import { setFlow, parseFloatVersion, flowVersionToInt, updateFlowAfterSaving, initializeFlow } from "./utils/flowUtils";
import {
  getFlowApi,
} from "../../api/flow";
import { deleteDraftFlowAPI, getDraftApi, getDraftListApi, saveDraftFlowApi, } from "../../api/draft";

export const createFlow = (get: () => RFState, set: any) => () => {
  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: initializeFlow(initialNodes, initialEdges)
    }
  }))
};


export const loadFlow = (get: () => RFState, set: any) => async (id: string) => {
  try {
    const res: any = await getFlowApi(id);
    setFlow(res.data.flowData, set);
    console.log('load flow success', id);
    return res.data.flowData; // Returning the loaded flow data
  } catch (e) {
    console.log('error loading flow', e);
    throw e; // Rethrowing the error to be caught by the calling function
  }
};

export const loadFlowFromDraft = (get: () => RFState, set: any) => async (id: string) => {

  try {
    const res: any = await getDraftApi(id);
    console.log("loaded flow", res.data)
    setFlow(res.data.flowConfiguration, set);
    console.log('load flow success', res);
  } catch (e) {
    console.log('error loading flow', e);
    throw e; // Rethrowing the error to be caught by the calling function
  }
};

export const saveDraftFlow = (get: () => RFState, set: any) => async (match: any, subfolder: string) => {
  const flow = get().flowSlice.flow;

  if (match) {
    if (flowVersionToInt(flow.flowVersion) <= flowVersionToInt(match.flowVersion)) {
      const parsedPreviousVersion = flowVersionToInt(match.flowVersion) + 1;
      const updatedPreviousVersion = parseFloatVersion(parsedPreviousVersion);
      flow.flowVersion = updatedPreviousVersion;
    }
  }

  const draftStructure = {
    draftId: match ? match.draftId : 0,
    subfolder: subfolder,
    basedOnLiveVersion: '',
    draftConfiguration: flow
  }

  await saveDraftFlowApi(draftStructure).then((res: any) => {
    if (res.data.success) {
      console.log('update flow success', res);
      updateFlowAfterSaving(set, flow, 'success!')
    }
    else {
      updateFlowAfterSaving(set, flow, res.data.message)
      console.log('update flow failed', res.data.message)
    }
  }).catch((e) => {
    console.log('update flow error', e);
    updateFlowAfterSaving(set, flow, e)
  })
}

export const deleteDraftFlow = (get: () => RFState, set: any) => async (draftId: string) => {
  await deleteDraftFlowAPI(draftId).then((res) => {
  }).catch((e) => {
    console.log(e)
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

const flowActions = {
  createFlow: createFlow,
  loadFlow: loadFlow,
  loadFlowFromDraft: loadFlowFromDraft,
  saveDraftFlow: saveDraftFlow,
  deleteDraftFlow: deleteDraftFlow,
  setFlowName: setFlowName,
  setFlowVersion: setFlowVersion,
  setFlowIsEnabled: setFlowIsEnabled,
};

export default flowActions;


// export const saveFlow = (get: () => RFState, set: any) => async () => {
//   const flow = get().flowSlice.flow;
//   console.log('flow to save', flow)
//   await saveFlowApi(flow).then((res: any) => {
//     if (res.data.success) {
//       updateFlowAfterSaving(set, flow, 'success!');
//     }
//     else {
//       console.log('failed', res)
//       updateFlowAfterSaving(set, flow, res.data.message);
//     }
//   }).catch((e) => {
//     console.log('error saving flow', e)
//     updateFlowAfterSaving(set, flow, e);
//   })
// };

// export const saveFlow = (get: () => RFState, set: any) => async () => {
//   const flow = get().flowSlice.flow;
//   console.log('flow to save', flow)
//   await saveDraftFlowApi(flow).then((res: any) => {
//     if (res.data.success) {
//       updateFlowAfterSaving(set, flow, 'success!');
//     }
//     else {
//       console.log('failed', res)
//       updateFlowAfterSaving(set, flow, res.data.message);
//     }
//   }).catch((e) => {
//     console.log('error saving flow', e)
//     updateFlowAfterSaving(set, flow, e);
//   })
// };

// export const updateFlow = (get: () => RFState, set: any) => async (match: any) => {
//   const flow = get().flowSlice.flow;
//   console.log('flow to update', flow)
//   if (flowVersionToInt(flow.flowVersion) <= flowVersionToInt(match.version)) {
//     const parsedPreviousVersion = flowVersionToInt(match.version) + 1;
//     const updatedPreviousVersion = parseFloatVersion(parsedPreviousVersion);
//     flow.flowVersion = updatedPreviousVersion;
//   }

//   await updateFlowApi(flow).then((res: any) => {
//     if (res.data.success) {
//       console.log('update flow success', res);
//       updateFlowAfterSaving(set, flow, 'success!')
//     }
//     else {
//       updateFlowAfterSaving(set, flow, res.data.message)
//       console.log('update flow failed', res.data.message)
//     }
//   }).catch((e) => {
//     console.log('update flow error', e);
//     updateFlowAfterSaving(set, flow, e)
//   })
// }
