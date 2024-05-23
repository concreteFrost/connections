import useStore from "../../../../../store/store";
import PropertiesInput from "./PropertiesInput/PropertiesInput";
import s from "./Block.module.scss";
import { IBlockData } from "../../../../../store/interfaces/IBlock";
import { useMemo } from "react";

function Block() {
  const blockData = useStore<IBlockData | undefined>((state) => {
    const selectedBlockId = state.flowSlice.flow.visual.blocks.find((b) => b.selected)?.id;
    return state.flowSlice.flow.blockData.find((x: IBlockData) => x.blockIdentifier === selectedBlockId);
  });

  // Memoize blockData to avoid unnecessary calculations
  const memoizedBlockData = useMemo(() => blockData, [blockData]);

  return (
    <div className={s.wrapper}>
      <h5>BLOCK</h5>
      <ul>
        {memoizedBlockData?.parameters && memoizedBlockData.parameters.length > 0
          ? Object.entries(memoizedBlockData.parameters).map(([key, val]: Array<any>) => (
            <li key={key} className={s.list_item}>
              <PropertiesInput blockData={val} />
            </li>
          ))
          : null}
      </ul>
    </div>
  );
}

export default Block;
