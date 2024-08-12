import blockParametersType from "../../constants/blockConst";
import {mockBlocks} from "../../../__mocks__/mockBlock";
import { RFState } from "store/types/rfState";
import { NodeType } from "store/interfaces/INode";

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
  const updatedNodesList :Array<NodeType>= [];

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
        blockLabel: d.name,
        blockType: d.name,
        category:d.category,
        description: d.description,
        typeName: d.libraryType,
        baseTypeName: d.category,
        ehDirective:"",
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

  for (let block of mockBlocks) {

    updatedNodesList.push({
      type: "pointer",
      visualData: {
        color: "#FFFFFF",
        icon: block.name.toLowerCase().split(" ").join("_"),
      },
      data: {
        name: block.name,
        blockVersion: "4.1.8",
        category: block.category,
        blockLabel: block.name,
        blockType: block.name,
        description: block.description,
        typeName: block.libraryType,
        baseTypeName: block.category,
        ehDirective:"",
        // ehDirective: null,
        parameters: block.parameters.map((parameter: any) => {
          return {
            name: parameter.name,
            value: setDefaultValueAndFormat(parameter.dataType)?.value,
            required: parameter.constraints > 0 ? true : false,
            format: setDefaultValueAndFormat(parameter.dataType)?.format,
          };
        }),
        extendedParameters:[]
      },

    })
  }

  set((state:RFState)=>({
    flowSlice:{
      ...state.flowSlice,blockList:updatedNodesList
    }
  }))
};

const leftPanelActions = {
  getBlocksList: getBlocksList,
};

export default leftPanelActions;

