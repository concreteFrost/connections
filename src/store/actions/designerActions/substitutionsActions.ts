import { RFState } from "shared/types/rfState";
import { Substitutions } from "interfaces/Iflow";
import { BlockData } from "interfaces/IBlock";

//displays error message above the form
const setSubstitutionErrorMessage = (set: any, msg: string) => {
  set((state: RFState) => ({
    ...state.designerVisualElementsSlice.errorMessages,
    substitutionAddError: msg,
  }));
};

const substitutionsActions = (get: () => RFState, set: any) => ({
  addSubstitutionKey: (key: string) => {
    const match = get().flowSlice.flow.substitutions.find(
      (s: Substitutions) => s.subKey === key
    );

    if (!match && key.length > 0)
      set((state: RFState) => ({
        flowSlice: {
          ...state.flowSlice,
          flow: {
            ...state.flowSlice.flow,
            substitutions: [
              ...state.flowSlice.flow.substitutions,
              {
                subKey: key,
                subConfigs: [
                  { configName: "Debug", configValue: "" },
                  { configName: "Release", configValue: "" },
                ],
              }, // might need to be an empty array
            ],
          },
        },
      }));
    else {
      setSubstitutionErrorMessage(set, "*substitution already exists");
      setTimeout(() => {
        setSubstitutionErrorMessage(set, "");
      }, 4000);
    }
  },

  deleteSubstitution: (key: string) => {
    //looking for match key to replace it in properties panel
    const updatedBlocks = get().flowSlice.flow.blockData.map(
      (block: BlockData) => {
        return {
          ...block,
          parameters: block.parameters.map((parameter: any) => {
            return {
              ...parameter,
              value: parameter.value.toString().includes(key)
                ? parameter.value.replace(`{${key}}`, "")
                : parameter.value,
            };
          }),
          extendedParameters: block.extendedParameters.map((parameter: any) => {
            return {
              ...parameter,
              value: parameter.value.toString().includes(key)
                ? parameter.value.replace(`{${key}}`, "")
                : parameter.value,
            };
          }),
        };
      }
    );

    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: {
          ...state.flowSlice.flow,
          substitutions: state.flowSlice.flow.substitutions.filter(
            (sub: Substitutions) => sub.subKey !== key
          ),
          blockData: updatedBlocks,
        },
      },
    }));
  },

  addConfig: (key: string, configName: string, configValue: string) => {
    set((state: RFState) => {
      const updatedSubstitutions = state.flowSlice.flow.substitutions.map(
        (sub: any) => {
          if (sub.subKey === key) {
            return {
              ...sub,
              subConfigs: sub.subConfigs.map((s: any) => {
                if (s.configName === configName) {
                  return { ...s, configValue: configValue };
                }
                return s;
              }),
            };
          }
          return sub;
        }
      );

      return {
        flowSlice: {
          ...state.flowSlice,
          flow: {
            ...state.flowSlice.flow,
            substitutions: updatedSubstitutions,
          },
        },
      };
    });

    console.log(get().flowSlice.flow.substitutions);
  },
});

export default substitutionsActions;
