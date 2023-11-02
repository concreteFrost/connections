import useStore from "../../../../../store/store";
import s from "./Base.module.scss";
import { IBlockData } from "../../../../../store/interfaces/IBlock";
import { IVisual } from "../../../../../store/interfaces/Ivisual";

function Base() {
  const selectedBlockID: any = useStore((state) => state.selectedBlockID);
  const currentBlock = useStore<IBlockData | undefined>((store) => store.flowSlice.flow.blockData.find((x: IBlockData) => x.blockIdentifier === selectedBlockID));
  const currentBlockVisual = useStore<IVisual | undefined>((store) => store.flowSlice.flow.visual.blocks.find((x: IVisual) => x.id === selectedBlockID));
  const setBlockName = useStore((state) => state.flowSlice.setBlockName);
  const setBlockColor = useStore((state) => state.flowSlice.setBlockColor);
  const setBlockDescription = useStore((state) => state.flowSlice.setBlockDescription);

  function _setBlockName(e: any) {
    setBlockName(e.target.value);
  }

  function _setBlockColor(e: any) {
    setBlockColor(e.target.value);
  }

  function _setBlockDescription(e: any) {
    setBlockDescription(e.target.value);
  }
  return (
    <div>
      <h5>BASE</h5>
      <ul className={s.properties_list}>
        <li>
          <label className={s.input_label}>BLOCK NAME</label>
          <input
            type="text"
            placeholder="Block Name"
            value={currentBlock?.blockLabel}
            onChange={(e: any) => _setBlockName(e)}
          />
        </li>
        <li>
          <label className={s.input_label}>COLOR</label>
          <div className={s.color_input}>
            <input
              type="color"
              value={currentBlockVisual?.data.color}
              onChange={(e: any) => _setBlockColor(e)}
            />
          </div>
        </li>
        <li>
          <label className={s.input_label}>DESCRIPTION</label>
          <input
            type="text"
            placeholder="Description"
            value={currentBlock?.description}
            onChange={(e: any) => _setBlockDescription(e)}
          />
        </li>
      </ul>
    </div>
  );
}

export default Base;
