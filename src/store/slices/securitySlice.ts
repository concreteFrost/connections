
import securityActions from "../actions/securityActions";
import { IGroup, INewUser, IRole, IUser } from "../interfaces/ISecurity";
import { RFState } from "../types/rfState"

export type SecuritySlice = {
    userToEdit: IUser | null,
    userList: Array<IUser>,
    groupList: Array<IGroup>,
    rolesList: Array<IRole>,

    //user actions
    getUser: (user: IUser) => void;
    getUserList: () => void;
    updateUser: (userRecord: IUser) => void;
    addUser: (userRecord: INewUser) => void;
    deleteUser: (userId: string) => void;
    generatePassword: (passwordType: number, length: number) => void;
    getRolesList: () => void;
    //group actions
    getGroupList: () => void;
    getGroupMembers: () => void;
    createGroup: (groupRecord: IGroup) => void;
    deleteGroup: (groupId: string) => void;
}

const securitySlice = (get: () => RFState, set: any): SecuritySlice => ({
    userToEdit: null,
    userList: [],
    groupList: [],
    rolesList: [],
    getUser: securityActions.getUser(get, set),
    getUserList: securityActions.getUserList(get, set),
    getRolesList: securityActions.getRoleList(get, set),
    updateUser: securityActions.updateUser(get, set),
    addUser: securityActions.addUser(get, set),
    deleteUser: securityActions.deleteUser(get, set),
    generatePassword: securityActions.generatePassword(get, set),
    getGroupMembers: securityActions.getGroupMembers(get, set),
    getGroupList: securityActions.getGroupList(get, set),
    createGroup: securityActions.addGroup(get, set),
    deleteGroup: securityActions.deleteGroup(get, set)
})

export default securitySlice;