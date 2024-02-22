import { UpdateDirectiveApi, getDirectivesApi } from "../../api/ehd";
import { IDirective } from "../interfaces/IAlerts";

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
       return res;
    } catch (error) {
        console.log("error getting directives");

    }
}

const alertActions = {
    getDirectives: getDirectives,
    updateDirective: updateDirective
}

export default alertActions;