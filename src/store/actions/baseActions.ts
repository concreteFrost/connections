
import { BlockData } from "../interfaces/IBlock";
import { Visual } from "../interfaces/IFlow";
import { RFState } from "../types/rfState";
import { getSelectedBlock } from "./utils/blockUtils";


export const getBlockProperties = (get: () => RFState, set: any) => () => {
  // const selectedBlockData = get()?.flowSlice.flow ? get().flowSlice.flow.blockData.find((block: IBlockData) => block.blockIdentifier === getSelectedBlock(get().flowSlice).id) : {}
  const selectedBlockData = getSelectedBlock(get().flowSlice)
  // const selectedBlockVisuals = get()?.flowSlice.flow.visual ? get().flowSlice.flow.visual.blocks.find((blockVisual: IVisual) => blockVisual.id === getSelectedBlock(get().flowSlice).id) : {};
  const selectedBlockVisuals = getSelectedBlock(get().flowSlice)
 
  set((state: RFState) => ({
    ...state, selectedBlock: {
      data: selectedBlockData,
      visual: selectedBlockVisuals
    }
  }))
}

export const setBlockName = (set: any, get: () => RFState) => (text: string) => {
  const nodeData: any = get().flowSlice.flow.blockData.map((x: any) => {
    if (x.blockIdentifier === getSelectedBlock(get().flowSlice).id) {
      return {
        ...x,
        blockLabel: text
      }
    } return x
  })

  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        blockData: nodeData,
      }
    },
  }));
};

export const setBlockDescription = (set: any, get: () => RFState) => (description: string) => {
  const nodeData: any = get().flowSlice.flow.blockData.map((x: any) => {
    if (x.blockIdentifier === getSelectedBlock(get().flowSlice).id) {
      return {
        ...x,
        description: description
      }
    } return x
  })
  set((state: RFState) => ({

    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        blockData: nodeData
      }
    },
  }));
};

export const setBlockColor = (set: any, get: () => RFState) => (color: string) => {

  const nodeVisuals: any = get().flowSlice.flow.visual.blocks.map((x: Visual) => {
    if (x.id === getSelectedBlock(get().flowSlice).id) {
      return {
        ...x,
        data: {
          ...x.data, color: color
        }
      }
    } return x
  })
  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        visual: {
          ...state.flowSlice.flow.visual,
          blocks: nodeVisuals
        }
      }
    },
  }));
};

const baseActtions = {
  getBlockProperties: getBlockProperties,
  setBlockColor: setBlockColor,
  setBlockDescription: setBlockDescription,
  setBlockName: setBlockName,
};

export default baseActtions;
