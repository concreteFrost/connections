import { BlockData, BlockDefaultParameters } from "interfaces/IBlock";
import { RFState } from "shared/types/rfState";
import { Node } from "react-flow-renderer";
import { getSelectedBlock } from "../../../utils/blockUtils";
import { v4 as uuidv4 } from "uuid";
import { NodeType } from "interfaces/INode";
import ConnectionsEdge from "interfaces/IConnectionsEdges";
import { Visual } from "shared/interfaces/Iflow";
import { mockBlocks } from "__mocks__/mockBlock";

function setBlockParams(sourceBlocks: any, blocksToUpdate: NodeType[]) {
  for (let d of sourceBlocks) {
    blocksToUpdate.push({
      type: "pointer",
      visualData: {
        color: "#FFFFFF",
        icon: d.name.toLowerCase().split(" ").join("_"),
      },
      data: {
        name: d.name,
        blockVersion: d.blockVersion,
        blockLabel: d.name,
        blockType: d.name,
        category: d.category,
        description: d.description,
        typeName: d.libraryType,
        baseTypeName: d.category,
        ehDirective: "",
        parameters: d.parameters.map((parameter: BlockDefaultParameters) => {
          return {
            name: parameter.name,
            value: parameter.parameterDefault,
            required: parameter.constraints > 0 ? true : false,
            format: parameter.dataType,
            description: parameter.description,
          };
        }),
        extendedParameters: [],
      },
    });
  }

  return blocksToUpdate;
}

export const blockActions = (get: () => RFState, set: any) => ({
  addBlock: (type: NodeType, posX: number, posY: number) => {
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
                id,
                type: newNode.type,
                data: newNode.visualData,
                position: newNode.position,
                width: 170,
                height: 70,
              },
            ],
          },
        },
      },
    }));
  },
  createBlockCopy: (posX: number, posY: number) => {
    const selectedId = getSelectedBlock(get().flowSlice).id;
    const filteredBlocks = get().flowSlice.flow.blockData.filter(
      (block: BlockData) => block.blockIdentifier === selectedId
    );
    const filteredVisualBlocks = get().flowSlice.flow.visual.blocks.filter(
      (x) => x.selected
    );

    const id = uuidv4();

    const newBlocksData = filteredBlocks.map((x: BlockData) => ({
      ...x,
      blockIdentifier: id,
    }));

    const newBlocksVisuals = filteredVisualBlocks.map((x: Node) => ({
      ...x,
      id,
      selected: false,
      position: { x: posX, y: posY },
    }));

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
  },
  deleteBlock: () => {
    const selectedId = getSelectedBlock(get().flowSlice).id;
    const filteredBlocks = get().flowSlice.flow.blockData.filter(
      (block: BlockData) => block.blockIdentifier !== selectedId
    );
    const filteredVisualBlocks = get().flowSlice.flow.visual.blocks.filter(
      (block: Node) => block.id !== selectedId
    );
    const filteredEdges = get().flowSlice.flow.visual.edges.filter(
      (edge: ConnectionsEdge) =>
        edge.source !== selectedId && edge.target !== selectedId
    );

    set((state: RFState) => ({
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
  },
  resetSelectedBlocks: () => {
    const resetedBlocks = get().flowSlice.flow.visual.blocks.map((x: Node) => ({
      ...x,
      selected: false,
    }));

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
  },
  setDirective: (directive: string) => {
    const selectedId = getSelectedBlock(get().flowSlice).id;
    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: {
          ...state.flowSlice.flow,
          blockData: state.flowSlice.flow.blockData.map((x: any) =>
            x.blockIdentifier === selectedId
              ? { ...x, ehDirective: directive }
              : x
          ),
        },
      },
    }));
  },
  setBlockName: (text: string) => {
    const selectedId = getSelectedBlock(get().flowSlice).id;
    const nodeData = get().flowSlice.flow.blockData.map((x: BlockData) =>
      x.blockIdentifier === selectedId
        ? { ...x, name: text, blockLabel: text }
        : x
    );

    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: { ...state.flowSlice.flow, blockData: nodeData },
      },
    }));
  },
  setBlockDescription: (description: string) => {
    const selectedId = getSelectedBlock(get().flowSlice).id;
    const nodeData = get().flowSlice.flow.blockData.map((x: any) =>
      x.blockIdentifier === selectedId ? { ...x, description } : x
    );

    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: { ...state.flowSlice.flow, blockData: nodeData },
      },
    }));
  },
  setBlockColor: (color: string) => {
    const selectedId = getSelectedBlock(get().flowSlice).id;
    const nodeVisuals = get().flowSlice.flow.visual.blocks.map((x: Visual) =>
      x.id === selectedId ? { ...x, data: { ...x.data, color } } : x
    );

    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: {
          ...state.flowSlice.flow,
          visual: { ...state.flowSlice.flow.visual, blocks: nodeVisuals },
        },
      },
    }));
  },

  getBlocksList: (data: any) => {
    const updatedNodesList: Array<NodeType> = [];

    setBlockParams(data, updatedNodesList);
    setBlockParams(mockBlocks, updatedNodesList);

    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        blockList: updatedNodesList,
      },
    }));
  },
});

export default blockActions;
