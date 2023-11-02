import { BackgroundVariant } from "react-flow-renderer";
import { RFState } from "../types/rfState";

export const setBgView = (set: any) => (view: BackgroundVariant) => {
  set((state: RFState) => ({
    designerVisualElementsSlice: {
      ...state.designerVisualElementsSlice,
      view: view
    }
  }))
};

export const hideAllTopMenus = (get: () => RFState, set: any) => () => {
  const { dropdowns }: any = get().topPanelSlice;

  for (const key in dropdowns) {
    dropdowns[key].isVisible = false;
  }

  set((state: RFState) => ({
    topPanelSlice: {
      ...state.topPanelSlice,
      dropdowns: { ...dropdowns }
    }
  }));
};

export const toggleDropdown = (get: () => RFState, set: any) => (activeDropdownId: string) => {
  const { dropdowns }: any = get().topPanelSlice;

  for (const key in dropdowns) {
    dropdowns[key].isVisible = key === activeDropdownId ? !dropdowns[key].isVisible : false;
  }

  set((state: RFState) => ({
    topPanelSlice: {
      ...state.topPanelSlice,
      dropdowns: { ...dropdowns }
    }
  }));


};

export const setSnapToGrid = (get: () => RFState, set: any) => () => {
  set((state: RFState) => ({
    topPanelSlice: {
      ...state.topPanelSlice,
      settings: {
        ...state.topPanelSlice.settings,
        snapToGrid: !state.topPanelSlice.settings.snapToGrid,
      },
    },
  }));

};

export const setSnapStep = (get: () => RFState, set: any) => (step: number[]) => {
  set((state: RFState) => ({
    topPanelSlice: {
      ...state.topPanelSlice,
      settings: {
        ...state.topPanelSlice.settings,
        snapStep: step,
      },
    },
  }));
}

export const toggleMiniMap = (get: () => RFState, set: any) => () => {
  set((state: RFState) => ({
    topPanelSlice: {
      ...state.topPanelSlice,
      settings: {
        ...state.topPanelSlice.settings,
        showMiniMap: !state.topPanelSlice.settings.showMiniMap
      }
    }
  }))
}



