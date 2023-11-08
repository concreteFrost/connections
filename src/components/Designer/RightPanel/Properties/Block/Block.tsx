import useStore from "../../../../../store/store";
import PropertiesInput from "./PropertiesInput/PropertiesInput";
import s from "./Block.module.scss";
import { IBlockData } from "../../../../../store/interfaces/IBlock";

function Block() {
  const selectedBlockID = useStore((state) => state.selectedBlockID);
  const blockData = useStore<IBlockData | undefined>((state) => state.flowSlice.flow.blockData.find((x: IBlockData) => x.blockIdentifier === selectedBlockID));

  return (
    <div className={s.wrapper}>
      <h5>BLOCK</h5>
      <ul>
        {blockData?.parameters && blockData.parameters.length > 0
          ? Object.entries(blockData.parameters).map(([key, val]: Array<any>) => (
            <li key={key}>
              <PropertiesInput
                blockData={val}
              ></PropertiesInput>
            </li>
          ))
          : null}
      </ul>
    </div>
  );
}

export default Block;
