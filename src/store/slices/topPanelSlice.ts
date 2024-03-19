import { getUserSettingsData, initialSettings } from "../actions/storageActions";
import topMenuActions from "../actions/topViewActions";
import { RFState } from "../types/rfState";

export type TopPanelSlice = {

    dropdowns: {
        view: { id: string; isVisible: boolean };
        exportFlow: { id: string; isVisible: boolean };
        settings: { id: string; isVisible: boolean };
    };
    settings: {
        snapToGrid: boolean;
        snapStep: [number, number];
        showMiniMap: boolean;
    };
    setBgView: (value: any) => void;
    hideAllTopMenus: () => void;
    toggleDropdown: (activeDropdown: string) => void;
    setSnapToGrid: () => void;
    setSnapStep: (step: number[]) => void;
    showMiniMap: () => void;

};

const topPanelSlice = (get: ()=>RFState, set: any): TopPanelSlice => ({
    dropdowns: {
        view: { id: 'view', isVisible: false },
        exportFlow: { id: 'exportFlow', isVisible: false },
        settings: { id: 'settings', isVisible: false }
    },
    settings: {
        snapToGrid: getUserSettingsData().designer.isGridSnapped ? true : false,
        snapStep: [Number(getUserSettingsData().designer.gridStep),Number(getUserSettingsData().designer.gridStep)],
        showMiniMap: true
    },

    setBgView: topMenuActions.setBgView(set),
    hideAllTopMenus: topMenuActions.hideAllTopMenus(get, set),
    toggleDropdown: topMenuActions.toggleDropdown(get, set),
    setSnapToGrid: topMenuActions.setSnapToGrid(get, set),
    setSnapStep: topMenuActions.setSnapStep(get, set),
    showMiniMap: topMenuActions.showMiniMap(get, set),

})

export default topPanelSlice;