import { BackgroundVariant } from "react-flow-renderer";
import { RFState } from "store/types/rfState";
import tooltipActions from "store/actions/tooltipActions";
import { toggleSubstitutionsPanel } from "store/actions/substitutionsActions";
import valueEditorActions from "store/actions/valueEditorActions";
import { getUserSettingsData} from "store/actions/storageActions";

export type DesignerVisualElementsSlice = {

    reactFlowInstance:any,
    reactFlowWrapper:any,

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
    setInstance:(instance:any)=>void;
    setFlowWrapper:(wrapper:any)=>void;
    setTooltipText: (text: string) => void;
    toggleSubstitutionsPanel: () => void;
    getParameterValue: (parameterName: string, value: string) => void;
    setParameterValue: (propertyName: string, value: string) => void;
}

const designerVisualElementsSlice = (get: () => RFState, set: any): DesignerVisualElementsSlice =>
({
    reactFlowInstance:null,
    reactFlowWrapper:null,
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

    // sets instance of the flow on flow init
    setInstance:(instance:any)=>{
        set((state:RFState)=>({
            designerVisualElementsSlice:{
                ...state.designerVisualElementsSlice,
                reactFlowInstance: instance
            }
        }))
        console.log('flow init');//
    },
    
    // added ref to get correct coordinates
    setFlowWrapper:(wrapper:any)=>{
        set((state:RFState)=>({
            designerVisualElementsSlice:{
                ...state.designerVisualElementsSlice,
                reactFlowWrapper: wrapper
            }
        }))
    },
    setTooltipText: tooltipActions.setTooltipText(get, set),
    toggleSubstitutionsPanel: toggleSubstitutionsPanel(get, set),
    getParameterValue: valueEditorActions.getParameterValue(set),
    setParameterValue: valueEditorActions.setParameterValue(get, set),

})

export default designerVisualElementsSlice;