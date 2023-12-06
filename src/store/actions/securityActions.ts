import { addUserAPI, getGroupListAPI, getRoleListAPI, getUserAPI, getUserListAPI, updateUserAPI } from "../../api/security";
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
        console.log('error getting user list')
    }
}

const updateUser = (get: () => RFState, set: any) => async (userRecord: IUser) => {
    try {
        console.log(userRecord, 'userRecord')
        const res: any = await updateUserAPI(userRecord);
    }
    catch (e) {
        console.log('error getting user list')
    }
}

const addUser = (get: () => RFState, set: any) => async (userRecord: INewUser) => {
    try {

        const res: any = await addUserAPI(userRecord);
        console.log(res);
    }
    catch (e) {
        console.log('error getting user list')
    }
}

const securityActions = {
    getUser: getUser,
    getUserList: getUserList,
    getGroupList: getGroupList,
    getRoleList: getRoleList,
    updateUser: updateUser,
    addUser: addUser
}


export default securityActions;