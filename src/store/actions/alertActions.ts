import { RemoveDirectiveApi, UpdateDirectiveApi, addDirectiveApi, getAlertFormatsApi, getDirectivesApi } from "../../api/ehd";
import { IAlertFormat, IDirective } from "../interfaces/IAlerts";

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


const alertActions = {
    getDirectives: getDirectives,
    updateDirective: updateDirective,
    deleteDirective: deleteDirective,
    addDirective: addDirective,
    getAlertFormats:getAlertFormats
}

export default alertActions;