import {
  getGroupListAPI,
  getGroupMembersAPI,
  getMeAPI,
  getRoleListAPI,
  getUserListAPI,
} from "../../api/security";
import { User, Group} from "../interfaces/ISecurity";
import { RFState } from "../types/rfState";

//USER ACTIONS
//#region
const getMe = (get: () => RFState, set: any) => async () => {
  try {
    const res: any = await getMeAPI();

    set((state: RFState) => ({
      securitySlice: {
        ...state.securitySlice,
        appUser: res.data.userRecord,
      },
    }));
  } catch (e) {
    throw e;
  }
};

const setAppUserPassword = (get: () => RFState, set: any) => (pass: string) => {
  set((state: RFState) => ({
    securitySlice: {
      ...state.securitySlice,
      appUserPassword: pass,
    },
  }));
};

const getUser = (get: () => RFState, set: any) => (user: User) => {
  set((state: RFState) => ({
    securitySlice: {
      ...state.securitySlice,
      userToEdit: user,
    },
  }));
};

const getUserList = (get: () => RFState, set: any) => async () => {
  try {
    const res: any = await getUserListAPI();
    const data: Array<User> = res.data.users;

    set((state: RFState) => ({
      securitySlice: {
        ...state.securitySlice,
        userList: data,
      },
    }));
  } catch (e) {
    console.log("error getting user list");
  }
};

const getRoleList = (get: () => RFState, set: any) => async () => {
  try {
    const res: any = await getRoleListAPI();
    const data: Array<Group> = res.data;

    set((state: RFState) => ({
      securitySlice: {
        ...state.securitySlice,
        rolesList: data,
      },
    }));
  } catch (e) {
    console.log("error getting roles list");
  }
};

const deleteCurrentUser =  (get: () => RFState, set: any)=>()=>{
  set((state:RFState)=>({
    securitySlice: {
      ...state.securitySlice,
      userToEdit:null
    },
  }))

  console.log(get().securitySlice)
}

//#endregion

//GROUP ACTIONS
//#region
const getGroupList = (get: () => RFState, set: any) => async () => {
  try {
    const res: any = await getGroupListAPI();
    const data: Array<Group> = res.data.groups;
    set((state: RFState) => ({
      securitySlice: {
        ...state.securitySlice,
        groupList: data,
      },
    }));
  } catch (e) {
    console.log("error getting user list");
  }
};

const getGroupMembers =
  (get: () => RFState, set: any) => async (groupdId: string) => {
    try {
      const res: any = await getGroupMembersAPI(groupdId);
      const data: User[] = res.data.users;

      const groupToUpdate = get().securitySlice.groupList.find(
        (group: Group) => group.groupId === groupdId
      );

      if (groupToUpdate) {
        //applying changes here
        groupToUpdate.groupMembers = data;

        //just refreshing securitySlice
        set((state: RFState) => ({
          securitySlice: {
            ...state.securitySlice,
          },
        }));
      }
    } catch (e) {
      console.log("error getting user list");
    }
  };

//#endregion

const securityActions = {
  setAppUserPassword: setAppUserPassword,
  getMe: getMe,
  getUser: getUser,
  getUserList: getUserList,
  getRoleList: getRoleList,
  getGroupList: getGroupList,
  getGroupMembers: getGroupMembers,
  deleteCurrentUser:deleteCurrentUser

};

export default securityActions;
