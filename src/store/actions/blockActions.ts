import { BlockData} from "../interfaces/IBlock";
import { RFState } from "../types/rfState";
import { Node } from "react-flow-renderer";
import { getSelectedBlock } from "./utils/blockUtils";
import { v4 as uuidv4 } from "uuid";
import { NodeType } from "../interfaces/INode";
import ConnectionsEdge from "../interfaces/IConnectionsEdges";

export const addBlock =
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
    selectedBlockID: [],
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

const setParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: any) => {
    const blockData = get().flowSlice.flow.blockData.find(
      (block: BlockData) =>
        block.blockIdentifier === getSelectedBlock(get().flowSlice).id
    ) as BlockData | undefined;

    if (blockData) {
      const parameter: BlockData[] = blockData.parameters.map((param: any) => {
        if (param.name === propertyName) {
          return {
            ...param,
            value: value,
          };
        }
        return param;
      });

      set((state: RFState) => ({
        flowSlice: {
          ...state.flowSlice,
          flow: {
            ...state.flowSlice.flow,
            blockData: state.flowSlice.flow.blockData.map((x: any) => {
              if (x.blockIdentifier === getSelectedBlock(get().flowSlice).id) {
                return {
                  ...x,
                  parameters: parameter,
                };
              }
              return x;
            }),
          },
        },
      }));
    }
  };

export const setSelectedExtendedParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: string) => {
    const blockData = get().flowSlice.flow.blockData.find(
      (block: BlockData) =>
        block.blockIdentifier === getSelectedBlock(get().flowSlice).id
    ) as BlockData | undefined;

    if (blockData) {
      const parameter = blockData.extendedParameters.map((param: any) => {
        if (param.name === propertyName) {
          return {
            ...param,
            value: value,
          };
        }
        return param;
      });

      set((state: RFState) => ({
        flowSlice: {
          ...state.flowSlice,
          flow: {
            ...state.flowSlice.flow,
            blockData: state.flowSlice.flow.blockData.map((x: any) => {
              if (x.blockIdentifier === getSelectedBlock(get().flowSlice).id) {
                return {
                  ...x,
                  extendedParameters: parameter,
                };
              }
              return x;
            }),
          },
        },
      }));
    }
  };

export const deleteExtendedParameter =
  (get: () => RFState, set: any) => (propName: string) => {
    const blockData = get().flowSlice.flow.blockData.find(
      (block: any) =>
        block.blockIdentifier === getSelectedBlock(get().flowSlice).id
    ) as BlockData | undefined;

    if (blockData) {
      const filteredParameters = blockData.extendedParameters.filter(
        (param: any) => param.name !== propName
      );

      set((state: RFState) => ({
        flowSlice: {
          ...state.flowSlice,
          flow: {
            ...state.flowSlice.flow,
            blockData: state.flowSlice.flow.blockData.map((x: any) => {
              if (x.blockIdentifier === getSelectedBlock(get().flowSlice).id) {
                return {
                  ...x,
                  extendedParameters: filteredParameters,
                };
              }
              return x;
            }),
          },
        },
      }));
    }
  };

export const addCustomParameter =
  (
    get: () => RFState,
    set: any
  ): ((name: string, value: string) => boolean | undefined) =>
  (name, value) => {
    const blockData = get().flowSlice.flow.blockData.find(
      (block: BlockData) =>
        block.blockIdentifier === getSelectedBlock(get().flowSlice).id
    ) as BlockData | undefined;

    if (blockData) {
      const existingParam = blockData.parameters.find(
        (param: any) => param.name.toLowerCase() === name.toLowerCase()
      );
      const existingExtendedParam = blockData.extendedParameters.find(
        (param: any) => param.name.toLowerCase() === name.toLowerCase()
      );

      if (!existingParam && !existingExtendedParam) {
        const updatedExtendedParams = [
          ...blockData.extendedParameters,
          { name: name, value: value },
        ];
        set((state: RFState) => ({
          ...state,
          flowSlice: {
            ...state.flowSlice,
            flow: {
              ...state.flowSlice.flow,
              blockData: state.flowSlice.flow.blockData.map((x: any) => {
                if (
                  x.blockIdentifier === getSelectedBlock(get().flowSlice).id
                ) {
                  return {
                    ...x,
                    extendedParameters: updatedExtendedParams,
                  };
                }
                return x;
              }),
            },
          },
        }));
        return true;
      } else {
        return false;
      }
    }
  };

export const setDirective =
  (get: () => RFState, set: any) => (diretive: string) => {
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

export const setStringParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: string) => {
    setParameter(get, set)(propertyName, value);
  };

export const setIntegerParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: number) => {
    setParameter(get, set)(propertyName, value);
  };

export const setFloatParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: number) => {
    setParameter(get, set)(propertyName, value);
  };

export const setBooleanParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: boolean) => {
    console.log("setting boolean");
    setParameter(get, set)(propertyName, value);
  };

export const setBooleanYNParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: string) => {
    console.log("setting booleanYN");
    setParameter(get, set)(propertyName, value === "Y" ? "N" : "Y");
  };

export const setDateTimeParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: Date) => {
    console.log("setting date time");
    setParameter(get, set)(propertyName, value);
  };

export const setBigIntParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: BigInt) => {
    console.log("setting big int");
    setParameter(get, set)(propertyName, value);
  };

export const setExecutionParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: string) => {
    let lastInputChar: string;

    value.length > 0
      ? (lastInputChar = value[value.length - 1])
      : (lastInputChar = value);

    const allowedValues = ["I", "N", "T"];

    if (allowedValues.find((x: string) => x === lastInputChar.toUpperCase())) {
      value = lastInputChar.toUpperCase();
      setParameter(get, set)(propertyName, value);
    }
  };

const blockActions = {
  addBlock: addBlock,
  createBlockCopy: createBlockCopy,
  deleteBlock: deleteBlock,
  setStringParameter: setStringParameter,
  setIntegerParameter: setIntegerParameter,
  setFloatParameter: setFloatParameter,
  setBooleanParameter: setBooleanParameter,
  setBooleanYNParameter: setBooleanYNParameter,
  setDateTimeParameter: setDateTimeParameter,
  setExecutionParameter: setExecutionParameter,
  setBigIntParameter: setBigIntParameter,
  addCustomParameter: addCustomParameter,
  setSelectedExtendedParameter: setSelectedExtendedParameter,
  deleteExtendedParameter: deleteExtendedParameter,
  setDirective: setDirective,
};

export default blockActions;
