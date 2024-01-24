import { RFState } from "../types/rfState"
import { IFlowConfig, IFlowData } from "../interfaces/Iflow";
import serverActions from "../actions/serverActions";
import { ILogObject } from "../interfaces/IServer";
import { IBlockLookup } from "../interfaces/IBlock";

export type ServerSlice = {

    currentFlow: IFlowData | object;
    logSearch:{
        logList: Array<ILogObject>
    }
    //Server Actions
    getCurrentFlow: (flowId: string) => void;
    toggleFlowControlState: (isEnabled: boolean) => void;
    setLogList:(list: Array<ILogObject>, flowList: Array<IFlowConfig>, blockList: Array<IBlockLookup>)=>void;

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