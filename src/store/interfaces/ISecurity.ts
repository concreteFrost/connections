export interface IUser {
    belongsToGroups: any[];
    dateCreated: string;
    emailAddress: string | null;
    emailConfirmed: boolean;
    isActive: boolean;
    lastUpdated: string;
    phone: string | null;
    phoneConfirmed: boolean;
    restrictedToIPAddress: string;
    userId: string;
    userLevel: number;
    userLogin: string;
    userName: string;
    userRoleValue: number;
    userRoles: any[];
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