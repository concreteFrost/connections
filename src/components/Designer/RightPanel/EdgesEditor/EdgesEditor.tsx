
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import s from "./EdgesEditor.module.scss";
import useStore from "../../../../store/store";
import { connectionsIcons } from "../../../../icons/icons";

export interface IEdgeDraggable {
  blockName: string;
  targetEdgeID: string;
  priority: any;
}

function EdgesEditor() {

  const selectedBlockID = useStore((state) => state.flowSlice.flow.visual.blocks.find((b) => b.selected)?.id);
  const { blockData, visual } = useStore((state) => state.flowSlice.flow);
  const [edgesArray, setEdgesArray] = useState<Array<IEdgeDraggable>>([]);
  const { reorderEdgesPriority } = useStore((state) => state.flowSlice);

  useEffect(() => {
    // empty edges array if block is not selected
    if (!selectedBlockID) {
      setEdgesArray([]);
      return;
    }

    const edges = visual.edges.filter((e) => e.source === selectedBlockID);
    //getting target ids
    const targetEdgesIds = edges.map((e) => e.target);
    const blocks: any = [];
    //itterating through block data to find edges ids that match
    //and then create new draggable element
    blockData.forEach((b) => {
      if (targetEdgesIds.includes(b.blockIdentifier)) {
        const newDraggableElement: IEdgeDraggable = {
          blockName: b.blockLabel,
          targetEdgeID: targetEdgesIds.find((x: any) => x === b.blockIdentifier)!,
          priority: edges.find((e) => e.target === b.blockIdentifier)?.priority
        }
        blocks.push(newDraggableElement);
      }
    })

    // sorting list by priority
    blocks.sort((a: any, b: any) => a.priority - b.priority);

    setEdgesArray(blocks);
  }, [selectedBlockID, visual])

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    //creating copy of edges array
    const items = [...edgesArray];
    //stores deleted {dragged} element
    const [reorderedItem] = items.splice(result.source.index, 1);
    console.log(reorderedItem)
    //inserts stored {dragged} element 
    items.splice(result.destination.index, 0, reorderedItem);

    reorderEdgesPriority(items);

  };

  return (
    <section className={s.section_container}>
      {edgesArray.length>1 ?
      <>
      <div className={s.section_header}>EDGES PRIORITY</div>
      <div className={s.draggable_container}>
      {/* Render edges array */}
        <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="edges">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {edgesArray.map((edgeItem: IEdgeDraggable, index: number) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
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
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext> 
      </div> </> : null}

    </section>
  );
}

export default EdgesEditor;
