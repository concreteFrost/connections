import { getUserSettingsData } from "store/actions/storageActions";
import topMenuActions from "store/actions/topViewActions";
import { RFState } from "store/types/rfState";

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

const topPanelSlice = (get: ()=>RFState, set: any): TopPanelSlice => ({
    settings: {
        snapToGrid: getUserSettingsData().designer.isGridSnapped ? true : false,
        snapStep: [Number(getUserSettingsData().designer.gridStep),Number(getUserSettingsData().designer.gridStep)],
        showMiniMap: getUserSettingsData().designer.showMiniMap ? true : false
    },

    setBgView: topMenuActions.setBgView(set),
    hideAllTopMenus: topMenuActions.hideAllTopMenus(get, set),
    setSnapToGrid: topMenuActions.setSnapToGrid(get, set),
    setSnapStep: topMenuActions.setSnapStep(get, set),
    showMiniMap: topMenuActions.showMiniMap(get, set),

})

export default topPanelSlice;