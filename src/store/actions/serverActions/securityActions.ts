import {
  getGroupListAPI,
  getGroupMembersAPI,
  getMeAPI,
  getRoleListAPI,
  getUserListAPI,
} from "api/security";
import { User, Group } from "interfaces/ISecurity";
import { RFState } from "shared/types/rfState";

const securityActions = (get: () => RFState, set: any) => ({
  //USER ACTIONS
  //#region
  getMe: async () => {
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
  },

  setAppUserPassword: (pass: string) => {
    set((state: RFState) => ({
      securitySlice: {
        ...state.securitySlice,
        appUserPassword: pass,
      },
    }));
  },

  getUser: (user: User) => {
    set((state: RFState) => ({
      securitySlice: {
        ...state.securitySlice,
        userToEdit: user,
      },
    }));
  },

  getUserList: async () => {
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
  },

  getRoleList: async () => {
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
  },

  deleteCurrentUser: () => {
    set((state: RFState) => ({
      securitySlice: {
        ...state.securitySlice,
        userToEdit: null,
      },
    }));

    console.log(get().securitySlice);
  },

  //#endregion

  //GROUP ACTIONS
  //#region
  getGroupList: async () => {
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
  },
  getGroupMembers: async (groupdId: string) => {
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
  },

  //#endregion
});

export default securityActions;
