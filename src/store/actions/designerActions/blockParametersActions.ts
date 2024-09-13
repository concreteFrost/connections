import { BlockData } from "../../interfaces/IBlock";
import { RFState } from "../../types/rfState";
import { getSelectedBlock } from "../utils/blockUtils";

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

      console.log(get().flowSlice.flow.blockData)
    }
  };

const setSelectedExtendedParameter =
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

const deleteExtendedParameter =
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

const addCustomParameter =
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


const setStringParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: string) => {
    setParameter(get, set)(propertyName, value);
  };

const setIntegerParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: number) => {
    setParameter(get, set)(propertyName, value);
  };

const setFloatParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: number) => {
    setParameter(get, set)(propertyName, value);
  };

const setBooleanParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: boolean) => {
    console.log("setting boolean");
    setParameter(get, set)(propertyName, value);
  };

const setBooleanYNParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: string) => {
    console.log("setting booleanYN");
    setParameter(get, set)(propertyName, value === "Y" ? "N" : "Y");
  };

const setDateTimeParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: Date) => {
    console.log("setting date time");
    setParameter(get, set)(propertyName, value);
  };

const setBigIntParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: BigInt) => {
    console.log("setting big int");
    setParameter(get, set)(propertyName, value);
  };

const setExecutionParameter =
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

const blockParametersActions = {
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

};

export default blockParametersActions;
