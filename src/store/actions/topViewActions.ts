import { BackgroundVariant } from "react-flow-renderer";

export const setBgView = (set: any) => (view: BackgroundVariant) => {
  set({ view: view });
};

export const hideAllTopMenus = (get:any,set: any) => () => {
  const { dropdowns } = get().topPanel;
  
  for (const key in dropdowns) {
    dropdowns[key].isVisible = false;
  }

  set((state: any) => ({
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

  set((state: any) => ({
    topPanel: {
      ...state.topPanel,
      dropdowns: { ...dropdowns }
    }
  }));

  
};

export const setSnapToGrid = (get:any,set: any) => () => {
  set((state: any) => ({
    topPanel: {
      ...state.topPanel,
      settings: {
        ...state.topPanel.settings,
        snapToGrid: !state.topPanel.settings.snapToGrid,
      },
    },
  }));

};

export const setSnapStep=(get:any,set:any)=>(step:number[])=>{
  set((state: any) => ({
    topPanel: {
      ...state.topPanel,
      settings: {
        ...state.topPanel.settings,
        snapStep: step,
      },
    },
  }));
}


