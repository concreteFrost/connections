import { RFState } from "../types/rfState";

export const getBlockData = (get: any, set: any) => () => {
  const blockData = get().flow.blockData.find(
    (block: any) => block.blockIdentifier === get().selectedNode
  );

  if (blockData)
    set((state: RFState) => ({
      rightPanel: {
        ...state.rightPanel,
        parameters: blockData.parameters,
        extendedParameters: blockData.extendedParameters
      },
    }));
};
export const setParameter =
  (get: any, set: any) => (propertyName: string, value: any) => {
    const blockData = get().flow.blockData.find(
      (block: any) => block.blockIdentifier === get().selectedNode
    );

    if (blockData) {
      const parameter = blockData.parameters.map((param: any) => {
        if (param.name === propertyName) {
          return {
            ...param,
            value: value,
          };
        }
        return param;
      });
      blockData.parameters = parameter;

      set((state: any) => ({
        rightPanel: {
          ...state.rightPanel,
          parameters: parameter,
          valueEditor: {
            ...state.rightPanel.valueEditor,
            inputValue: value
          }
        },
      }));
    }
  };

export const setSelectedExtendedParameter = (get: any, set: any) => (propertyName: string, value: string) => {
  const blockData = get().flow.blockData.find(
    (block: any) => block.blockIdentifier === get().selectedNode
  );

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
    blockData.extendedParameters = parameter;

    set((state: any) => ({
      rightPanel: {
        ...state.rightPanel,
        extendedParameters: parameter,
        valueEditor: {
          ...state.rightPanel.valueEditor,
          inputValue: value
        }
      },
    }));
  }
}

export const deleteExtendedParameter = (get: any, set: any) => (propName: string) => {
  const blockData = get().flow.blockData.find(
    (block: any) => block.blockIdentifier === get().selectedNode
  );

  if (blockData) {
    const filteredParameters = blockData.extendedParameters.filter((param: any) => param.name !== propName)
    blockData.extendedParameters = filteredParameters;

    set((state: any) => ({
      rightPanel: {
        ...state.rightPanel,
        extendedParameters: filteredParameters,
      },
    }));


  }

}

export const addCustomParameter = (get: any, set: any): ((name: string, value: string) => boolean | undefined) => (name, value) => {
  const blockData = get().flow.blockData.find(
    (block: any) => block.blockIdentifier === get().selectedNode
  );

  if (blockData) {
    const existingParam = blockData.parameters.find((param: any) => param.name.toLowerCase() === name.toLowerCase());
    const existingExtendedParam = blockData.extendedParameters.find((param: any) => param.name.toLowerCase() === name.toLowerCase());

    if (!existingParam && !existingExtendedParam) {
      blockData.extendedParameters = [{ ...blockData.existingExtendedParameters, name: name, value: value }]
      set((state: RFState) => ({
        rightPanel: {
          ...state.rightPanel,
          extendedParameters: blockData.extendedParameters
        }
      }))
      console.log(get().flow.blockData)

      return true;
    }
    else {
      return false;
    }
  }


}


export const setStringParameter =
  (get: any, set: any) => (propertyName: string, value: string) => {
    setParameter(get, set)(propertyName, value);
  };

export const setIntegerParameter =
  (get: any, set: any) => (propertyName: string, value: number) => {
    setParameter(get, set)(propertyName, value);
  };

export const setFloatParameter =
  (get: any, set: any) => (propertyName: string, value: number) => {
    setParameter(get, set)(propertyName, value);
  };

export const setBooleanParameter =
  (get: any, set: any) => (propertyName: string, value: boolean) => {
    setParameter(get, set)(propertyName, value);
  };

export const setBooleanYNParameter =
  (get: any, set: any) => (propertyName: string, value: string) => {
    setParameter(get, set)(propertyName, value === "Y" ? "N" : "Y");
  };

export const setDateTimeParameter =
  (get: any, set: any) => (propertyName: string, value: Date) => {
    setParameter(get, set)(propertyName, value);
  };

export const setBigIntParameter =
  (get: any, set: any) => (propertyName: string, value: BigInt) => {
    setParameter(get, set)(propertyName, value);
  };

export const setExecutionParameter =
  (get: any, set: any) => (propertyName: string, value: string) => {
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
