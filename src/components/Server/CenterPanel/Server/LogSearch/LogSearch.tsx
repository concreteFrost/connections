import { useState } from "react";
import s from "./LogSearch.module.scss";
import DateRange from "./LogSearchElements/DateRange";
import FlowBlock from "./LogSearchElements/FlowBlock";
import Keys from "./LogSearchElements/Keys";
import OutputSearchButtons from "./LogSearchElements/OutputSearchButtons";
import TextSearch from "./LogSearchElements/TextSearch";
import LogTable from "./LogTable/LogTable";
import { getDataLogsAPI } from "../../../../../api/data";
import moment from "moment";
import useStore from "../../../../../store/store";
import { IFlowConfig } from "../../../../../store/interfaces/Iflow";
import { IBlockLookup } from "../../../../../store/interfaces/IBlock";
import { ILogSearchQuery } from "../../../../../store/interfaces/IServer";

const initialLogSearchQuery: ILogSearchQuery = {
  type: undefined,
  status: undefined,
  flowId: undefined,
  blockId: undefined,
  timeFrom: "",
  timeTo: "",
  searchText: undefined,
};

function LogSearch(props: { setCurrentView: (view: string) => void }) {
  const [logSearchQuery, setLogSearchQuery] = useState<ILogSearchQuery>(
    initialLogSearchQuery
  );
  const [loadedLiveFlows, setLoadedLiveFlows] = useState<Array<IFlowConfig>>(
    []
  );
  const [loadedBlocks, setLoadedBlocks] = useState<Array<IBlockLookup>>([]);
  const { setLogList } = useStore((state) => state.serverSlice);

  const updateLogSearchQuery = (key: keyof ILogSearchQuery, value: any) => {
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
      <div className={s.header}>
        <button onClick={() => props.setCurrentView("table")}>SERVER</button>
        <button onClick={()=>props.setCurrentView('kpis')}>KPIS</button>
      </div>
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
