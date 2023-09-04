import { RFState } from "../types/rfState";

export const toggleSubstitutionsPanel = (get: any, set: any) => () => {

    set((state: RFState) => ({
        substitutionsPanel: {
            ...state.substitutionsPanel,
            isCollapsed: !state.substitutionsPanel.isCollapsed
        }
    }));
    console.log(get())
};