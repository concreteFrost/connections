import alertActions from "store/actions/alertActions";
import { Alert, Directive } from "store/interfaces/IAlerts";
import { RFState } from "store/types/rfState";
export type AlertSlice = {
  unreadAlerts: Array<Alert>;
  setUnreadAlerts: (payload: Array<Alert>) => void;
  directives: Directive[];
  getDirectivesGlobal: () => void;
};

const alertSlice = (get: () => RFState, set: any): AlertSlice => ({
  unreadAlerts: [],
  directives: [],
  getDirectivesGlobal: alertActions.getDirectivesGlobal(get, set),
  setUnreadAlerts: (payload: Array<Alert>) => {
    set((state: RFState) => ({
      alertSlice: {
        ...state.alertSlice,
        unreadAlerts: payload,
      },
    }));
  },
});

export default alertSlice;
