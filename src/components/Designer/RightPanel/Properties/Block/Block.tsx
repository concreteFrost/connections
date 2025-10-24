import useStore from "store/store";
import PropertiesInput from "./PropertiesInput/PropertiesInput";
import s from "./Block.module.scss";
import { BlockData } from "shared/interfaces/IBlock";
import { useMemo } from "react";

function Block() {
  const blockData = useStore<BlockData | undefined>((state) => {
    const selectedBlockId = state.flowSlice.flow.visual.blocks.find(
      (b) => b.selected
    )?.id;
    return state.flowSlice.flow.blockData.find(
      (x: BlockData) => x.blockIdentifier === selectedBlockId
    );
  });

  // Memoize blockData to avoid unnecessary calculations
  const memoizedBlockData = useMemo(() => blockData, [blockData]);

  return (
    <div className={s.wrapper}>
      <h5>BLOCK</h5>
      <ul>
        {memoizedBlockData?.parameters &&
          Object.keys(memoizedBlockData.parameters).length > 0 &&
          Object.entries(memoizedBlockData.parameters).map(([key, val]) => (
            <li key={key} className={s.list_item}>
              <PropertiesInput blockData={val} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Block;
