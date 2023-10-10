import { IBlockData } from "../interfaces/IBlock";
import { RFState } from "../types/rfState";

export const getParameterValue =
  (get: any, set: any) => (parameterName : any ,value: string) => {
    set((state: RFState) => ({
      rightPanel: {
        ...state.rightPanel,
        valueEditor: {
          inputValue: value,    
          parameterName : parameterName
        },
      },
    }));
  };

export const setParameterValue =
  (get: any, set: any) => (propertyName: string, value: any) => {
    const blockData = get().flow.blockData.find((block:IBlockData)=>block.blockIdentifier === get().selectedNode);
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
            inputValue: value,
          },
        },
      }));     
    }

  };
