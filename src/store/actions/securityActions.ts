import {
  addGroupMemberAPI,
  addUserAPI,
  createGroupAPI,
  generatePasswordAPI,
  getGroupListAPI,
  getGroupMembersAPI,
  getMeAPI,
  getRoleListAPI,
  getUserAPI,
  getUserListAPI,
  getVapidKeysAPI,
  removeGroupAPI,
  removeGroupMemberAPI,
  removeUserAPI,
  resetPasswordAPI,
  updateUserAPI,
} from "../../api/security";
import {
  IUser,
  IGroup,
  INewUser,
  IGroupWithUsers,
} from "../interfaces/ISecurity";
import { ILogObject } from "../interfaces/IServer";
import { RFState } from "../types/rfState";

// const getUser = (get: () => RFState, set: any) => async (userId: string) => {
//     try {
//         console.log(userId)
//         const res: any = await getUserAPI(userId);
//         const data: Array<IUser> = res.data.userRecord;
//         console.log(data)
//         set((state: RFState) => ({
//             securitySlice: {
//                 ...state.securitySlice, userToEdit: data
//             }
//         }))

//     }
//     catch (e) {
//         console.log('error getting user list')
//     }
// }

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

const getUser = (get: () => RFState, set: any) => (user: IUser) => {
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
    const data: Array<IUser> = res.data.users;

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
    const data: Array<IGroup> = res.data;

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

const updateUser =
  (get: () => RFState, set: any) => async (userRecord: IUser) => {
    try {
      const res = await updateUserAPI(userRecord);
      return res;
    } catch (e) {
      console.log("error updating user");
    }
  };

const addUser =
  (get: () => RFState, set: any) => async (userRecord: INewUser) => {
    try {
      const res: any = await addUserAPI(userRecord);
      return res;
    } catch (e) {
      console.log("error adding user", e);
    }
  };

const deleteUser = (get: () => RFState, set: any) => async (userId: string) => {
  try {
    const res: any = await removeUserAPI(userId);
    return res;
  } catch (e) {
    console.log("error deleting user", e);
  }
};

const generatePassword =
  (get: () => RFState, set: any) => async (genType: number, length: number) => {
    try {
      const res: any = await generatePasswordAPI(genType, length);

      return res.data.message;
    } catch (e) {
      console.log("error generating password", e);
    }
  };

const resetPassword =
  (get: () => RFState, set: any) =>
  async (userId: string, newPasword: string, emailUser: boolean) => {
    try {
      const res: any = await resetPasswordAPI(userId, newPasword, emailUser);
      return res;
    } catch (e) {
      console.log("error reseting user password", e);
    }
  };
//#endregion

//GROUP ACTIONS
//#region
const getGroupList = (get: () => RFState, set: any) => async () => {
  try {
    const res: any = await getGroupListAPI();
    const data: Array<IGroup> = res.data.groups;
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
      const data: IUser[] = res.data.users;

      const groupToUpdate = get().securitySlice.groupList.find(
        (group: IGroup) => group.groupId === groupdId
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

const addGroup =
  (get: () => RFState, set: any) => async (groupRecord: IGroup) => {
    try {
      const res: any = await createGroupAPI(groupRecord);
      return res;
    } catch (e) {
      console.log("error creating group");
    }
  };

const deleteGroup =
  (get: () => RFState, set: any) => async (groupId: string) => {
    try {
      const res: any = await removeGroupAPI(groupId);
      return res;
    } catch (e) {
      console.log("error deleting group");
    }
  };

const addGroupMember =
  (get: () => RFState, set: any) => async (userId: string, groupId: string) => {
    try {
      const res: any = await addGroupMemberAPI(userId, groupId);
      console.log("adding group member", res);
      return res;
    } catch (e) {
      console.log("error adding group member");
    }
  };

const removeGroupMember =
  (get: () => RFState, set: any) => async (userId: string, groupId: string) => {
    try {
      const res: any = await removeGroupMemberAPI(userId, groupId);
      console.log(res);
      return res;
    } catch (e) {
      console.log("error removing group member");
    }
  };
//#endregion

//#region NOTIFICATIONS
const getVapidKeys=(get: () => RFState, set: any) => async()=>{
  try{
    const res : any = await getVapidKeysAPI();
    return res;
  }
  catch(e){
    console.log('error getting vapid keys',e)
  }
}
//#endregion



const securityActions = {
  setAppUserPassword: setAppUserPassword,
  getMe: getMe,
  getUser: getUser,
  getUserList: getUserList,
  getRoleList: getRoleList,
  updateUser: updateUser,
  addUser: addUser,
  deleteUser: deleteUser,
  generatePassword: generatePassword,
  resetPassword: resetPassword,
  getGroupList: getGroupList,
  getGroupMembers: getGroupMembers,
  addGroup: addGroup,
  deleteGroup: deleteGroup,
  addGroupMember: addGroupMember,
  removeGroupMember: removeGroupMember,
  getVapidKeys:getVapidKeys,
};

export default securityActions;
