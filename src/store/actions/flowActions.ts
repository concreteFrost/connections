import { RFState } from "../types/rfState";
import initialNodes from "../nodes"
import initialEdges from "../edges";
import { setFlow, parseFloatVersion, flowVersionToInt, updateFlowAfterSaving, initializeFlow } from "./utils/flowUtils";
import { v4 as uuidv4 } from "uuid";

import { deleteDraftFlowAPI, getDraftApi, saveDraftFlowApi, createDraftFromLiveTemplateAPI, createUpdateDraftFromLiveAPI } from "../../api/draft";

export const createFlow = (get: () => RFState, set: any) => () => {
  const flowId = uuidv4();
  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: initializeFlow(initialNodes, initialEdges, flowId)
    }
  }))

  console.log(get().flowSlice.flow)
};

export const closeFlow = (get: () => RFState, set: any) => () => {

  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: initializeFlow(initialNodes, initialEdges)
    }
  }))

  console.log(get().flowSlice.flow)
};

export const createFlowFromTemplate = (get: () => RFState, set: any) => async (liveFlowID: string, newDraftName: string) => {
  try {
    const res: any = await createDraftFromLiveTemplateAPI(liveFlowID, newDraftName);
    const data = await res.data;
    const returnedFlowStructure = await data.flowConfiguration;
    await setFlow(returnedFlowStructure, set);
  }
  catch (e) {
    throw e;
  }
}


export const createUpdateDraftFromLiveTemplate = (get: () => RFState, set: any) => async (id: string) => {
  try {
    const res: any = await createUpdateDraftFromLiveAPI(id);
    console.log(res)
    setFlow(res.data.flowConfiguration
      , set);
    return res.data.flowConfiguration
      ; // Returning the loaded flow data
  } catch (e) {
    throw e; // Rethrowing the error to be caught by the calling function
  }
};

export const loadFlowFromDraft = (get: () => RFState, set: any) => async (id: string) => {

  try {
    const res: any = await getDraftApi(id);
    setFlow(res.data.flowConfiguration, set);
  } catch (e) {
    console.log('error loading flow', e);
    throw e; // Rethrowing the error to be caught by the calling function
  }
};

export const saveDraftFlow = (get: () => RFState, set: any) => async (match: any, subfolder: string): Promise<boolean> => {
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
    draftConfiguration: flow,
  };

  try {
    const res: any = await saveDraftFlowApi(draftStructure);
    if (res.data.success) {
      updateFlowAfterSaving(set, flow, 'success!!!');
      return true;
    } else {
      updateFlowAfterSaving(set, flow, res.data.message);
      return false;
    }
  } catch (e: any) {

    updateFlowAfterSaving(set, flow, e);
    return false;
  }
};


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
  createFlowFromTemplate: createFlowFromTemplate,
  createUpdateDraftFromLiveTemplate: createUpdateDraftFromLiveTemplate,
  closeFlow: closeFlow,
  loadFlowFromDraft: loadFlowFromDraft,
  saveDraftFlow: saveDraftFlow,
  deleteDraftFlow: deleteDraftFlow,
  setFlowName: setFlowName,
  setFlowVersion: setFlowVersion,
  setFlowIsEnabled: setFlowIsEnabled,
};

export default flowActions;
