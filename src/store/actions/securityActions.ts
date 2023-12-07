import { addUserAPI, createGroupAPI, getGroupListAPI, getRoleListAPI, getUserAPI, getUserListAPI, removeGroupAPI, removeUserAPI, updateUserAPI } from "../../api/security";
import { IUser, IGroup, INewUser } from "../interfaces/ISecurity";
import { RFState } from "../types/rfState";

// const getUser = (get: () => RFState, set: any) => async (userId: string) => {
//     try {
//         console.log(userId)
//         const res: any = await getUserAPI(userId);
//         const data: Array<IUser> = res.data.userRecord;
//         console.log(data)
//         set((state: RFState) => ({
//             securitySlice: {
//                 ...state.securitySlice, currentUser: data
//             }
//         }))

//     }
//     catch (e) {
//         console.log('error getting user list')
//     }
// }


//USER ACTIONS
//#region 
const getUser = (get: () => RFState, set: any) => (user: IUser) => {
    set((state: RFState) => ({
        securitySlice: {
            ...state.securitySlice, currentUser: user
        }
    }))
}

const getUserList = (get: () => RFState, set: any) => async () => {
    try {
        const res: any = await getUserListAPI();
        const data: Array<IUser> = res.data.users;

        set((state: RFState) => ({
            securitySlice: {
                ...state.securitySlice, userList: data
            }
        }))

    }
    catch (e) {
        console.log('error getting user list')
    }
}

const getRoleList = (get: () => RFState, set: any) => async () => {
    try {
        const res: any = await getRoleListAPI();
        const data: Array<IGroup> = res.data;

        set((state: RFState) => ({
            securitySlice: {
                ...state.securitySlice, rolesList: data
            }
        }))
    }
    catch (e) {
        console.log('error getting roles list')
    }
}

const updateUser = (get: () => RFState, set: any) => async (userRecord: IUser) => {
    try {

        const res = await updateUserAPI(userRecord);
        return res;
    }
    catch (e) {
        console.log('error updating user')
    }
}

const addUser = (get: () => RFState, set: any) => async (userRecord: INewUser) => {
    try {
        const res: any = await addUserAPI(userRecord);
        return res;
    }
    catch (e) {
        console.log('error adding user')
    }
}

const deleteUser = (get: () => RFState, set: any) => async (userId: string) => {
    try {

        const res: any = await removeUserAPI(userId);
        console.log(res);
    }
    catch (e) {
        console.log('error deleting user')
    }
}
//#endregion


//GROUP ACTIONS
//#region 
const getGroupList = (get: () => RFState, set: any) => async () => {
    try {
        const res: any = await getGroupListAPI();
        const data: Array<IGroup> = res.data.groups;

        set((state: RFState) => ({
            securitySlice: {
                ...state.securitySlice, groupList: data
            }
        }))
    }
    catch (e) {
        console.log('error getting user list')
    }
}

const addGroup = (get: () => RFState, set: any) => async (groupRecord: IGroup) => {
    try {
        const res: any = createGroupAPI(groupRecord);
        return res;
    }
    catch (e) {
        console.log('error creating group')
    }
}

const deleteGroup = (get: () => RFState, set: any) => async (groupId: string) => {
    try {
        const res: any = removeGroupAPI(groupId);
        return res;
    }
    catch (e) {
        console.log('error deleting group')
    }
}
//#endregion



const securityActions = {
    getUser: getUser,
    getUserList: getUserList,
    getRoleList: getRoleList,
    updateUser: updateUser,
    addUser: addUser,
    deleteUser: deleteUser,
    getGroupList: getGroupList,
    addGroup: addGroup,
    deleteGroup: deleteGroup
}


export default securityActions;