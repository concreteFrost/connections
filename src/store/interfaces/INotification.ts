export interface INotification {
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

export interface INotificationType {
    defaultText: string,
    name: string,
    notificationTypeId: string
}

export interface ISubscription{
    endpoint: string,
    keys:{
        auth: string,
        p256dh: string
    }
  }