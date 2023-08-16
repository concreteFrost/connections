import { RFState } from "../types/rfState";

export const addSubstitutionKey = (get: any, set: any) => (key: string) => {
  const match = get().flow.substitutions.find((s: any) => s.subKey === key);

  if (!match)
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

  console.log(get().flow);
};

export const deleteSubstitution = (get:any, set:any)=>(key:string)=>{
  set((state:RFState)=>({
    flow:{
      ...state.flow,
      substitutions: state.flow.substitutions.filter((sub:any)=> sub.subKey !== key)
    }
  }))
}

export const addConfig =
  (get: any, set: any) =>
  (key: string, configName: string, configValue: string) => {
    set((state: RFState) => {
      const updatedSubstitutions = state.flow.substitutions.map((sub: any) => {
        if (sub.subKey === key) {
          return {
            ...sub,
            subConfigs: sub.subConfigs.map((s:any)=> {
              if(s.configName === configName){
                return {...s, configValue : configValue}
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

    console.log(get().flow.substitutions);
  };
