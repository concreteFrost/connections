import { RFState } from "../types/rfState"
import actions from "../actions/combinedActions";

export type ServerSlice = {

    currentFlow: any;
    //Server Actions
    getCurrentFlow: (flowId: string) => void;

}

const serverSlice = (get: () => RFState, set: any): ServerSlice => ({
    currentFlow: {},
    getCurrentFlow: actions.serverActions.getCurrentFlow(get, set),
})

export default serverSlice;