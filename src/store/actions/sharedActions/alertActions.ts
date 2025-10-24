import { getDirectivesApi } from "api/ehd";
import { Directive, Alert } from "interfaces/IAlerts";
import { RFState } from "shared/types/rfState";

const alertActions = (get: () => RFState, set: any) => ({
  getDirectivesGlobal: async () => {
    try {
      const res: any = await getDirectivesApi();
      const data: Directive[] = res.data;
      set((state: RFState) => ({
        alertSlice: {
          ...state.alertSlice,
          directives: data.filter((dir: Directive) => dir.category === 1),
        },
      }));
    } catch (error) {
      console.log("error getting directives");
    }
  },
  setUnreadAlerts: (payload: Array<Alert>) => {
    set((state: RFState) => ({
      alertSlice: {
        ...state.alertSlice,
        unreadAlerts: payload,
      },
    }));
  },
});

export default alertActions;
