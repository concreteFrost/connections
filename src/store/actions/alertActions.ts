import { AddAlertFormatApi, RemoveAlertFormatApi, RemoveDirectiveApi, UpdateAlertFormatApi, UpdateDirectiveApi, addDirectiveApi, getAlertFormatsApi, getDirectivesApi } from "../../api/ehd";
import { IAlertFormat, IDirective,INewAlertFormat } from "../interfaces/IAlerts";

const getDirectives = () => async (): Promise<IDirective[]> => {
    try {
        const res: any = await getDirectivesApi();
        return res.data;
    } catch (error) {
        console.log("error getting directives");
        return [];
    }
}

const updateDirective = () => async (directive: IDirective) => {
    try {
        const res = await UpdateDirectiveApi(directive);
        console.log(res)
        return res;
    } catch (error) {
        console.log("error getting directives");

    }
}

const deleteDirective = () => async (ehControlId: number) => {
    try {
        const res = await RemoveDirectiveApi(ehControlId);
        return res;
    } catch (error) {
        console.log("error deleting directives");

    }
}

const addDirective = () => async (newDirective: IDirective) => {
    try {
        const res = await addDirectiveApi(newDirective)
        return res;
    } catch (error) {
        console.log("error adding directive");
    }
}

const getAlertFormats = () => async (): Promise<IAlertFormat[]> => {
    try {
        const res: any = await getAlertFormatsApi();
        return res.data;
    } catch (error) {
        console.log("error getting alert formats");
        return [];
    }
}

const updateAlertFormat = () => async (alertFormat: IAlertFormat) => {
    try {
        const res = await UpdateAlertFormatApi(alertFormat);
        return res;
    } catch (error) {
        console.log("error getting directives");

    }
}

const deleteAlertFormat = () => async (alertFormatId: number) => {
    try {
        const res = await RemoveAlertFormatApi(alertFormatId);
        return res;
    } catch (error) {
        console.log("error deleting directives");

    }
}

const addAlertFormat = () => async (newAlertFormat: INewAlertFormat) => {
    try {
        const res = await AddAlertFormatApi(newAlertFormat)
        return res;
    } catch (error) {
        console.log("error adding directive");
    }
}



const alertActions = {
    getDirectives: getDirectives,
    updateDirective: updateDirective,
    deleteDirective: deleteDirective,
    addDirective: addDirective,
    getAlertFormats:getAlertFormats,
    updateAlertFormat:updateAlertFormat,
    deleteAlertFormat:deleteAlertFormat,
    addAlertFormat:addAlertFormat
}

export default alertActions;