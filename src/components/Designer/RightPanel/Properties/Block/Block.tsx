import useStore from "../../../../../store/store";
import PropertiesInput from "./PropertiesInput/PropertiesInput";
import s from "./Block.module.scss";
import { IBlockData } from "../../../../../store/interfaces/IBlock";
import { useEffect } from "react";



function Block() {
  const selectedBlockID = useStore((state) => state.selectedBlockID);
  const blockData = useStore<IBlockData | undefined>((state) => state.flowSlice.flow.blockData.find((x: IBlockData) => x.blockIdentifier === selectedBlockID));

  return (
    <div>
      <h5>BLOCK</h5>
      <ul className={s.block_section}>
        {blockData?.parameters && blockData.parameters.length > 0
          ? Object.entries(blockData.parameters).map(([key, val]: Array<any>) => (
            <li key={key}>
              <PropertiesInput
                blockData={val}
                classData={s.input_label}
              ></PropertiesInput>
            </li>
          ))
          : null}
      </ul>
    </div>
  );
}

export default Block;
