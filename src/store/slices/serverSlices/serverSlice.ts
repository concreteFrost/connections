import { RFState } from "shared/types/rfState";
import { FlowConfig, FlowData } from "shared/interfaces/Iflow";
import serverActions from "store/actions/serverActions/serverActions";
import { LogObject } from "shared/interfaces/IServer";
import { BlockLookup } from "shared/interfaces/IBlock";

export type ServerSlice = {
  logSearch: {
    logList: Array<LogObject>;
  };
  setLogList: (
    list: Array<LogObject>,
    flowList: Array<FlowConfig>,
    blockList: Array<BlockLookup>
  ) => void;
};

const serverSlice = (get: () => RFState, set: any): ServerSlice => ({
  logSearch: {
    logList: [],
  },
  setLogList: serverActions.setLogList(get, set),
});

export default serverSlice;
