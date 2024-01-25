import { IBlockData, IBlockParameters } from "../interfaces/IBlock";
import flowSlice from "../slices/flowSlice";
import { RFState } from "../types/rfState";
import { Edge, Node } from "react-flow-renderer";

const setSelectedBlockId = (get: () => RFState, set: any) => (nodeId: string | null) => {
  if (nodeId !== null) {
    set((state: RFState) => ({
      selectedBlockID: [...state.selectedBlockID, nodeId]
    }))

  }

};

const removeSelectedBlockId = (get: () => RFState, set: any) => (nodeId: string | null) => {
  if (nodeId !== null) {
    set((state: RFState) => ({
      selectedBlockID: state.selectedBlockID.filter((block: any) => block !== nodeId)
    }))

  }

};

const deleteBlock = (get: () => RFState, set: any) => () => {

  const filteredBlocks = get().flowSlice.flow.blockData.filter((block: IBlockData) => block.blockIdentifier !== get().selectedBlockID[0]);
  const filteredVisualBlocks = get().flowSlice.flow.visual.blocks.filter((block: Node) => block.id !== get().selectedBlockID[0])
  const filteredEdges = get().flowSlice.flow.visual.edges.filter((edge: Edge) =>
    edge.source !== get().selectedBlockID[0] && edge.target !== get().selectedBlockID[0]
  );

  console.log(filteredEdges)

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
        }
      }
    }

  }))

}

const setParameter = (get: () => RFState, set: any) => (propertyName: string, value: any) => {
  const blockData = get().flowSlice.flow.blockData.find(
    (block: IBlockData) => block.blockIdentifier === get().selectedBlockID[0]
  ) as IBlockData | undefined;

  if (blockData) {
    const parameter: IBlockData[] = blockData.parameters.map((param: any) => {
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
            if (x.blockIdentifier === get().selectedBlockID[0]) {
              return {
                ...x,
                parameters: parameter
              }
            }
            return x;
          })
        }

      }
    }));

  }
};

export const setSelectedExtendedParameter = (get: () => RFState, set: any) => (propertyName: string, value: string) => {
  const blockData = get().flowSlice.flow.blockData.find(
    (block: IBlockData) => block.blockIdentifier === get().selectedBlockID[0]
  ) as IBlockData | undefined;

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
            if (x.blockIdentifier === get().selectedBlockID[0]) {
              return {
                ...x,
                extendedParameters: parameter
              }
            }
            return x;
          })
        }

      }
    }));
  }
}

export const deleteExtendedParameter = (get: () => RFState, set: any) => (propName: string) => {
  const blockData = get().flowSlice.flow.blockData.find(
    (block: any) => block.blockIdentifier === get().selectedBlockID[0]
  ) as IBlockData | undefined;

  if (blockData) {
    const filteredParameters = blockData.extendedParameters.filter((param: any) => param.name !== propName)

    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: {
          ...state.flowSlice.flow,
          blockData: state.flowSlice.flow.blockData.map((x: any) => {
            if (x.blockIdentifier === get().selectedBlockID[0]) {
              return {
                ...x,
                extendedParameters: filteredParameters
              }
            }
            return x;
          })
        },

      }
    }));
  }

}

export const addCustomParameter = (get: () => RFState, set: any): ((name: string, value: string) => boolean | undefined) => (name, value) => {
  const blockData = get().flowSlice.flow.blockData.find(
    (block: IBlockData) => block.blockIdentifier === get().selectedBlockID[0]
  ) as IBlockData | undefined;

  if (blockData) {
    const existingParam = blockData.parameters.find((param: any) => param.name.toLowerCase() === name.toLowerCase());
    const existingExtendedParam = blockData.extendedParameters.find((param: any) => param.name.toLowerCase() === name.toLowerCase());

    if (!existingParam && !existingExtendedParam) {
      const updatedExtendedParams = [...blockData.extendedParameters, { name: name, value: value }]
      set((state: RFState) => ({
        ...state, flowSlice: {
          ...state.flowSlice,
          flow: {
            ...state.flowSlice.flow,
            blockData: state.flowSlice.flow.blockData.map((x: any) => {
              if (x.blockIdentifier === get().selectedBlockID[0]) {
                return {
                  ...x,
                  extendedParameters: updatedExtendedParams
                }
              }
              return x;
            })
          }

        }
      }));
      return true;
    }
    else {
      return false;
    }
  }


}

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
    setParameter(get, set)(propertyName, value);
  };

export const setBooleanYNParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: string) => {
    setParameter(get, set)(propertyName, value === "Y" ? "N" : "Y");
  };

export const setDateTimeParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: Date) => {
    setParameter(get, set)(propertyName, value);
  };

export const setBigIntParameter =
  (get: () => RFState, set: any) => (propertyName: string, value: BigInt) => {
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
  setSelectedBlockId: setSelectedBlockId,
  removeSelectedBlockId: removeSelectedBlockId,
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
  deleteExtendedParameter: deleteExtendedParameter
};

export default blockActions;


