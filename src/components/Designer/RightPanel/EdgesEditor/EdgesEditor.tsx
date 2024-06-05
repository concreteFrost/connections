import { useEffect, useState, useCallback, useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import s from "./EdgesEditor.module.scss";
import useStore from "../../../../store/store";
import { connectionsIcons } from "../../../../assets/icons/icons";
import React from "react";

export interface IEdgeDraggable {
  blockName: string;
  targetEdgeID: string;
  priority: any;
}

function EdgesEditor() {
  const selectedBlockID = useStore(
    (state) => state.flowSlice.flow.visual.blocks.find((b) => b.selected)?.id
  );
  const { blockData, visual } = useStore((state) => state.flowSlice.flow);
  const [edgesArray, setEdgesArray] = useState<Array<IEdgeDraggable>>([]);
  const { reorderEdgesPriority } = useStore((state) => state.flowSlice);

  useEffect(() => {
    if (!selectedBlockID) {
      setEdgesArray([]);
      return;
    }

    const edges = visual.edges.filter((e) => e.source === selectedBlockID);
    const targetEdgesIds = edges.map((e) => e.target);
    const blocks: any = [];

    blockData.forEach((b) => {
      if (targetEdgesIds.includes(b.blockIdentifier)) {
        const newDraggableElement: IEdgeDraggable = {
          blockName: b.blockLabel,
          targetEdgeID: targetEdgesIds.find((x: any) => x === b.blockIdentifier)!,
          priority: edges.find((e) => e.target === b.blockIdentifier)?.priority,
        };
        blocks.push(newDraggableElement);
      }
    });

    blocks.sort((a: any, b: any) => a.priority - b.priority);

    setEdgesArray(blocks);
  }, [selectedBlockID, visual, blockData]);

  const handleDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return;
      const items = [...edgesArray];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      reorderEdgesPriority(items);
    },
    [edgesArray, reorderEdgesPriority]
  );

  const renderDraggableItems = useMemo(
    () =>
      edgesArray.map((edgeItem: IEdgeDraggable, index: number) => (
        <Draggable key={index} draggableId={index.toString()} index={index} >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{ ...provided.draggableProps.style, position: 'static' }}
            >
              <div className={s.block_wrapper}>
                <div className={s.icon_wrapper}>
                  <span>{connectionsIcons.downUpArrow}</span>
                </div>
                <div className={s.block_name}>{edgeItem.blockName}</div>
                <div className={s.priority}>Priority:{edgeItem.priority}</div>
              </div>
            </div>
          )}
        </Draggable>
      )),
    [edgesArray]
  );

  return (
    <section className={s.section_container}>
      {edgesArray.length > 1 ? (
        <>
          <div className={s.section_header}>EDGES PRIORITY</div>
          <div className={s.draggable_container}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="edges">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {renderDraggableItems}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </>
      ) : null}
    </section>
  );
}

export default React.memo(EdgesEditor);
