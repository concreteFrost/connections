import useStore from "store/store";
import mockFlowStructure from "__mocks__/mockFlow";
import { RFState } from "store/types/rfState";

export const initialFlow = useStore.getState().flowSlice.flow;

export const initFlow = ()=>{
  useStore.setState((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: mockFlowStructure,
    },
  }));
}

export const clearFlow = ()=>{
  useStore.setState((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: initialFlow,
    },
  }));
}