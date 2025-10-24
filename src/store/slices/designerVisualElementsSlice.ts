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

  tooltip: {
    text: string;
  };
  view: BackgroundVariant;

  setTooltipText: (text: string) => void;
  toggleSubstitutionsPanel: () => void;
  getParameterValue: (parameterName: string, value: string) => void;
  setParameterValue: (propertyName: string, value: string) => void;
};

const userSettingsData = getUserSettingsData();
const designerSettings = userSettingsData?.designer;

const designerVisualElementsSlice = (
  get: () => RFState,
  set: any
): DesignerVisualElementsSlice => ({
  view: designerSettings?.canvasView,
  tooltip: {
    text: "",
  },
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

  setTooltipText: designerVisualElementsActions(get, set).setTooltipText,
  toggleSubstitutionsPanel: designerVisualElementsActions(get, set)
    .toggleSubstitutionsPanel,

  getParameterValue: designerVisualElementsActions(get, set).getParameterValue,
  setParameterValue: designerVisualElementsActions(get, set).setParameterValue,
});

export default designerVisualElementsSlice;
