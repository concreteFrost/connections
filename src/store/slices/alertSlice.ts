import alertActions from "store/actions/alertActions";
import { Alert, Directive } from "store/interfaces/IAlerts";
import { RFState } from "store/types/rfState";
export type AlertSlice = {
  alerts:Array<Alert>;
  directives: Directive[];
  getDirectivesGlobal: () => void;
  setAlerts:(payload:Array<Alert>)=>void;
 
};

const alertSlice = (get: () => RFState, set: any): AlertSlice => ({
  alerts:[],
  directives: [],
  getDirectivesGlobal: alertActions.getDirectivesGlobal(get, set),
  setAlerts:(payload: Array<Alert>)=>{
    set((state:RFState)=>({
      alertSlice:{
        ...state.alertSlice, alerts: payload
      }
    }))
  },
 
});

export default alertSlice;
