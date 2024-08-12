
import securityActions from "store/actions/securityActions";
import { Group, GroupWithUsers, NewUser, Role, User } from "store/interfaces/ISecurity";
import { RFState } from "store/types/rfState"

export type SecuritySlice = {
    appUser: User | null,
    appUserPassword: string | undefined,
    userToEdit: User | null,
    userList: Array<User>,
    groupList: Array<GroupWithUsers>,
    rolesList: Array<Role>,

    //user actions
    getMe:()=>void;
    getUser: (user: User) => void;
    getUserList: () => void;
    getRolesList: () => void;
    setAppUserPassword:(pass:string)=>void;
    //group actions
    getGroupList: () => void;
    getGroupMembers: (groupdId: string) => void;

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
    getGroupMembers: securityActions.getGroupMembers(get, set),
    getGroupList: securityActions.getGroupList(get, set),
    
})

export default securitySlice;