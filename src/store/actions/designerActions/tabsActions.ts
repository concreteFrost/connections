import { FlowStructure } from "store/interfaces/Iflow";
import { RFState } from "store/types/rfState";

const addFlowToTabs =
  (get: () => RFState, set: any) => (newFlow: FlowStructure) => {
    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        allFlows: [...state.flowSlice.allFlows, get().flowSlice.flow],
      },
    }));
    console.log(get().flowSlice);
  };

const setFlowNameInTabs = (get: () => RFState, set: any) => (value: string) => {
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
};

const takeFlowSnapshot =
  (get: () => RFState, set: any) => (currentFlow: FlowStructure) => {
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
  };

const getFlowFromSnapshot =
  (get: () => RFState, set: any) => (flowStructure: FlowStructure) => {
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
  };

const clearFlowTabs = (get: () => RFState, set: any) => () => {
  set((state: RFState) => ({
    flowSlice: {
      ...get().flowSlice,
      allFlows: [],
    },
  }));
};

const removeFromTab = (get: () => RFState, set: any) => (flowId: string) => {
  const updatedFlows = get().flowSlice.allFlows.filter(
    (flow: FlowStructure) => flow.flowIdentifier !== flowId
  );

  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      allFlows: updatedFlows,
    },
  }));
};

const tabsActions = {
  addFlowToTabs: addFlowToTabs,
  setFlowNameInTabs: setFlowNameInTabs,
  takeFlowSnapshot: takeFlowSnapshot,
  getFlowFromSnapshot: getFlowFromSnapshot,
  clearFlowTabs: clearFlowTabs,
  removeFromTab: removeFromTab,
};
export default tabsActions;
