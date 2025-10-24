import { BlockData } from "interfaces/IBlock";
import { RFState } from "shared/types/rfState";
import { getSelectedBlock } from "../../../utils/blockUtils";

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

const blockParametersActions = (get: () => RFState, set: any) => ({
  setParameterValue: (propertyName: string, value: any, options?: string) => {
    if (!options) {
      setParameter(get, set)(propertyName, value);
      return;
    }

    switch (options) {
      case "5":
        setParameter(get, set)(propertyName, value === "Y" ? "N" : "Y");
        break;
      case "6":
        const last = value[value.length - 1]?.toUpperCase();
        if (["I", "N", "T"].includes(last)) {
          setParameter(get, set)(propertyName, last);
        }
        break;
      default:
        setParameter(get, set)(propertyName, value);
    }
  },

  setSelectedExtendedParameter: (propertyName: string, value: string) => {
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
  },

  deleteExtendedParameter: (propName: string) => {
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
  },

  addCustomParameter: (name: string, value: any) => {
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
  },
});

export default blockParametersActions;
