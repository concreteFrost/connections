import { RFState } from "../types/rfState"
import { IFlowData } from "../interfaces/Iflow";
import serverActions from "../actions/serverActions";

export type ServerSlice = {

    currentFlow: IFlowData | object;
    //Server Actions
    getCurrentFlow: (flowId: string) => void;
    toggleFlowControlState: (isEnabled: boolean) => void;

}

const serverSlice = (get: () => RFState, set: any): ServerSlice => ({
    currentFlow: {},
    getCurrentFlow: serverActions.getCurrentFlow(get, set),
    toggleFlowControlState: serverActions.toggleFlowControlState(get, set)
})

export default serverSlice;