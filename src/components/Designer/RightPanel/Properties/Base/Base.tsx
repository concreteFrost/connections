import { useEffect, useState } from "react";
import useStore from "../../../../../store/store";
import s from "./Base.module.scss";
import { IBlockData } from "../../../../../store/interfaces/IBlock";
import { IVisual } from "../../../../../store/interfaces/Ivisual";

function Base() {
  const selectedBlockID: any = useStore((state) => state.selectedBlockID);
  const currentBlock = useStore<IBlockData | undefined>((store) => store.flow.blockData.find((x: IBlockData) => x.blockIdentifier === selectedBlockID));
  const currentBlockVisual = useStore<IVisual | undefined>((store) => store.flow.visual.blocks.find((x: IVisual) => x.id === selectedBlockID));
  const setNodeName = useStore((state) => state.setNodeName);
  const setNodeColor = useStore((state) => state.setNodeColor);
  const setNodeDescription = useStore((state) => state.setNodeDescription);

  function _setNodeName(e: any) {
    setNodeName(e.target.value);
  }

  function _setNodeColor(e: any) {
    setNodeColor(e.target.value);
  }

  function _setNodeDescription(e: any) {
    setNodeDescription(e.target.value);
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
            onChange={(e: any) => _setNodeName(e)}
          />
        </li>
        <li>
          <label className={s.input_label}>COLOR</label>
          <div className={s.color_input}>
            <input
              type="color"
              value={currentBlockVisual?.data.color}
              onChange={(e: any) => _setNodeColor(e)}
            />
          </div>
        </li>
        <li>
          <label className={s.input_label}>DESCRIPTION</label>
          <input
            type="text"
            placeholder="Description"
            value={currentBlock?.description}
            onChange={(e: any) => _setNodeDescription(e)}
          />
        </li>
      </ul>
    </div>
  );
}

export default Base;
