import { RFState } from "../types/rfState";

export const setTooltipText = (get: any, set: any) => (text: string) => {
  set((state: RFState) => ({
    tooltip: {
      ...state.tooltip,
      text: text,
    },
  }));
};
