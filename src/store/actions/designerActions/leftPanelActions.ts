
import {mockBlocks} from "../../../__mocks__/mockBlock";
import { RFState } from "store/types/rfState";
import { NodeType } from "store/interfaces/INode";
import { BlockDefaultParameters } from "store/interfaces/IBlock";

function setBlockParams(sourceBlocks:any, blocksToUpdate:NodeType[]){
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
        category:d.category,
        description: d.description,
        typeName: d.libraryType,
        baseTypeName: d.category,
        ehDirective:"",
        parameters: d.parameters.map((parameter: BlockDefaultParameters) => {
          return {
            name: parameter.name,
            value: parameter.parameterDefault,
            required: parameter.constraints > 0 ? true : false,
            format: parameter.dataType,
            description:parameter.description
          };
        }),
        extendedParameters: []
      },
    });
  }

  return blocksToUpdate;

}

export const getBlocksList = (set: any) => (data: any) => {
  const updatedNodesList :Array<NodeType>= [];

  setBlockParams(data,updatedNodesList);
  setBlockParams(mockBlocks,updatedNodesList);

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

