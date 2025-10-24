import React, { useState, RefObject } from "react";
import s from "./SearchBlockInput.module.scss";
import useStore from "store/store";
import { RFState } from "shared/types/rfState";
import { NodeType } from "shared/interfaces/INode";
import NodeListItem from "../NodeListItem/NodeListItem";
import useEscapeKeyHandler from "hooks/useEscapeKeyHandler";

interface SearchBlockProps {
  leftPanelRef: RefObject<HTMLDivElement>;
}

export default function SearchBlock({ leftPanelRef }: SearchBlockProps) {
  const [filter, setFilter] = useState<string>("");
  const blockList = useStore((state: RFState) => state.flowSlice.blockList);

  function performBlockSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFilter(value);
  }

  const filteredList = blockList.filter((block: NodeType) =>
    filter.length > 0
      ? block.data.name.toLowerCase().includes(filter.toLowerCase())
      : null
  );

  useEscapeKeyHandler(() => setFilter(""));

  return (
    <div className={s.wrapper}>
      {/* <div>Block Search</div> */}
      <input
        type="text"
        value={filter}
        onChange={performBlockSearch}
        placeholder="Search blocks"
      />
      {filteredList.length > 0 && (
        <div className={s.results}>
          {filteredList.map((block: NodeType, index: number) => (
            <NodeListItem
              key={index}
              nodeType={block}
              leftPanelRef={leftPanelRef}
            ></NodeListItem>
          ))}
        </div>
      )}
    </div>
  );
}
