import { RFState } from "shared/types/rfState";
import { BlockData, BlockParameters } from "interfaces/IBlock";
import { getSelectedBlock } from "../../../utils/blockUtils";

const designerVisualElementsActions = (get: () => RFState, set: any) => ({
  toggleSubstitutionsPanel: () => {
    set((state: RFState) => ({
      designerVisualElementsSlice: {
        ...state.designerVisualElementsSlice,
        substitutionsPanel: {
          isCollapsed:
            !state.designerVisualElementsSlice.substitutionsPanel.isCollapsed,
        },
      },
    }));
  },

  setTooltipText: (text: string) => {
    set((state: RFState) => ({
      designerVisualElementsSlice: {
        ...state.designerVisualElementsSlice,
        tooltip: {
          text,
        },
      },
    }));
  },

  getParameterValue: (parameter: string, value: string) => {
    set((state: RFState) => ({
      designerVisualElementsSlice: {
        ...state.designerVisualElementsSlice,
        valueEditor: {
          valueToEdit: value,
          parameterToModify: parameter,
        },
      },
    }));
  },

  setParameterValue: (propertyName: string, value: string) => {
    const blockData = get().flowSlice.flow.blockData.find(
      (block: BlockData) =>
        block.blockIdentifier === getSelectedBlock(get().flowSlice).id
    ) as BlockData | undefined;

    if (!blockData) return;

    const updateParameter = (params: any) =>
      params.map((param: BlockParameters) =>
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
          blockData: state.flowSlice.flow.blockData.map((block: BlockData) =>
            block.blockIdentifier === getSelectedBlock(get().flowSlice).id
              ? updatedBlockData
              : block
          ),
        },
      },
    }));
  },
});

export default designerVisualElementsActions;
