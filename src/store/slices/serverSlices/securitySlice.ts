import securityActions from "store/actions/serverActions/securityActions";
import { GroupWithUsers, Role, User } from "shared/interfaces/ISecurity";
import { RFState } from "shared/types/rfState";

export type SecuritySlice = {
  appUser: User | null;
  appUserPassword: string | undefined;
  userToEdit: User | null;
  userList: Array<User>;
  groupList: Array<GroupWithUsers>;
  rolesList: Array<Role>;

  //user actions
  getMe: () => void;
  getUser: (user: User) => void;
  getUserList: () => void;
  getRolesList: () => void;
  setAppUserPassword: (pass: string) => void;
  //group actions
  getGroupList: () => void;
  getGroupMembers: (groupdId: string) => void;
  deleteCurrentUser: () => void;
};

const securitySlice = (get: () => RFState, set: any): SecuritySlice => ({
  appUser: null,
  appUserPassword: "cre4min9Tuff",
  userToEdit: null,
  userList: [],
  groupList: [],
  rolesList: [],
  setAppUserPassword: securityActions(get, set).setAppUserPassword,
  getMe: securityActions(get, set).getMe,
  getUser: securityActions(get, set).getUser,
  getUserList: securityActions(get, set).getUserList,
  getRolesList: securityActions(get, set).getRoleList,
  getGroupMembers: securityActions(get, set).getGroupMembers,
  getGroupList: securityActions(get, set).getGroupList,
  deleteCurrentUser: securityActions(get, set).deleteCurrentUser,
});

export default securitySlice;
