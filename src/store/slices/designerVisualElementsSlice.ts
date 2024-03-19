import { BackgroundVariant } from "react-flow-renderer";
import { RFState } from "../types/rfState";
import tooltipActions from "../actions/tooltipActions";
import { toggleSubstitutionsPanel } from "../actions/substitutionsActions";
import valueEditorActions from "../actions/valueEditorActions";
import { getUserSettingsData, initialSettings } from "../actions/storageActions";
import { Node } from "react-flow-renderer";

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

}

const designerVisualElementsSlice = (get: () => RFState, set: any): DesignerVisualElementsSlice =>
({
    view: getUserSettingsData().designer.canvasView,  
    tooltip: {
        text: ''
    },
    substitutionsPanel: {
        isCollapsed: false,
    },
    valueEditor: {
        valueToEdit: '',
        parameterToModify: ''
    },
    errorMessages: {
        substitutionAddError: ''
    },

    setTooltipText: tooltipActions.setTooltipText(get, set),
    toggleSubstitutionsPanel: toggleSubstitutionsPanel(get, set),
    getParameterValue: valueEditorActions.getParameterValue(set),
    setParameterValue: valueEditorActions.setParameterValue(get, set),

})

export default designerVisualElementsSlice;