import alertActions from "store/actions/alertActions";
import { Directive } from "store/interfaces/IAlerts";
import { RFState } from "store/types/rfState";
export type AlertSlice = {
  directives: Directive[];
  getDirectivesGlobal: () => void;
};

const alertSlice = (get: () => RFState, set: any): AlertSlice => ({
  directives: [],
  getDirectivesGlobal: alertActions.getDirectivesGlobal(get, set),
});

export default alertSlice;
