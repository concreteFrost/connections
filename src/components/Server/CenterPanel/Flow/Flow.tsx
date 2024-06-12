import s from "./Flow.module.scss";
import BlockTable from "./FlowElements/BlockTable";
import ChangeLog from "./FlowElements/ChangeLog";
import FlowControl from "./FlowElements/FlowControl";
import StaticProperties from "./FlowElements/StaticProperties";
import { useState, useEffect } from "react";
import { FlowStatus } from "store/interfaces/IStatistics";
import { useParams } from "react-router";
import useStore from "store/store";

function Flow() {
  const { id }: any = useParams();
  const [blockData, setBlockData] = useState<any>();
  const [staticProps, setStaticProps] = useState<any>();
  const { statistics } = useStore((state) => state.statisticsSlice);

  const getFlowData = () => {
    const stats: FlowStatus[] | null = statistics;
    if (stats) {
      const matchFlow = stats.find((x: FlowStatus) => x.flowId === id);
      if (matchFlow) {
        setBlockData(matchFlow.statistics);
        const { statistics, ...data } = matchFlow;
        setStaticProps(data);
      }
    }
  };

  useEffect(() => {
    getFlowData(); 
  }, [id, statistics]);

  return (
    <div className={s.wrapper}>
      {staticProps ? (
        <>
          <StaticProperties
            className={s}
            staticProperties={{
              flowName: staticProps.name,
              flowIdentifier: staticProps.flowId,
              flowVersion: staticProps.version,
              startBlock: staticProps.startBlock,
              lastAmended: staticProps.lastUpdated,
              lastAmendedBy: staticProps.lastUpdateBy,
              created: staticProps.dateCreated,
              createdBy: staticProps.createdBy,
              status: staticProps.status,
            }}
          />
          <ChangeLog className={s} />
          <FlowControl className={s} status={staticProps.status} />
        </>
      ) : null}
      <BlockTable className={s} blockData={blockData} />
    </div>
  );
}

export default Flow;
