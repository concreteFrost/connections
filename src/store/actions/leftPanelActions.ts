import { v4 as uuidv4 } from "uuid";
import blockParametersType from "../constants/blockConst";
import { RFState } from "../types/rfState";
import { mockedBlocks } from "../../testFlow/mockedBlocks";

function setDefaultValueAndFormat(dataType: number) {
  switch (dataType) {
    case 0:
      return blockParametersType.string;
    case 1:
      return blockParametersType.integer;
    case 2:
      return blockParametersType.float;
    case 3:
      return blockParametersType.dateTime;
    case 4:
      return blockParametersType.boolean;
    case 5:
      return blockParametersType.booleanYN;
    case 6:
      return blockParametersType.execution;
    case 7:
      return blockParametersType.bigInt;
    case 8:
      return blockParametersType.blockRef;
    default:
      return blockParametersType.default;
  }
}

export const getBlocksList = (set: any) => (data: any) => {
  const updatedNodesList = [];

  for (let d of data) {
    updatedNodesList.push({
      type: "pointer",
      visualData: {
        color: "#FFFFFF",
        icon: d.name.toLowerCase().split(" ").join("_"),
      },
      data: {
        name: d.name,
        blockVersion: "4.1.8",
        blockIdentifier: null,
        blockLabel: d.name,
        blockType: d.name,
        description: d.description,
        typeName: d.libraryType,
        baseTypeName: d.category,
        // ehDirective: null,
        parameters: d.parameters.map((parameter: any) => {
          return {
            name: parameter.name,
            value: setDefaultValueAndFormat(parameter.dataType)?.value,
            required: parameter.constraints > 0 ? true : false,
            format: setDefaultValueAndFormat(parameter.dataType)?.format,
          };
        }),
        extendedParameters: []
      },
    });
  }

  for (let block of mockedBlocks) {

    updatedNodesList.push({
      type: "pointer",
      visualData: {
        color: "#FFFFFF",
        icon: block.name.toLowerCase().split(" ").join("_"),
      },
      data: {
        name: block.name,
        blockVersion: "4.1.8",
        blockIdentifier: null,
        blockLabel: block.name,
        blockType: block.name,
        description: block.description,
        typeName: block.libraryType,
        baseTypeName: block.category,
        // ehDirective: null,
        parameters: block.parameters.map((parameter: any) => {
          return {
            name: parameter.name,
            value: setDefaultValueAndFormat(parameter.dataType)?.value,
            required: parameter.constraints > 0 ? true : false,
            format: setDefaultValueAndFormat(parameter.dataType)?.format,
          };
        }),
      },

    })
  }

  set({ blockList: updatedNodesList });
};

export const addBlock =
  (get: () => RFState, set: any) => (type: any, posX: number, posY: number) => {
    const id = uuidv4()
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
        }

      },
    }));

    console.log(newNode)
  };

const leftPanelActions = {
  addBlock: addBlock,
  getBlocksList: getBlocksList,
};

export default leftPanelActions;