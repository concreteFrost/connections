import { getUserSettingsData } from "store/actions/sharedActions/storageActions";
import topMenuActions from "store/actions/designerActions/topViewActions";
import { RFState } from "shared/types/rfState";

const userSettingsData = getUserSettingsData();
const designerSettings = userSettingsData && userSettingsData.designer;

export type TopPanelSlice = {
  settings: {
    snapToGrid: boolean;
    snapStep: [number, number];
    showMiniMap: boolean;
  };
  setBgView: (value: any) => void;
  hideAllTopMenus: () => void;
  setSnapToGrid: () => void;
  setSnapStep: (step: number[]) => void;
  showMiniMap: () => void;
};

const topPanelSlice = (get: () => RFState, set: any): TopPanelSlice => ({
  settings: {
    snapToGrid:
      designerSettings && designerSettings.isGridSnapped ? true : false,
    snapStep: [
      Number(designerSettings?.gridStep),
      Number(designerSettings?.gridStep),
    ],
    showMiniMap:
      designerSettings && designerSettings.showMiniMap ? true : false,
  },

  setBgView: topMenuActions.setBgView(set),
  hideAllTopMenus: topMenuActions.hideAllTopMenus(get, set),
  setSnapToGrid: topMenuActions.setSnapToGrid(get, set),
  setSnapStep: topMenuActions.setSnapStep(get, set),
  showMiniMap: topMenuActions.showMiniMap(get, set),
});

export default topPanelSlice;
