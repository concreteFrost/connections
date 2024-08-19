import { BlockData } from "../../interfaces/IBlock";
import { RFState } from "../../types/rfState";
import { Node } from "react-flow-renderer";
import { getSelectedBlock } from "../utils/blockUtils";
import { v4 as uuidv4 } from "uuid";
import { NodeType } from "../../interfaces/INode";
import ConnectionsEdge from "../../interfaces/IConnectionsEdges";
import { Visual } from "store/interfaces/Iflow";

const addBlock =
  (get: () => RFState, set: any) =>
  (type: NodeType, posX: number, posY: number) => {
    const id = uuidv4();
    const newNode = {
      data: { ...type.data, blockIdentifier: id },
      type: type.type,
      visualData: type.visualData,
      position: { x: posX, y: posY },
    };

    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: {
          ...state.flowSlice.flow,
          blockData: [...state.flowSlice.flow.blockData, newNode.data],
          visual: {
            ...state.flowSlice.flow.visual,
            blocks: [
              ...state.flowSlice.flow.visual.blocks,
              {
                id: id,
                type: newNode.type,
                data: newNode.visualData,
                position: newNode.position,
                width:170,
                height:70
              },
            ],
          },
        },
      },
    }));
  };

const createBlockCopy =
  (get: () => RFState, set: any) => (posX: number, posY: number) => {
    let filteredBlocks: Array<BlockData> =
      get().flowSlice.flow.blockData.filter(
        (block: BlockData) =>
          block.blockIdentifier === getSelectedBlock(get().flowSlice).id
      );
    const filteredVisualBlocks = get().flowSlice.flow.visual.blocks.filter(
      (x) => x.selected
    );

    const id = uuidv4();
    const newBlocksData: Array<BlockData> = filteredBlocks.map(
      (x: BlockData) => {
        return {
          ...x,
          blockIdentifier: id,
        };
      }
    );

    const newBlocksVisuals = filteredVisualBlocks.map((x: Node) => {
      return {
        ...x,
        id: id,
        selected: false,
        position: {
          x: posX,
          y: posY,
        },
      };
    });

    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: {
          ...state.flowSlice.flow,
          blockData: [...get().flowSlice.flow.blockData, ...newBlocksData],
          visual: {
            ...state.flowSlice.flow.visual,
            blocks: [
              ...get().flowSlice.flow.visual.blocks,
              ...newBlocksVisuals,
            ],
          },
        },
      },
    }));
  };

const deleteBlock = (get: () => RFState, set: any) => () => {
  const filteredBlocks = get().flowSlice.flow.blockData.filter(
    (block: BlockData) =>
      block.blockIdentifier !== getSelectedBlock(get().flowSlice).id
  );
  const filteredVisualBlocks = get().flowSlice.flow.visual.blocks.filter(
    (block: Node) => block.id !== getSelectedBlock(get().flowSlice).id
  );
  const filteredEdges = get().flowSlice.flow.visual.edges.filter(
    (edge: ConnectionsEdge) =>
      edge.source !== getSelectedBlock(get().flowSlice).id &&
      edge.target !== getSelectedBlock(get().flowSlice).id
  );

  set((state: RFState) => ({
    // selectedBlockID: [],
    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        blockData: filteredBlocks,
        visual: {
          ...state.flowSlice.flow.visual,
          blocks: filteredVisualBlocks,
          edges: filteredEdges,
        },
      },
    },
  }));
};

const resetSelectedBlocks = (get: () => RFState, set: any) => () => {
  const resetedBlocks = get().flowSlice.flow.visual.blocks.map((x: Node) => {
    return { ...x, selected: false };
  });

  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        visual: {
          ...state.flowSlice.flow.visual,
          blocks: resetedBlocks,
        },
      },
    },
  }));
};

const setDirective = (get: () => RFState, set: any) => (diretive: string) => {
  set((state: RFState) => ({
    ...state,
    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        blockData: state.flowSlice.flow.blockData.map((x: any) => {
          if (x.blockIdentifier === getSelectedBlock(get().flowSlice).id) {
            return {
              ...x,
              ehDirective: diretive,
            };
          }
          return x;
        }),
      },
    },
  }));
};

//#region BASE ACTIONS

export const setBlockName = (get: () => RFState,set: any) => (text: string) => {
  const nodeData: any = get().flowSlice.flow.blockData.map((x: BlockData) => {
    if (x.blockIdentifier === getSelectedBlock(get().flowSlice).id) {
      return {
        ...x,
        name: text,
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

export const setBlockDescription = (get: () => RFState,set: any) => (description: string) => {
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

export const setBlockColor = (get: () => RFState,set: any) => (color: string) => {

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

//#endregion

const blockActions = {
  addBlock: addBlock,
  createBlockCopy: createBlockCopy,
  deleteBlock: deleteBlock,
  resetSelectedBlocks: resetSelectedBlocks,
  setDirective: setDirective,
  setBlockName:setBlockName,
  setBlockColor:setBlockColor,
  setBlockDescription:setBlockDescription
 
};

export default blockActions;
