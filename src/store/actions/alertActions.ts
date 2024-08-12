import {
  getDirectivesApi,
} from "../../api/ehd";
import {Directive} from "../interfaces/IAlerts";
import { RFState } from "../types/rfState";

//for global state
const getDirectivesGlobal = (get: () => RFState, set: any) => async () => {
  try {
    const res: any = await getDirectivesApi();
    const data: Directive[] = res.data;
    set((state: RFState) => ({
      alertSlice: {
        ...state.alertSlice,
        directives: data.filter((dir: Directive) => dir.category === 1),
      },
    }));
  } catch (error) {
    console.log("error getting directives");
  }
};


const alertActions = {
  getDirectivesGlobal: getDirectivesGlobal,
};

export default alertActions;
