import alertActions from "store/actions/sharedActions/alertActions";
import { Alert, Directive } from "shared/interfaces/IAlerts";
import { RFState } from "shared/types/rfState";
export type AlertSlice = {
  unreadAlerts: Array<Alert>;
  setUnreadAlerts: (payload: Array<Alert>) => void;
  directives: Directive[];
  getDirectivesGlobal: () => void;
};

const alertSlice = (get: () => RFState, set: any): AlertSlice => ({
  unreadAlerts: [],
  directives: [],
  getDirectivesGlobal: alertActions(get, set).getDirectivesGlobal,
  setUnreadAlerts: alertActions(get, set).setUnreadAlerts,
});

export default alertSlice;
