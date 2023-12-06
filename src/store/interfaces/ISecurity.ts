export interface IUser {
    belongsToGroups: any[];
    dateCreated: string;
    emailAddress: string;
    emailConfirmed: boolean;
    isActive: boolean;
    lastUpdated: string;
    phone: string;
    phoneConfirmed: boolean;
    restrictedToIPAddress: string;
    userId: string;
    userLevel: number;
    userLogin: string;
    userName: string;
    userRoleValue: number;
    userRoles: any[];
}

export interface INewUser {
    userLogin: string;
    password: string;
    userName: string;
    isActive: boolean;
    emailAddress: string;
    emailConfirmed: boolean;
    phone: string;
    phoneConfirmed: boolean;
    userLevel: number;
    restrictedToIPAddress: string;
    addToGroups: any[];
    userRoleIds: any[];
}


export interface IGroup {
    groupId: string;
    name: string;
    description: string;
    active: boolean;
    owner: string;
    dateCreated: string;
    lastAmended: string;
}

export interface IRole {
    roleDescription: string;
    roleId: string;
    roleName: string;
}


