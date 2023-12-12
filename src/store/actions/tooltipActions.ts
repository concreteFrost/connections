import { RFState } from "../types/rfState";

export const setTooltipText = (get: () => RFState, set: any) => (text: string) => {
  set((state: RFState) => ({
    designerVisualElementsSlice: {
      ...state.designerVisualElementsSlice,
      tooltip: {
        text: text,
      }
    }
  }));
};

const tooltipActions = {
  setTooltipText: setTooltipText
}

export default tooltipActions;