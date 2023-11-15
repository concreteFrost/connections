import { BackgroundVariant } from "react-flow-renderer";
import { RFState } from "../types/rfState";
import { setTooltipText } from "../actions/tooltipActions";
import { toggleSubstitutionsPanel } from "../actions/substitutionsActions";
import valueEditorActions from "../actions/valueEditorActions";

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

    view: BackgroundVariant.Dots,

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

    setTooltipText: setTooltipText(get, set),
    toggleSubstitutionsPanel: toggleSubstitutionsPanel(get, set),
    getParameterValue: valueEditorActions.getParameterValue(set),
    setParameterValue: valueEditorActions.setParameterValue(get, set),

})

export default designerVisualElementsSlice;