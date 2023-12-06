
import securityActions from "../actions/securityActions";
import { IGroup, INewUser, IRole, IUser } from "../interfaces/ISecurity";
import { RFState } from "../types/rfState"

export type SecuritySlice = {
    currentUser: IUser | null,
    userList: Array<IUser>,
    groupList: Array<IGroup>,
    rolesList: Array<IRole>,
    getUser: (user: IUser) => void;
    getUserList: () => void;
    getGroupList: () => void;
    getRolesList: () => void;
    updateUser: (userRecord: IUser) => void;
    addUser: (userRecord: INewUser) => void;
}

const securitySlice = (get: () => RFState, set: any): SecuritySlice => ({
    currentUser: null,
    userList: [],
    groupList: [],
    rolesList: [],
    getUser: securityActions.getUser(get, set),
    getUserList: securityActions.getUserList(get, set),
    getGroupList: securityActions.getGroupList(get, set),
    getRolesList: securityActions.getRoleList(get, set),
    updateUser: securityActions.updateUser(get, set),
    addUser: securityActions.addUser(get, set)
})

export default securitySlice;