import blockParametersType from "../constants/blockConst";
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
            value: parameter.parameterDefault,
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



const leftPanelActions = {
  getBlocksList: getBlocksList,
};

export default leftPanelActions;