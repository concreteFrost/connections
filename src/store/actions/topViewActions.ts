import { BackgroundVariant } from "react-flow-renderer";
import { RFState } from "../types/rfState";
import {flow} from "../../testFlow/testFlow2"

export const setBgView = (set: any) => (view: BackgroundVariant) => {
  set({ view: view });
};

export const hideAllTopMenus = (get: any, set: any) => () => {
  const { dropdowns } = get().topPanel;

  for (const key in dropdowns) {
    dropdowns[key].isVisible = false;
  }

  set((state: RFState) => ({
    topPanel: {
      ...state.topPanel,
      dropdowns: { ...dropdowns }
    }
  }));
};

export const toggleDropdown = (get: any, set: any) => (activeDropdownId: string) => {
  const { dropdowns } = get().topPanel;

  for (const key in dropdowns) {
    dropdowns[key].isVisible = key === activeDropdownId ? !dropdowns[key].isVisible : false;
  }

  set((state: RFState) => ({
    topPanel: {
      ...state.topPanel,
      dropdowns: { ...dropdowns }
    }
  }));


};

export const setSnapToGrid = (get: any, set: any) => () => {
  set((state: RFState) => ({
    topPanel: {
      ...state.topPanel,
      settings: {
        ...state.topPanel.settings,
        snapToGrid: !state.topPanel.settings.snapToGrid,
      },
    },
  }));

};

export const setSnapStep = (get: any, set: any) => (step: number[]) => {
  set((state: RFState) => ({
    topPanel: {
      ...state.topPanel,
      settings: {
        ...state.topPanel.settings,
        snapStep: step,
      },
    },
  }));
}

export const toggleMiniMap = (get: any, set: any) => () => {
  set((state: RFState) => ({
    topPanel: {
      ...state.topPanel,
      settings: {
        ...state.topPanel.settings,
        showMiniMap: !state.topPanel.settings.showMiniMap
      }
    }
  }))
}

export const saveFlow = (get: any, set: any) => () => {
  console.log(get().flow.visual.blocks)
  console.log(get().edges)
}


export const loadFlow = (get: any, set: any) => () => {
  const d = flow;
  console.log(d)
}


