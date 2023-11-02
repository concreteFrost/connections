
import { IBlockData } from "../interfaces/IBlock";
import { IVisual } from "../interfaces/Ivisual";
import { RFState } from "../types/rfState";

export const getBlockProperties = (get: () => RFState, set: any) => () => {
  const selectedBlockData = get()?.flowSlice.flow ? get().flowSlice.flow.blockData.find((block: IBlockData) => block.blockIdentifier === get().selectedBlockID) : {}
  const selectedBlockVisuals = get()?.flowSlice.flow.visual ? get().flowSlice.flow.visual.blocks.find((blockVisual: IVisual) => blockVisual.id === get().selectedBlockID) : {};

  set((state: RFState) => ({
    ...state, selectedBlock: {
      data: selectedBlockData,
      visual: selectedBlockVisuals
    }
  }))
}

export const setBlockName = (set: any, get: () => RFState) => (text: string) => {
  const nodeData: any = get().flowSlice.flow.blockData.map((x: any) => {
    if (x.blockIdentifier === get().selectedBlockID) {
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
    if (x.blockIdentifier === get().selectedBlockID) {
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

  const nodeVisuals: any = get().flowSlice.flow.visual.blocks.map((x: IVisual) => {
    if (x.id === get().selectedBlockID) {
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
