import { create } from "zustand";
import actions from "../actions/combinedActions";

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
    setBgView: (value: any) => void; // The type of this function depends on actions.topMenuActions.setBgView
    hideAllTopMenus: () => void; // The type of this function depends on actions.topMenuActions.hideAllTopMenus
    toggleDropdown: (activeDropdown: string) => void; // The type of this function depends on actions.topMenuActions.toggleDropdown
    setSnapToGrid: () => void; // The type of this function depends on actions.topMenuActions.setSnapToGrid
    setSnapStep: (step: number[]) => void; // The type of this function depends on actions.topMenuActions.setSnapStep
    showMiniMap: () => void; // The type of this function depends on actions.topMenuActions.showMiniMap

};

const topPanelSlice = (get: any, set: any): TopPanelSlice => ({
    dropdowns: {
        view: { id: 'view', isVisible: false },
        exportFlow: { id: 'exportFlow', isVisible: false },
        settings: { id: 'settings', isVisible: false }
    },
    settings: {
        snapToGrid: false,
        snapStep: [1, 1],
        showMiniMap: true
    },

    setBgView: actions.topMenuActions.setBgView(set),
    hideAllTopMenus: actions.topMenuActions.hideAllTopMenus(get, set),
    toggleDropdown: actions.topMenuActions.toggleDropdown(get, set),
    setSnapToGrid: actions.topMenuActions.setSnapToGrid(get, set),
    setSnapStep: actions.topMenuActions.setSnapStep(get, set),
    showMiniMap: actions.topMenuActions.showMiniMap(get, set),

})

export default topPanelSlice;