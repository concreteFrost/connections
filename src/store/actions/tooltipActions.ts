import { RFState } from "../types/rfState";

export const setTooltipText = (get: () => RFState, set: any) => (text: string) => {
  set((state: RFState) => ({
    ...state.designerVisualElementsSlice.tooltip,
    text: text,
  }));
};
