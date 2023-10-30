
import { IBlockData } from "../interfaces/IBlock";
import { IVisual } from "../interfaces/Ivisual";
import { RFState } from "../types/rfState";

export const getBlockProperties = (get: any, set: any) => () => {
  const selectedBlockData = get()?.flow ? get().flow.blockData.find((block: IBlockData) => block.blockIdentifier === get().selectedBlockID) : {}
  const selectedBlockVisuals = get()?.flow.visual ? get().flow.visual.blocks.find((blockVisual: IVisual) => blockVisual.id === get().selectedBlockID) : {};

  set((state: RFState) => ({
    ...state, selectedBlock: {
      data: selectedBlockData,
      visual: selectedBlockVisuals
    }
  }))
}

export const setNodeName = (set: any, get: any) => (text: string) => {
  const nodeData: any = get().flow.blockData.map((x: any) => {
    if (x.blockIdentifier === get().selectedBlockID) {
      return {
        ...x,
        blockLabel: text
      }
    } return x
  })

  set((state: RFState) => ({
    flow: {
      ...state.flow,
      blockData: nodeData
    },
  }));
};

export const setNodeDescription = (set: any, get: any) => (description: string) => {
  const nodeData: any = get().flow.blockData.map((x: any) => {
    if (x.blockIdentifier === get().selectedBlockID) {
      return {
        ...x,
        description: description
      }
    } return x
  })
  set((state: RFState) => ({

    flow: {
      ...state.flow,
      blockData: nodeData
    },
  }));
};

export const setNodeColor = (set: any, get: any) => (color: string) => {

  const nodeVisuals: any = get().flow.visual.blocks.map((x: IVisual) => {
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
    flow: {
      ...state.flow,
      visual: {
        ...state.flow.visual,
        blocks: nodeVisuals
      },
    },
  }));
};
