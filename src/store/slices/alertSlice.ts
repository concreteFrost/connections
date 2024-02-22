import alertActions from "../actions/alertActions";
import { IDirective} from "../interfaces/IAlerts";
import { RFState } from "../types/rfState"
export type AlertSlice = {
    getDirectives: () => Promise<IDirective[]>;
    updateDirective:(directive: IDirective)=>void;
}

const alertSlice = (get: () => RFState, set: any): AlertSlice => ({
    getDirectives: alertActions.getDirectives(),
    updateDirective:alertActions.updateDirective(),
})

export default alertSlice;