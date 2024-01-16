
import securityActions from "../actions/securityActions";
import { IGroup, IGroupWithUsers, INewUser, IRole, IUser } from "../interfaces/ISecurity";
import { RFState } from "../types/rfState"

export type SecuritySlice = {
    appUser: IUser | null,
    appUserPassword: string | undefined,
    userToEdit: IUser | null,
    userList: Array<IUser>,
    groupList: Array<IGroupWithUsers>,
    rolesList: Array<IRole>,

    //user actions
    getMe:()=>void;
    getUser: (user: IUser) => void;
    getUserList: () => void;
    updateUser: (userRecord: IUser) => void;
    addUser: (userRecord: INewUser) => void;
    deleteUser: (userId: string) => void;
    generatePassword: (passwordType: number, length: number) => void;
    getRolesList: () => void;
    resetPassword: (userId: string, newPasword: string, emailUser: boolean) => void;
    setAppUserPassword:(pass:string)=>void;
    //group actions
    getGroupList: () => void;
    getGroupMembers: (groupdId: string) => void;
    createGroup: (groupRecord: IGroup) => void;
    deleteGroup: (groupId: string) => void;
    addGroupMember: (userId: string, groupId: string) => void;
    removeGroupMember: (userId: string, groupId: string) => void
    //notifications
    getVapidKeys:()=>void;

}

const securitySlice = (get: () => RFState, set: any): SecuritySlice => ({
    appUser:null,
    appUserPassword:'cre4min9Tuff',
    userToEdit: null,
    userList: [],
    groupList: [],
    rolesList: [],
    setAppUserPassword:securityActions.setAppUserPassword(get,set),
    getMe: securityActions.getMe(get,set),
    getUser: securityActions.getUser(get, set),
    getUserList: securityActions.getUserList(get, set),
    getRolesList: securityActions.getRoleList(get, set),
    updateUser: securityActions.updateUser(get, set),
    addUser: securityActions.addUser(get, set),
    deleteUser: securityActions.deleteUser(get, set),
    generatePassword: securityActions.generatePassword(get, set),
    resetPassword: securityActions.resetPassword(get, set),
    getGroupMembers: securityActions.getGroupMembers(get, set),
    getGroupList: securityActions.getGroupList(get, set),
    createGroup: securityActions.addGroup(get, set),
    deleteGroup: securityActions.deleteGroup(get, set),
    addGroupMember: securityActions.addGroupMember(get, set),
    removeGroupMember: securityActions.removeGroupMember(get, set),
    getVapidKeys: securityActions.getVapidKeys(get,set),
})

export default securitySlice;