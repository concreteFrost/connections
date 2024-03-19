import { BackgroundVariant } from "react-flow-renderer";
import { RFState } from "../types/rfState";
import { setDesignerSettings } from "./storageActions";

export const setBgView = (set: any) => (view: BackgroundVariant) => {
  set((state: RFState) => ({
    designerVisualElementsSlice: {
      ...state.designerVisualElementsSlice,
      view: view
    }
  }))

  setDesignerSettings("canvasView",view);
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

  const isSnapped = get().topPanelSlice.settings.snapToGrid; 
  set((state: RFState) => ({
    topPanelSlice: {
      ...state.topPanelSlice,
      settings: {
        ...state.topPanelSlice.settings,
        snapToGrid: !isSnapped,
      },
    },    
  }));
  setDesignerSettings("isGridSnapped",!isSnapped)

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

  setDesignerSettings("gridStep",step[0]);
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

const topMenuActions = {
  setBgView: setBgView,
  hideAllTopMenus: hideAllTopMenus,
  toggleDropdown: toggleDropdown,
  setSnapToGrid: setSnapToGrid,
  setSnapStep: setSnapStep,
  showMiniMap: toggleMiniMap,
};

export default topMenuActions;



