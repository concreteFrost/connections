import { addAlertFormatApi, removeAlertFormatApi, removeDirectiveApi, updateAlertFormatApi, updateDirectiveApi, addDirectiveApi, getAlertFormatsApi, getDirectivesApi, enabliClientAlertsApi } from "../../api/ehd";
import { AlertFormat, Directive,NewAlertFormat } from "../interfaces/IAlerts";
import { Subscription } from "../interfaces/INotification";
import { RFState } from "../types/rfState";

//for local state
const getDirectives = () => async (): Promise<Directive[]> => {
    try {
        const res: any = await getDirectivesApi();
        return res.data;
    } catch (error) {
        console.log("error getting directives");
        return [];
    }
}

//for global state
const getDirectivesGlobal=(get:()=>RFState,set:any)=>async()=>{
    try {
        const res: any = await getDirectivesApi();
        const data : Directive[] = res.data;
        set((state:RFState)=>({
            alertSlice:{
                ...state.alertSlice,
                directives: data.filter((dir:Directive)=> dir.category === 1)
            }
        }))
    } catch (error) {
        console.log("error getting directives");
        
    }
    
}

const updateDirective = () => async (directive: Directive) => {
    try {
        console.log(directive)
        const res = await updateDirectiveApi(directive);

        return res;
    } catch (error) {
        console.log("error getting directives");

    }
}

const deleteDirective = () => async (ehControlId: number) => {
    try {
        const res = await removeDirectiveApi(ehControlId);
        return res;
    } catch (error) {
        console.log("error deleting directives");

    }
}

const addDirective = () => async (newDirective: Directive) => {
    try {
        console.log(newDirective)
        const res = await addDirectiveApi(newDirective)
        return res;
    } catch (error) {
        console.log("error adding directive");
    }
}

const getAlertFormats = () => async (): Promise<AlertFormat[]> => {
    try {
        const res: any = await getAlertFormatsApi();
        return res.data;
    } catch (error) {
        console.log("error getting alert formats");
        return [];
    }
}

const updateAlertFormat = () => async (alertFormat: AlertFormat) => {
    try {
        const res = await updateAlertFormatApi(alertFormat);
        return res;
    } catch (error) {
        console.log("error getting directives");

    }
}

const deleteAlertFormat = () => async (alertFormatId: number) => {
    try {
        const res = await removeAlertFormatApi(alertFormatId);
        return res;
    } catch (error) {
        console.log("error deleting directives");

    }
}

const addAlertFormat = () => async (newAlertFormat: NewAlertFormat) => {
    try {
        const res = await addAlertFormatApi(newAlertFormat)
        return res;
    } catch (error) {
        console.log("error adding directive");
    }
}

const enableClientAlerts = () => async (subscription: Subscription) => {
    try {
        const res = await enabliClientAlertsApi(subscription);
        return res;
    } catch (error) { console.log('subscription',subscription)
        console.log("error registering alerts callback", error);
    }
}



const alertActions = {
    getDirectives: getDirectives,
    getDirectivesGlobal:getDirectivesGlobal,
    updateDirective: updateDirective,
    deleteDirective: deleteDirective,
    addDirective: addDirective,
    getAlertFormats:getAlertFormats,
    updateAlertFormat:updateAlertFormat,
    deleteAlertFormat:deleteAlertFormat,
    addAlertFormat:addAlertFormat,
    enableClientAlerts:enableClientAlerts
}

export default alertActions;