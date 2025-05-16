import { useState } from "react";
import s from "./LogSearch.module.scss";
import DateRange from "./LogSearchElements/DateRange";
import FlowBlock from "./LogSearchElements/FlowBlock";
import OutputSearchButtons from "./LogSearchElements/OutputSearchButtons";
import TextSearch from "./LogSearchElements/TextSearch";
import LogTable from "./LogTable/LogTable";
import { getDataLogsAPI } from "api/data";
import useStore from "store/store";
import { FlowConfig } from "store/interfaces/Iflow";
import { BlockLookup } from "store/interfaces/IBlock";
import { LogSearchQuery } from "store/interfaces/IServer";

const initialLogSearchQuery: LogSearchQuery = {
  type: undefined,
  status: undefined,
  flowId: undefined,
  blockId: undefined,
  timeFrom: "",
  timeTo: "",
  searchText: "",
};

function LogSearch() {
  const [logSearchQuery, setLogSearchQuery] = useState<LogSearchQuery>(
    initialLogSearchQuery
  );
  const [loadedLiveFlows, setLoadedLiveFlows] = useState<Array<FlowConfig>>([]);
  const [loadedBlocks, setLoadedBlocks] = useState<Array<BlockLookup>>([]);
  const { setLogList } = useStore((state) => state.serverSlice);

  const updateLogSearchQuery = (key: keyof LogSearchQuery, value: any) => {
    if (key in initialLogSearchQuery) {
      // Only update if the key exists in the initialLogSearchQuery
      setLogSearchQuery((prevQuery) => ({
        ...prevQuery,
        [key]: value,
      }));
    } else {
      console.error(`Invalid key: ${key}`);
    }
  };

  async function submitQuery() {
    try {
      const res = await getDataLogsAPI(logSearchQuery);
      const data = res.data;
      setLogList(data, loadedLiveFlows, loadedBlocks);
    } catch (e) {
      console.log("Error:", e);
    }
  }

  return (
    <div className={s.wrapper}>
      {/* <div className={s.header}>
        <button onClick={() => props.setCurrentView("table")}>SERVER</button>
        <button onClick={()=>props.setCurrentView('kpis')}>SEARCH</button>
      </div> */}
      <div className={s.log_grid}>
        <DateRange
          setTimeFrom={(
            value: string | number | readonly string[] | undefined
          ) => updateLogSearchQuery("timeFrom", value)}
          setTimeTo={(value: string | number | readonly string[] | undefined) =>
            updateLogSearchQuery("timeTo", value)
          }
          timeFrom={logSearchQuery.timeFrom}
          timeTo={logSearchQuery.timeTo}
        />
        <FlowBlock
          setFlowId={(value: string) => updateLogSearchQuery("flowId", value)}
          setBlockId={(value: string) => updateLogSearchQuery("blockId", value)}
          setStatus={(value: number) => updateLogSearchQuery("status", value)}
          setType={(value: number) => updateLogSearchQuery("type", value)}
          setLoadedLiveFlows={setLoadedLiveFlows}
          setLoadedBlocks={setLoadedBlocks}
          loadedBlocks={loadedBlocks}
          loadedLiveFlows={loadedLiveFlows}
          flowId={logSearchQuery.flowId}
          blockId={logSearchQuery.blockId}
          type={logSearchQuery.type}
          status={logSearchQuery.status}
        />
        <TextSearch
          setSearchText={(value: string) =>
            updateLogSearchQuery("searchText", value)
          }
          searchText={logSearchQuery.searchText}
        />
        {/* <Keys onUpdate={(value) => updateLogSearchQuery("key", value)} /> */}
      </div>
      <OutputSearchButtons submitQuery={submitQuery}></OutputSearchButtons>
      <LogTable></LogTable>
    </div>
  );
}

export default LogSearch;
