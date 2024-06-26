export interface User {
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

export interface NewUser {
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


export interface Group {
    groupId: string;
    name: string;
    description: string;
    active: boolean;
    owner: string;
    dateCreated: string;
    lastAmended: string;

}

export interface GroupWithUsers extends Group {
    groupMembers: Array<User>
}

export interface Role {
    roleDescription: string;
    roleId: string;
    roleName: string;
}


