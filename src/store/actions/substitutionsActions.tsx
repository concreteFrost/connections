import { RFState } from "../types/rfState";
import { ISubstitutions } from "../interfaces/ISubstitutions";
import { IBlockData } from "../interfaces/IBlock";

export const addSubstitutionKey = (get: any, set: any) => (key: string) => {
  const match = get().flow.substitutions.find((s: ISubstitutions) => s.subKey === key);

  if (!match && key.length > 0)
    set((state: RFState) => ({
      flow: {
        ...state.flow,
        substitutions: [
          ...state.flow.substitutions,
          {
            subKey: key,
            subConfigs: [
              { configName: "Debug", configValue: "" },
              { configName: "Release", configValue: "" },
            ],
          }, // might need to be an empty array
        ],
      },
    }));
  else {
    setSubstitutionErrorMessage(set, '*substitution already exists')
    setTimeout(() => {
      setSubstitutionErrorMessage(set, '')
    }, 4000)
  }

};

//displays error message above the form
const setSubstitutionErrorMessage = (set: any, msg: string) => {
  set((state: RFState) => ({
    errorMessages: {
      ...state.errorMessages,
      substitutionAddError: msg
    }
  }))
}

export const deleteSubstitution = (get: any, set: any) => (key: string) => {

  //looking for match key to replace it in properties panel
  const updatedBlocks = get().flow.blockData.map((block: IBlockData) => {
    return {
      ...block,
      parameters: block.parameters.map((parameter: any) => {
        return {
          ...parameter,
          value: parameter.value.toString().includes(key) ? parameter.value.replace(`{${key}}`, '') : parameter.value
        }
      }),
      extendedParameters: block.extendedParameters.map((parameter: any) => {
        return {
          ...parameter,
          value: parameter.value.toString().includes(key) ? parameter.value.replace(`{${key}}`, '') : parameter.value
        }
      })
    }
  });

  set((state: RFState) => ({
    flow: {
      ...state.flow,
      substitutions: state.flow.substitutions.filter((sub: ISubstitutions) => sub.subKey !== key),
      blockData: updatedBlocks
    },

  }
  ))


}

export const addConfig =
  (get: any, set: any) =>
    (key: string, configName: string, configValue: string) => {
      set((state: RFState) => {
        const updatedSubstitutions = state.flow.substitutions.map((sub: any) => {
          if (sub.subKey === key) {
            return {
              ...sub,
              subConfigs: sub.subConfigs.map((s: any) => {
                if (s.configName === configName) {
                  return { ...s, configValue: configValue }
                }
                return s
              })

            };
          }
          return sub;
        });

        return {
          flow: {
            ...state.flow,
            substitutions: updatedSubstitutions,
          },
        };
      });

    };

export const toggleSubstitutionsPanel = (get: any, set: any) => () => {

  set((state: RFState) => ({
    substitutionsPanel: {
      ...state.substitutionsPanel,
      isCollapsed: !state.substitutionsPanel.isCollapsed
    }
  }));
}
