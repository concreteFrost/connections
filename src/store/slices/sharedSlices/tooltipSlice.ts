import { RFState } from "shared/types/rfState";

export type TooltipSlice = {
  text: string;

  setTooltipText: (text: string) => void;
};

const tooltipSlice = (get: () => RFState, set: any): TooltipSlice => ({
  text: "",

  setTooltipText: (text: string) => {
    set((state: RFState) => ({
      tooltipSlice: {
        ...state.tooltipSlice,
        text,
      },
    }));
  },
});

export default tooltipSlice;
