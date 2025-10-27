import { BackgroundVariant } from "react-flow-renderer";
import { RFState } from "shared/types/rfState";
import { getUserSettingsData } from "store/actions/sharedActions/storageActions";
import designerVisualElementsActions from "store/actions/designerActions/designerVisualElementsActions";

export type DesignerVisualElementsSlice = {
  substitutionsPanel: {
    isCollapsed: boolean;
  };
  valueEditor: {
    valueToEdit: string;
    parameterToModify: string;
  };
  errorMessages: {
    substitutionAddError: string;
  };

  view: BackgroundVariant;

  settings: {
    snapToGrid: boolean;
    snapStep: [number, number];
    showMiniMap: boolean;
  };

  toggleSubstitutionsPanel: () => void;
  getParameterValue: (parameterName: string, value: string) => void;
  setParameterValue: (propertyName: string, value: string) => void;

  setBgView: (value: any) => void;
  hideAllTopMenus: () => void;
  setSnapToGrid: () => void;
  setSnapStep: (step: number[]) => void;
  showMiniMap: () => void;
};

const userSettingsData = getUserSettingsData();
const designerSettings = userSettingsData?.designer;

const designerVisualElementsSlice = (
  get: () => RFState,
  set: any
): DesignerVisualElementsSlice => ({
  view: designerSettings?.canvasView,

  substitutionsPanel: {
    isCollapsed: false,
  },
  valueEditor: {
    valueToEdit: "",
    parameterToModify: "",
  },
  errorMessages: {
    substitutionAddError: "",
  },

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

  toggleSubstitutionsPanel: designerVisualElementsActions(get, set)
    .toggleSubstitutionsPanel,

  getParameterValue: designerVisualElementsActions(get, set).getParameterValue,
  setParameterValue: designerVisualElementsActions(get, set).setParameterValue,

  setBgView: designerVisualElementsActions(get, set).setBgView,
  hideAllTopMenus: designerVisualElementsActions(get, set).hideAllTopMenus,
  setSnapToGrid: designerVisualElementsActions(get, set).setSnapToGrid,
  setSnapStep: designerVisualElementsActions(get, set).setSnapStep,
  showMiniMap: designerVisualElementsActions(get, set).toggleMiniMap,
});

export default designerVisualElementsSlice;
