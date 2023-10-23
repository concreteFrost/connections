import useStore from "../../../../store/store";
import s from "./Flow.module.scss";
import BlockTable from "./FlowElements/BlockTable";
import ChangeLog from "./FlowElements/ChangeLog";
import FlowControl from "./FlowElements/FlowControl";
import StaticProperties from "./FlowElements/StaticProperties";

function Flow() {
  const currentFlow = useStore((state: any) => state.server.currentFlow);
  console.log(currentFlow, 'block data')
  return (
    <div className={s.wrapper}>
      <StaticProperties
        className={s}
        staticProperties={{
          flowName: currentFlow.flowName,
          flowIdentifier: currentFlow.flowIdentifier,
          flowVersion: currentFlow.flowVersion,
          startBlock: currentFlow.startBlock,
          lastAmended: currentFlow.lastAmended,
          lastAmendedBy: currentFlow.lastAmendedBy,
          created: currentFlow.created,
          createdBy: currentFlow.createdBy,
        }}
      ></StaticProperties>
      <ChangeLog className={s}></ChangeLog>
      <FlowControl className={s}></FlowControl>
      <BlockTable className={s} blockData={currentFlow.blockData}></BlockTable>
    </div>
  );
}

export default Flow;
