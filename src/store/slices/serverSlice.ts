import { RFState } from "../types/rfState"
import { FlowConfig, FlowData } from "../interfaces/IFlow";
import serverActions from "../actions/serverActions";
import { LogObject } from "../interfaces/IServer";
import { BlockLookup } from "../interfaces/IBlock";

export type ServerSlice = {

    currentFlow: FlowData | object;
    logSearch:{
        logList: Array<LogObject>
    }
    //Server Actions
    getCurrentFlow: (flowId: string) => void;
    toggleFlowControlState: (isEnabled: boolean) => void;
    setLogList:(list: Array<LogObject>, flowList: Array<FlowConfig>, blockList: Array<BlockLookup>)=>void;

}

const serverSlice = (get: () => RFState, set: any): ServerSlice => ({
    currentFlow: {},
    logSearch:{
        logList:[]
    },
    getCurrentFlow: serverActions.getCurrentFlow(get, set),
    toggleFlowControlState: serverActions.toggleFlowControlState(get, set),
    setLogList:serverActions.setLogList(get,set)
})

export default serverSlice;