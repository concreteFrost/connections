
import securityActions from "../actions/securityActions";
import { IGroup, IUser } from "../interfaces/ISecurity";
import { RFState } from "../types/rfState"

export type SecuritySlice = {
    userList: Array<IUser>,
    groupList: Array<IGroup>,
    getUserList: () => void;
    getGroupList: () => void;
}

const securitySlice = (get: () => RFState, set: any): SecuritySlice => ({
    userList: [],
    groupList: [],
    getUserList: securityActions.getUserList(get, set),
    getGroupList: securityActions.getGroupList(get, set),
})

export default securitySlice;