export interface INotification {
    notificationId: string;
    name: string;
    description: string;
    notificationTypeId: string;
    userOrGroupId: string;
    active: boolean;
    userMessage: string;
    notifyDashboard: boolean;
    notifyByEmail: boolean;
    notifyBySMS: boolean;
}

export interface INotificationType {
    defaultText: string,
    name: string,
    notificationTypeId: string
}