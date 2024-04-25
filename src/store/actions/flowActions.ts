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
  setDraftId(get, set)(null);
  setCanApprove(get, set)(false);

};

export const closeFlow = (get: () => RFState, set: any) => () => {
  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: initializeFlow(initialNodes, initialEdges)
    }
  }))
  setDraftId(get, set)(null);
  setCanApprove(get, set)(false);
};

export const createFlowFromTemplate = (get: () => RFState, set: any) => async (liveFlowID: string, newDraftName: string) => {
  try {
    const res: any = await createDraftFromLiveTemplateAPI(liveFlowID, newDraftName);
    const data = await res.data;

    if (data.success) {
      await setFlow(data.flowConfiguration, set,get);
      setCanApprove(get, set)(false);
    }

    return res;
  }
  catch (e) {
    console.log('error creating flow from template', e)
  }
}


export const createUpdateDraftFromLiveTemplate = (get: () => RFState, set: any) => async (id: string) => {
  try {
    const res: any = await createUpdateDraftFromLiveAPI(id);

    if (res.data.success) {
      setFlow(res.data.flowConfiguration, set,get);
      setCanApprove(get, set)(false);
    }
    return res;
  } catch (e) {
    console.log('error creating update draft from live template', e)
  }
};

export const loadFlowFromDraft = (get: () => RFState, set: any) => async (id: string) => {
  try {
    const res: any = await getDraftApi(id);
    console.log('loaded flow', res.data.flowConfiguration.visual)
    setFlow(res.data.flowConfiguration, set,get);
    setCanApprove(get, set)(false);
  } catch (e) {
    console.log('error loading flow', e);
  }
};

export const saveDraftFlow = (get: () => RFState, set: any) => async (match: any, subfolder: string): Promise<boolean> => {
  const flow = get().flowSlice.flow;

  flow.visual.blocks.forEach((block) => {
    block.position.x = Math.floor(block.position.x);
    block.position.y = Math.floor(block.position.y);
  });

  console.log('saving draft')
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

  console.log('payload', draftStructure)

  try {
    const res: any = await saveDraftFlowApi(draftStructure);
    console.log(draftStructure)
    if (res.data.success) {
      updateFlowAfterSaving(set, flow, 'success!!!');
      setDraftId(get, set)(res.data.draftRecord.draftId)
      setCanApprove(get, set)(true);
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
  try {
    const res: any = await deleteDraftFlowAPI(draftId);
    return res;
  } catch (error) {
    return error;
  }
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

//internal functions
const setDraftId = (get: () => RFState, set: any) => (id: string | null) => {
  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      draft: {
        ...state.flowSlice.draft,
        draftId: id
      }
    }
  }))
}

export const setCanApprove = (get: () => RFState, set: any) => (canApprove: boolean) => {
  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      draft: {
        ...state.flowSlice.draft,
        canApprove: canApprove
      }
    }
  }))
}


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
  setCanApprove: setCanApprove
};

export default flowActions;
