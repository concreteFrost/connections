import alertActions from "../actions/alertActions";
import { IDirective, IAlertFormat, INewAlertFormat} from "../interfaces/IAlerts";
import { ISubscription } from "../interfaces/INotification";
import { RFState } from "../types/rfState"
export type AlertSlice = {

    directives:IDirective[],
    getDirectives: () => Promise<IDirective[]>;
    getDirectivesGlobal: ()=>void;
    updateDirective:(directive: IDirective)=>void;
    deleteDirective:(ehControlId:number)=>void;
    addDirective:(newDirective:IDirective)=>void;

    getAlertFormats:()=>Promise<IAlertFormat[]>;
    updateAlertFormat:(alertFromat:IAlertFormat)=>void;
    deleteAlertFormat:(alertFormatId:number)=>void;
    addAlertFormat:(newAlertFormat:INewAlertFormat)=>void;

    enablieClientAlerts:(subscription:ISubscription)=>void;
}

const alertSlice = (get: () => RFState, set: any): AlertSlice => ({
    directives:[],
    getDirectives: alertActions.getDirectives(),
    getDirectivesGlobal:alertActions.getDirectivesGlobal(get,set),
    updateDirective:alertActions.updateDirective(),
    deleteDirective:alertActions.deleteDirective(),
    addDirective:alertActions.addDirective(),
    
    getAlertFormats:alertActions.getAlertFormats(),
    updateAlertFormat:alertActions.updateAlertFormat(),
    deleteAlertFormat:alertActions.deleteAlertFormat(),
    addAlertFormat:alertActions.addAlertFormat(),

    enablieClientAlerts:alertActions.enableClientAlerts()
})

export default alertSlice;