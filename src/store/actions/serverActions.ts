import { getBlockStatisticsAPI, getFlowApi } from "../../api/flow";
import { RFState } from "../types/rfState";
import { LogObject } from "../interfaces/IServer";
import { FlowConfig } from "../interfaces/IFlow";
import { BlockLookup } from "../interfaces/IBlock";
import moment from "moment";

export const getCurrentFlow = (get: () => RFState, set: any) => async (flowId: string) => {
  let currentFlow = {
    blockData: []
  }
  let _stats = [{}]

  // await createUpdateDraftFromLiveAPI(flowId).then((res: any) => {
  //   currentFlow = res.data.flowConfiguration
  // }).catch(e => console.log(e))

  await getFlowApi(flowId).then((res:any)=>{
    
    if(res.data.success){
      currentFlow = res.data.flowData;
    }
    else{
      console.log(res.data.message)
    }
   
  }).catch(e=>console.log(e));

  await getBlockStatisticsAPI(flowId).then((res: any) => {
    _stats = res.data.statistics

  }).catch(e => console.log("error getting blocks statistics for " + flowId, e))
    .finally(() => {
      set((state: RFState) => ({
        serverSlice: {
          ...state.serverSlice,
          currentFlow: {
            ...currentFlow, blockData: currentFlow.blockData.map((block: any) => {
              const matchingStat = _stats.find((stat: any) => stat.blockId === block.blockIdentifier);
              return {
                ...block,

                stats: matchingStat ?? {}
              }
            })
          }
        }
      })
      )
    })
};

export const toggleFlowControlState = (get: () => RFState, set: any) => (isEnabled: boolean) => {
  set((state: RFState) => ({
    serverSlice: {
      ...state.serverSlice,
      currentFlow: {
        ...state.serverSlice.currentFlow,
        isEnabled: isEnabled
      }
    }

  }))
}

//#region LOG SEARCH
const setLogList = (get: () => RFState, set: any) => (data: Array<Object>, flowList: Array<FlowConfig>, blockList: Array<BlockLookup>) => {

  const convertedArray: Array<LogObject> = [];

  data.forEach((log: any) => {

    const trimmedObject: string[] = log.split('|').map((item: any) => item.trim());

    const obj: LogObject = {
      timeStamp: moment(trimmedObject[0]).format('YYYY-MM-DD HH:mm.SSS'),
      logType: trimmedObject[1],
      processId: trimmedObject[2],
      flowId: trimmedObject[3],
      blockId: trimmedObject[4],
      statusCode: trimmedObject[5],
      keyList: trimmedObject[6],
      duration: trimmedObject[7],
      additionalText: trimmedObject[8]
    }

    convertedArray.push(obj)

  });

  convertedArray.forEach((listItem: LogObject) => {
    const flow = flowList.find((flow: FlowConfig) => listItem.flowId.toLowerCase() === flow.flowId);

    if (flow) {
      listItem.flowId = flow.name;

    }

    const block = blockList.find((block: BlockLookup) => listItem.blockId.toLowerCase() === block.blockId);
    if (block) {
      listItem.blockId = block.name;

    }

    switch (listItem.logType) {
      case '0': listItem.logType = "SYSTEM";
        break;
      case '1': listItem.logType = "INFORMATION";
        break;
      case '2': listItem.logType = "DEBUG";
        break;
      default: listItem.logType = "undefined";
        break;
    }

    switch (listItem.statusCode) {
      case '0': listItem.statusCode = "OK";
        break;
      case '1': listItem.statusCode = "WARNING";
        break;
      case '2': listItem.statusCode = "ERROR";
        break;
      default: listItem.statusCode = "FATAL ERROR";
        break;
    }
  });

  set((state: RFState) => ({
    serverSlice: {
      ...state.serverSlice,
      logSearch: {
        ...state.serverSlice.logSearch,
        logList: convertedArray
      }
    }
  }))

}


const serverActions = {
  getCurrentFlow: getCurrentFlow,
  toggleFlowControlState: toggleFlowControlState,
  setLogList: setLogList

}

export default serverActions;
