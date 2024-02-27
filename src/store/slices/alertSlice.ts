import alertActions from "../actions/alertActions";
import { IDirective, IAlertFormat} from "../interfaces/IAlerts";
import { RFState } from "../types/rfState"
export type AlertSlice = {

    getDirectives: () => Promise<IDirective[]>;
    updateDirective:(directive: IDirective)=>void;
    deleteDirective:(ehControlId:number)=>void;
    addDirective:(newDirective:IDirective)=>void;

    getAlertFormats:()=>Promise<IAlertFormat[]>;
}

const alertSlice = (get: () => RFState, set: any): AlertSlice => ({
    getDirectives: alertActions.getDirectives(),
    updateDirective:alertActions.updateDirective(),
    deleteDirective:alertActions.deleteDirective(),
    addDirective:alertActions.addDirective(),
    
    getAlertFormats:alertActions.getAlertFormats()
})

export default alertSlice;