import { IBlockData, IBlockDataExtended } from "../../../../store/interfaces/IBlock";
import { IFlowData } from "../../../../store/interfaces/Iflow";
import useStore from "../../../../store/store";
import s from "./Flow.module.scss";
import BlockTable from "./FlowElements/BlockTable";
import ChangeLog from "./FlowElements/ChangeLog";
import FlowControl from "./FlowElements/FlowControl";
import StaticProperties from "./FlowElements/StaticProperties";

function Flow() {
  const currentFlow = useStore((state) => state.serverSlice.currentFlow) as IFlowData;

  return (
    <div className={s.wrapper}>
      {currentFlow.flowIdentifier ? <><StaticProperties
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
      <FlowControl className={s}></FlowControl></> : null}
      <BlockTable className={s} blockData={currentFlow.blockData as IBlockDataExtended[]}></BlockTable>
    </div>
  );
}

export default Flow;
