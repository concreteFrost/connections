import { RFState } from "../types/rfState"
import actions from "../actions/combinedActions";
import { IFlowData } from "../interfaces/Iflow";

export type ServerSlice = {

    currentFlow: IFlowData | object;
    //Server Actions
    getCurrentFlow: (flowId: string) => void;
    toggleFlowControlState: (isEnabled: boolean) => void;

}

const serverSlice = (get: () => RFState, set: any): ServerSlice => ({
    currentFlow: {},
    getCurrentFlow: actions.serverActions.getCurrentFlow(get, set),
    toggleFlowControlState: actions.serverActions.toggleFlowControlState(get, set)
})

export default serverSlice;