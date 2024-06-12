import useStore from "store/store";
import s from "./Base.module.scss";
import { BlockData } from "store/interfaces/IBlock";
import { Visual } from "store/interfaces/Iflow";

function Base() {
  const currentBlock = useStore<BlockData | undefined>((store) =>
    store.flowSlice.flow.blockData.find(
      (x: BlockData) => x.blockIdentifier === store.flowSlice.flow.visual.blocks.find((b)=>b.selected)?.id)
    )
  
  const currentBlockVisual = useStore<Visual | undefined>((store) =>
    store.flowSlice.flow.visual.blocks.find(
      (x: Visual) => x.id === store.flowSlice.flow.visual.blocks.find((b)=>b.selected)?.id
    )
  );
  const {setBlockName,setBlockColor,setBlockDescription} = useStore((state) => state.flowSlice);

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
    <div className={s.wrapper}>
      <h5>BASE</h5>
      <ul>
        <li>
          <div className={s.grid_item}>
            {" "}
            <label>BLOCK NAME</label>
          </div>
          <div className={s.grid_item}>
            {" "}
            <input
              type="text"
              placeholder="Block Name"
              value={currentBlock?.blockLabel}
              onChange={(e: any) => _setBlockName(e)}
            />
          </div>
        </li>
        <li>
          <div className={s.grid_item}>
            <label>COLOR</label>
          </div>
          <div className={s.grid_item}>
            <input
              type="color"
              value={currentBlockVisual?.data.color}
              onChange={(e: any) => _setBlockColor(e)}
            />
          </div>
        </li>
        <li>
          <div className={s.grid_item}>
            <label>DESCRIPTION</label>
          </div>
          <div className={s.grid_item}>
            <input
              type="text"
              placeholder="Description"
              value={currentBlock?.description}
              onChange={(e: any) => _setBlockDescription(e)}
            />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Base;
