export const getBlockData = (get: any, set: any) => () => {
  const nodeData = get().flow.blockData.find(
    (node: any) => node.blockIdentifier === get().selectedNode
  );

  if (nodeData)
    set((state: any) => ({
      rightPanel: {
        ...state.rightPanel,
        parameters: nodeData.parameters,
      },
    }));
};
export const setParameter =
  (get: any, set: any) => (propertyName: string, value: any) => {
    const nodeData = get().flow.blockData.find(
      (node: any) => node.blockIdentifier === get().selectedNode
    );

    if (nodeData) {
      const parameter = nodeData.parameters.map((param: any) => {
        if (param.name === propertyName) {
          return {
            ...param,
            value: value,
          };
        }
        return param;
      });
      nodeData.parameters = parameter;

      set((state: any) => ({
        rightPanel: {
          ...state.rightPanel,
          parameters: parameter,
        },
      }));
    }
    console.log(get().flow);
  };

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
