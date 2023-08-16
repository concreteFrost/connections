import { RFState } from "../types/rfState";

export const toggleSubstitutionsPanel = (get: any,set:any) => () => {
    console.log('done')
    set((state: RFState) => ({
        substitutionsPanel:{
            ...state.substitutionsPanel,
            isCollapsed: !state.substitutionsPanel.isCollapsed
        }
    }));
    console.log(get())
  };