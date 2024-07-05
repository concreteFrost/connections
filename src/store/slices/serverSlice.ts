import { RFState } from "store/types/rfState"
import { FlowConfig, FlowData } from "store/interfaces/Iflow";
import serverActions from "store/actions/serverActions";
import { LogObject } from "store/interfaces/IServer";
import { BlockLookup } from "store/interfaces/IBlock";

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