import alertActions from "../actions/alertActions";
import { IDirective } from "../interfaces/IAlerts";
import { RFState } from "../types/rfState"
export type AlertSlice = {
    getDirectives: () => void;
}

const alertSlice = (get: () => RFState, set: any): AlertSlice => ({
    getDirectives: alertActions.getDirectives(get, set)
})

export default alertSlice;