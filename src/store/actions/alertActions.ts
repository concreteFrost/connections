import { getDirectivesApi } from "../../api/ehd";
import { RFState } from "../types/rfState";

const getDirectives = (get: () => RFState, set: any) => async () => {
    try {
        const res = await getDirectivesApi();
        return res.data;
    } catch (error) {
        console.log("error getting directives");
    }

}

const alertActions ={
    getDirectives:getDirectives
}

export default alertActions;