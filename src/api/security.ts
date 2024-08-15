import axios from "axios";
import { baseUrl } from "../store/constants/baseUrl";
import { NewUser, User, Group } from "../store/interfaces/ISecurity";

//GET
export function getMeAPI() {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Security/GetMe", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
        },
      })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function getUserAPI(userId: string) {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Security/GetUser", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
        },
        params: {
          userId: userId,
        },
      })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function getUserListAPI() {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Security/UserList", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
        },
      })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function getGroupListAPI() {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Security/GroupList", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
        },
      })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function getGroupMembersAPI(groupId: string) {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Security/GetGroupMembers", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
        },
        params: {
          groupId: groupId,
        },
      })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function getRoleListAPI() {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Security/RoleList", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
        },
      })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function getVapidKeysAPI() {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Security/GetVapidKeys", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
        },
      })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

//POST
export function addUserAPI(userRecord: NewUser) {
  return new Promise((resolve, reject) => {
    axios(baseUrl + "/Security/AddUser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
      data: userRecord,
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function updateUserAPI(userRecord: User) {
  return new Promise((resolve, reject) => {
    axios(baseUrl + "/Security/UpdateUser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
      data: userRecord,
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function removeUserAPI(userId: string) {
  return new Promise((resolve, reject) => {
    axios(baseUrl + "/Security/RemoveUser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
      params: {
        userId: userId,
      },
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function createGroupAPI(groupRecord: Group) {
  return new Promise((resolve, reject) => {
    axios(baseUrl + "/Security/CreateGroup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
      data: groupRecord,
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function removeGroupAPI(groupId: string) {
  return new Promise((resolve, reject) => {
    axios(baseUrl + "/Security/RemoveGroup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
      params: {
        groupId: groupId,
      },
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function addGroupMemberAPI(userId: string, groupId: string) {
  return new Promise((resolve, reject) => {
    axios(baseUrl + "/Security/AddGroupMember", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
      params: {
        groupId: groupId,
        userId: userId,
      },
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function removeGroupMemberAPI(userId: string, groupId: string) {
  return new Promise((resolve, reject) => {
    axios(baseUrl + "/Security/RemoveGroupMember", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
      params: {
        groupId: groupId,
        userId: userId,
      },
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function resetPasswordAPI(
  userId: string,
  newPasword: string,
  emailUser: boolean
) {
  return new Promise((resolve, reject) => {
    axios(baseUrl + "/Security/ResetPassword", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
      params: {
        userId: userId,
        newPasword: newPasword,
        emailUser: emailUser,
      },
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function generatePasswordAPI(genType: number, length: number) {
  return new Promise((resolve, reject) => {
    axios(baseUrl + "/Security/GeneratePassword", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("iCon_access_token"),
      },
      data: {
        genType: genType,
        length: length,
      },
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

//NOTIFICATIONS
