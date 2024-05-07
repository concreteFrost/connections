import { RFState } from "../types/rfState";
import { Node, Edge } from "react-flow-renderer";
import { blockAlignment } from "./utils/blockUtils";
import { IBlockData } from "../interfaces/IBlock";
import IConnectionsEdge from "../interfaces/IConnectionsEdges";

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

  const allignSelectedBlocks=(get:()=>RFState,set:any)=>(alignment: 'x' | 'y') => {
    const selectedBlocks: Node<any>[] =
      get().flowSlice.flow.visual.blocks.filter(
        (block: Node) => block.selected
      );

    if (selectedBlocks.length > 0) {
      // finding middle block
      const updatedBlocks = blockAlignment(get,selectedBlocks,alignment);

      const updatedFlow = { ...get().flowSlice.flow };
      updatedFlow.visual.blocks = updatedBlocks;
      set((state: RFState) => ({ flow: updatedFlow })); // Обновляем состояние с новым объектом flow
    }
}

const deleteMultipleBlocks = (get:()=>RFState,set:any)=>() => {
  const selectedBlocks: Node<any>[] =
    get().flowSlice.flow.visual.blocks.filter(
      (block: Node) => block.selected
    );

    if(selectedBlocks.length>0){
      
       const filteredVisualBlocks : Node<any>[] = get().flowSlice.flow.visual.blocks.filter((block:Node)=> !selectedBlocks.some((block2:Node)=> block.id === block2.id));
       const filteredBlocksData: IBlockData[] = get().flowSlice.flow.blockData.filter((block:IBlockData)=> !selectedBlocks.some((block2:Node)=>block.blockIdentifier === block2.id));
       const filteredEdgesData: IConnectionsEdge[] = get().flowSlice.flow.visual.edges.filter((edge:IConnectionsEdge)=> !selectedBlocks.some((block:Node)=>  edge.source === block.id || edge.target === block.id));

       set((state: RFState) => ({
        selectedBlockID: [],
        flowSlice: {
          ...state.flowSlice,
          flow: {
            ...state.flowSlice.flow,
            blockData: filteredBlocksData,
            visual: {
              ...state.flowSlice.flow.visual,
              blocks: filteredVisualBlocks,
              edges: filteredEdgesData
            }
          }
        }
    
      }))
    

       console.log('filtered data',filteredBlocksData)
       console.log(get().flowSlice.flow)
    }
}

const blocksWidgetActions = {
    setSelectedBlocksColors:setSelectedBlocksColors,
    allignSelectedBlocks:allignSelectedBlocks,
    deleteMultipleBlocks:deleteMultipleBlocks
}

export default blocksWidgetActions;