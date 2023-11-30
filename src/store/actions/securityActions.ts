import { getGroupListAPI, getUserListAPI } from "../../api/security";
import { IUser, IGroup } from "../interfaces/ISecurity";
import { RFState } from "../types/rfState";

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

const securityActions = {
    getUserList: getUserList,
    getGroupList: getGroupList,
}


export default securityActions;