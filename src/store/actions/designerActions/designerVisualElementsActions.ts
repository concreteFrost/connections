import { RFState } from "shared/types/rfState";
import { BlockData, BlockParameters } from "interfaces/IBlock";
import { getSelectedBlock } from "utils/blockUtils";
import { setDesignerSettings } from "../sharedActions/storageActions";
import { BackgroundVariant } from "react-flow-renderer";

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

  setBgView: (view: BackgroundVariant) => {
    set((state: RFState) => ({
      designerVisualElementsSlice: {
        ...state.designerVisualElementsSlice,
        view: view,
      },
    }));

    setDesignerSettings("canvasView", view);
  },

  hideAllTopMenus: () => {
    const { dropdowns }: any = get().designerVisualElementsSlice;

    for (const key in dropdowns) {
      dropdowns[key].isVisible = false;
    }

    set((state: RFState) => ({
      designerVisualElementsSlice: {
        ...state.designerVisualElementsSlice,
        dropdowns: { ...dropdowns },
      },
    }));
  },

  toggleDropdown: (activeDropdownId: string) => {
    const { dropdowns }: any = get().designerVisualElementsSlice;

    for (const key in dropdowns) {
      dropdowns[key].isVisible =
        key === activeDropdownId ? !dropdowns[key].isVisible : false;
    }

    set((state: RFState) => ({
      designerVisualElementsSlice: {
        ...state.designerVisualElementsSlice,
        dropdowns: { ...dropdowns },
      },
    }));
  },

  setSnapToGrid: () => {
    const isSnapped = get().designerVisualElementsSlice.settings.snapToGrid;
    set((state: RFState) => ({
      designerVisualElementsSlice: {
        ...state.designerVisualElementsSlice,
        settings: {
          ...state.designerVisualElementsSlice.settings,
          snapToGrid: !isSnapped,
        },
      },
    }));
    setDesignerSettings("isGridSnapped", !isSnapped);
  },

  setSnapStep: (step: number[]) => {
    set((state: RFState) => ({
      designerVisualElementsSlice: {
        ...state.designerVisualElementsSlice,
        settings: {
          ...state.designerVisualElementsSlice.settings,
          snapStep: step,
        },
      },
    }));

    setDesignerSettings("gridStep", step[0]);
  },

  toggleMiniMap: () => {
    const show = !get().designerVisualElementsSlice.settings.showMiniMap;
    set((state: RFState) => ({
      designerVisualElementsSlice: {
        ...state.designerVisualElementsSlice,
        settings: {
          ...state.designerVisualElementsSlice.settings,
          showMiniMap: show,
        },
      },
    }));

    setDesignerSettings("showMiniMap", show);
  },
});

export default designerVisualElementsActions;
