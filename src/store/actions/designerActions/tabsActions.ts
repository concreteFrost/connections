import { FlowStructure } from "shared/interfaces/Iflow";
import { RFState } from "shared/types/rfState";

const tabsActions = (get: () => RFState, set: any) => ({
  addFlowToTabs: (newFlow: FlowStructure) => {
    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        allFlows: [...state.flowSlice.allFlows, get().flowSlice.flow],
      },
    }));
  },

  setFlowNameInTabs: (value: string) => {
    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        allFlows: state.flowSlice.allFlows.map((x: FlowStructure) => {
          if (x.flowIdentifier === get().flowSlice.flow.flowIdentifier) {
            return {
              ...x,
              flowName: value.length > 0 ? value : x.flowIdentifier,
            };
          } else {
            return x;
          }
        }),
      },
    }));
  },

  takeFlowSnapshot: (currentFlow: FlowStructure) => {
    const updatedFlows: Array<FlowStructure> = get().flowSlice.allFlows.map(
      (flow: FlowStructure) => {
        if (flow.flowIdentifier === currentFlow.flowIdentifier) {
          return currentFlow;
        } else return flow;
      }
    );

    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        allFlows: updatedFlows,
      },
    }));
  },

  getFlowFromSnapshot: (flowStructure: FlowStructure) => {
    const flowToGet = get().flowSlice.allFlows.find(
      (flow: FlowStructure) =>
        flow.flowIdentifier === flowStructure.flowIdentifier
    );
    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: flowToGet,
      },
    }));
  },

  clearFlowTabs: () => {
    set((state: RFState) => ({
      flowSlice: {
        ...get().flowSlice,
        allFlows: [],
      },
    }));
  },

  removeFromTab: (flowId: string) => {
    const updatedFlows = get().flowSlice.allFlows.filter(
      (flow: FlowStructure) => flow.flowIdentifier !== flowId
    );

    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        allFlows: updatedFlows,
      },
    }));
  },
});
export default tabsActions;
