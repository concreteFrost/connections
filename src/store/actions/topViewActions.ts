import { BackgroundVariant } from "react-flow-renderer";
import { RFState } from "../types/rfState";

export const setBgView = (set: any) => (view: BackgroundVariant) => {
  set({ view: view });
};

export const hideAllTopMenus = (get: any, set: any) => () => {
  const { dropdowns } = get().topPanelSlice;

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

export const toggleDropdown = (get: any, set: any) => (activeDropdownId: string) => {
  const { dropdowns } = get().topPanelSlice;

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

export const setSnapToGrid = (get: any, set: any) => () => {
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

export const setSnapStep = (get: any, set: any) => (step: number[]) => {
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

export const toggleMiniMap = (get: any, set: any) => () => {
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



