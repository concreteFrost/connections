import { BackgroundVariant } from "react-flow-renderer";
import { RFState } from "../types/rfState";
import actions from "../actions/combinedActions";

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

    setTooltipText: actions.tooltipActions.setTooltipText(get, set),
    toggleSubstitutionsPanel: actions.substitutionsActions.toggleSubstitutionsPanel(get, set),
    getParameterValue: actions.valueEditorActions.getParameterValue(set),
    setParameterValue: actions.valueEditorActions.setParameterValue(get, set),

})

export default designerVisualElementsSlice;