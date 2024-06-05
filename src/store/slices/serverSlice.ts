import { RFState } from "../types/rfState"
import { FlowConfig, FlowData } from "../interfaces/Iflow";
import serverActions from "../actions/serverActions";
import { LogObject } from "../interfaces/IServer";
import { BlockLookup } from "../interfaces/IBlock";

export type ServerSlice = {

    logSearch:{
        logList: Array<LogObject>
    }
    setLogList:(list: Array<LogObject>, flowList: Array<FlowConfig>, blockList: Array<BlockLookup>)=>void;

}

const serverSlice = (get: () => RFState, set: any): ServerSlice => ({

    logSearch:{
        logList:[]
    },
    setLogList:serverActions.setLogList(get,set)
})

export default serverSlice;