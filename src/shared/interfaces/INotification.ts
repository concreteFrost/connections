export interface Notification {
    notificationId: number;
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

export interface NotificationType {
    defaultText: string,
    name: string,
    notificationTypeId: string
}

export interface Subscription {
    endpoint: string,

    auth: string,
    p256dh: string

}