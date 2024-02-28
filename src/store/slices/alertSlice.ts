import alertActions from "../actions/alertActions";
import { IDirective, IAlertFormat, INewAlertFormat} from "../interfaces/IAlerts";
import { RFState } from "../types/rfState"
export type AlertSlice = {

    getDirectives: () => Promise<IDirective[]>;
    updateDirective:(directive: IDirective)=>void;
    deleteDirective:(ehControlId:number)=>void;
    addDirective:(newDirective:IDirective)=>void;

    getAlertFormats:()=>Promise<IAlertFormat[]>;
    updateAlertFormat:(alertFromat:IAlertFormat)=>void;
    deleteAlertFormat:(alertFormatId:number)=>void;
    addAlertFormat:(newAlertFormat:INewAlertFormat)=>void;
}

const alertSlice = (get: () => RFState, set: any): AlertSlice => ({
    getDirectives: alertActions.getDirectives(),
    updateDirective:alertActions.updateDirective(),
    deleteDirective:alertActions.deleteDirective(),
    addDirective:alertActions.addDirective(),
    
    getAlertFormats:alertActions.getAlertFormats(),
    updateAlertFormat:alertActions.updateAlertFormat(),
    deleteAlertFormat:alertActions.deleteAlertFormat(),
    addAlertFormat:alertActions.addAlertFormat()
})

export default alertSlice;