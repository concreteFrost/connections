import { IBlockData, IBlockParameters } from "../interfaces/IBlock";
import { RFState } from "../types/rfState";
import { getSelectedBlock } from "./utils/blockUtils";

export const getParameterValue =
  (set: any) => (parameter: string, value: string) => {

    set((state: RFState) => ({
      designerVisualElementsSlice: {
        ...state.designerVisualElementsSlice,
        valueEditor: {
          valueToEdit: value,
          parameterToModify: parameter
        }
      }
    }));
  };

export const setParameterValue = (get: () => RFState, set: any) => (propertyName: string, value: string) => {
  const blockData = get().flowSlice.flow.blockData.find((block: IBlockData) => block.blockIdentifier === getSelectedBlock(get).id) as IBlockData | undefined;

  if (!blockData) return;

  const updateParameter = (params: any) => params.map((param: IBlockParameters) =>
    param.name === propertyName ? { ...param, value } : param
  );

  const updatedBlockData = {
    ...blockData,
    parameters: updateParameter(blockData.parameters),
    extendedParameters: updateParameter(blockData.extendedParameters),
  };

  set((state: RFState) => ({
    designerVisualElementsSlice: {
      ...state.designerVisualElementsSlice,
      valueEditor: { valueToEdit: value, parameterToModify: propertyName },
    },
    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        blockData: state.flowSlice.flow.blockData.map((block: IBlockData) =>
          block.blockIdentifier === getSelectedBlock(get).id ? updatedBlockData : block
        ),
      }

    },
  }));
};


const valueEditorActions = {
  getParameterValue: getParameterValue,
  setParameterValue: setParameterValue
}

export default valueEditorActions;

