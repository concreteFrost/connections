import { RFState } from "../types/rfState";


export const clearRightPanel = (get:any,set:any) =>() =>{
  set((state: RFState) => ({
    rightPanel: {
      ...state.rightPanel,
      base: {
        blockName: '',
        blockColor: "#FFFFFF",
        blockDescription: '',
      },
      parameters:[]
    },
  }));
}

