import { RFState } from "shared/types/rfState";
import initialNodes from "../../nodes";
import initialEdges from "../../edges";
import {
  setFlow,
  parseFloatVersion,
  flowVersionToInt,
  updateFlowAfterSaving,
  initializeFlow,
} from "../../../utils/flowUtils";
import { v4 as uuidv4 } from "uuid";
import { saveDraftFlowApi } from "api/draft";
import { FlowStructure } from "shared/interfaces/Iflow";
import flowSlice from "store/slices/flowSlice";

export const flowActions = (get: () => RFState, set: any) => {
  const setDraftId = (id: string | null) => {
    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        draft: { ...state.flowSlice.draft, draftId: id },
      },
    }));
  };

  const setCanApprove = (canApprove: boolean) => {
    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        draft: { ...state.flowSlice.draft, canApprove },
      },
    }));
  };

  return {
    createFlow: (): FlowStructure => {
      const flowId = uuidv4();
      const newFlow: FlowStructure = initializeFlow(
        initialNodes,
        initialEdges,
        flowId
      );

      set((state: RFState) => ({
        flowSlice: {
          ...state.flowSlice,
          flow: newFlow,
        },
      }));

      setDraftId(null);
      setCanApprove(false);

      return newFlow;
    },

    closeFlow: () => {
      set((state: RFState) => ({
        flowSlice: {
          ...state.flowSlice,
          flow: initializeFlow(initialNodes, initialEdges),
        },
      }));

      setDraftId(null);
      setCanApprove(false);
    },

    createFlowFromTemplate: (flowConfiguration: any) => {
      setFlow(flowConfiguration, set, get);
      setCanApprove(false);
    },

    createUpdateDraftFromLiveTemplate: async (flowConfiguration: any) => {
      setFlow(flowConfiguration, set, get);
      setCanApprove(false);
    },

    loadFlowFromDraft: async (flowConfiguration: any) => {
      try {
        setFlow(flowConfiguration, set, get);
        setCanApprove(false);
      } catch (e) {
        console.log("error loading flow", e);
      }
    },

    saveDraftFlow: async (match: any, subfolder: string): Promise<boolean> => {
      const flow = get().flowSlice.flow;

      flow.visual.blocks.forEach((block) => {
        block.position.x = Math.floor(block.position.x);
        block.position.y = Math.floor(block.position.y);
      });

      if (match) {
        if (
          flowVersionToInt(flow.flowVersion) <=
          flowVersionToInt(match.flowVersion)
        ) {
          const parsedPreviousVersion = flowVersionToInt(match.flowVersion) + 1;
          const updatedPreviousVersion = parseFloatVersion(
            parsedPreviousVersion
          );
          flow.flowVersion = updatedPreviousVersion;
        }
      }

      const draftStructure = {
        draftId: match ? match.draftId : 0,
        subfolder: subfolder,
        basedOnLiveVersion: "",
        draftConfiguration: flow,
      };

      try {
        const res: any = await saveDraftFlowApi(draftStructure);
        if (res.data.success) {
          updateFlowAfterSaving(set, flow, "success!!!");
          setDraftId(res.data.draftRecord.draftId);
          setCanApprove(true);
          return true;
        } else {
          updateFlowAfterSaving(set, flow, res.data.message);
          return false;
        }
      } catch (e: any) {
        updateFlowAfterSaving(set, flow, e);
        return false;
      }
    },

    setFlowName: (name: string) => {
      set((state: RFState) => ({
        flowSlice: {
          ...state.flowSlice,
          flow: {
            ...state.flowSlice.flow,
            flowName: name,
          },
        },
      }));
    },

    setFlowVersion: (version: string) => {
      const validFormat = /^\d*\.\d*\.\d*\.\d*$/;
      if (validFormat.test(version)) {
        set((state: RFState) => ({
          flowSlice: {
            ...state.flowSlice,
            flow: {
              ...state.flowSlice.flow,
              flowVersion: version,
            },
          },
        }));
      }
    },

    setFlowIsEnabled: () => {
      set((state: RFState) => ({
        flowSlice: {
          ...state.flowSlice,
          flow: {
            ...state.flowSlice.flow,
            isEnabled:
              state.flowSlice.flow.isEnabled === "true" ? "false" : "true",
          },
        },
      }));
    },

    setInstance: (instance: any) => {
      set((state: RFState) => ({
        flowSlice: {
          ...state.flowSlice,
          reactFlowInstance: instance,
        },
      }));
    },

    // added ref to get correct coordinates
    setFlowWrapper: (wrapper: any) => {
      set((state: RFState) => ({
        flowSlice: {
          ...state.flowSlice,
          reactFlowWrapper: wrapper,
        },
      }));
    },

    setCanApprove: (canApprove: boolean) => {
      set((state: RFState) => ({
        flowSlice: {
          ...state.flowSlice,
          draft: {
            ...state.flowSlice.draft,
            canApprove,
          },
        },
      }));
    },
  };
};

export default flowActions;
