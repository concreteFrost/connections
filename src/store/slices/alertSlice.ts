import alertActions from "store/actions/alertActions";
import { Directive, AlertFormat, NewAlertFormat} from "store/interfaces/IAlerts";
import { Subscription } from "store/interfaces/INotification";
import { RFState } from "store/types/rfState"
export type AlertSlice = {

    directives:Directive[],
    getDirectives: () => Promise<Directive[]>;
    getDirectivesGlobal: ()=>void;
    updateDirective:(directive: Directive)=>void;
    deleteDirective:(ehControlId:number)=>void;
    addDirective:(newDirective:Directive)=>void;

    getAlertFormats:()=>Promise<AlertFormat[]>;
    updateAlertFormat:(alertFromat:AlertFormat)=>void;
    deleteAlertFormat:(alertFormatId:number)=>void;
    addAlertFormat:(newAlertFormat:NewAlertFormat)=>void;

    enablieClientAlerts:(subscription:Subscription)=>void;
    disableClientAlerts:()=>void;
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

    enablieClientAlerts:alertActions.enableClientAlerts(),
    disableClientAlerts:alertActions.disableClientAlerts()
})

export default alertSlice;