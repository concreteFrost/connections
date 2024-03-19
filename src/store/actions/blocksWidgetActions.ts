import { RFState } from "../types/rfState";
import { Node } from "react-flow-renderer";

const setSelectedBlocksColors=(get:()=>RFState,set:any)=> (color: string) => {
    const selectedBlocks: Node<any>[] =
      get().flowSlice.flow.visual.blocks.filter(
        (block: Node) => block.selected
      );

    if (selectedBlocks.length > 0) {
      const updatedBlocks = get().flowSlice.flow.visual.blocks.map(
        (block: any) => {
          if (block.selected) {
            // Обновляем цвет только у выделенных блоков
            return { ...block, data: { ...block.data, color: color } };
          } else {
            // Оставляем невыделенные блоки без изменений
            return block;
          }
        }
      );
      const updatedFlow = { ...get().flowSlice.flow };
      updatedFlow.visual.blocks = updatedBlocks;

      set((state: RFState) => ({ flow: updatedFlow })); // Обновляем состояние с новым объектом flow
    }
  }

  const allignSelectedBlocksVerticaly=(get:()=>RFState,set:any)=>() => {
    const selectedBlocks: Node<any>[] =
      get().flowSlice.flow.visual.blocks.filter(
        (block: Node) => block.selected
      );

    if (selectedBlocks.length > 0) {
      // finding middle block
      const middleBlock = selectedBlocks.reduce((acc, curr) => {
        return (acc.position.y + acc.width!) / 2 >
          (curr.position.y + curr.width!) / 2
          ? curr
          : acc;
      });

      // getting vertical position of middle block
      const middlePositionY = (middleBlock.position.y + middleBlock.width!) / 2;

      // moving other selected blocks to the middle one on y pos
      const updatedBlocks = get().flowSlice.flow.visual.blocks.map(
        (block: Node<any>) => {
          if (block.selected) {
            const deltaY =
              middlePositionY - (block.position.y + block.width! / 2);
            return {
              ...block,
              position: {
                x: block.position.x, // x position stays
                y: block.position.y + deltaY, // applying y post
              },
            };
          } else {
            return block;
          }
        }
      );

      const updatedFlow = { ...get().flowSlice.flow };
      updatedFlow.visual.blocks = updatedBlocks;
      set((state: RFState) => ({ flow: updatedFlow })); // Обновляем состояние с новым объектом flow
    }
}

const blocksWidgetActions = {
    setSelectedBlocksColors:setSelectedBlocksColors,
    allignSelectedBlocksVerticaly:allignSelectedBlocksVerticaly
}

export default blocksWidgetActions;