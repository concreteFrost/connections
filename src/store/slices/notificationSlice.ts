import notificationsActions from "../actions/notificationsActions";
import { Notification, NotificationType, Subscription } from "../interfaces/INotification";
import { RFState } from "../types/rfState"

export type NotificationSlice = {
    notificationsList: Array<Notification>,
    notificationsTypes: Array<NotificationType>,
    currentNotification: Notification | null,
    haveCheckedNotifications: boolean,
    getNotificationsList: (userId?: string, groupId?: string) => void;
    getNotificationsTypes: () => void;
    setCurrentNotification: (notification: Notification | null) => void;
    deleteNotification: (notificationId: number) => void;
    setCurrentNotificationProps: (propName: any, value: any) => void;
    updateNotification: (notification: Notification) => void;
    testClientCallback: (yourCallbackUrl: string, user: string, pass: string, anyText: string) => void;
    addNewNotifications:(notificationRecord:Notification)=>void;
    registerClientNotification:(notificationId:number,callbackURI:string,userName:string,password:string)=>void;
    toggleHaveCheckedNotifications:(haveChecked:boolean)=>void;
    enableClientNotification:(subscription:Subscription)=>void;
}

const notificationSlice = (get: () => RFState, set: any): NotificationSlice => ({
    notificationsList: [],
    notificationsTypes: [],
    currentNotification: null,
    haveCheckedNotifications: false,
    getNotificationsList: notificationsActions.getNotificationList(get, set),
    getNotificationsTypes: notificationsActions.getNotificationTypes(get, set),
    setCurrentNotification: notificationsActions.setCurrentNotification(get, set),
    deleteNotification: notificationsActions.deleteNotification(get, set),
    setCurrentNotificationProps: notificationsActions.setCurrentNotificationProps(get, set),
    updateNotification: notificationsActions.updateNotification(get, set),
    testClientCallback: notificationsActions.testClientCallback(get, set),
    addNewNotifications:notificationsActions.addNewNotifications(get,set),
    registerClientNotification: notificationsActions.registerClientNotification(get,set),
    toggleHaveCheckedNotifications:notificationsActions.toggleHaveCheckedNotifications(get,set),
    enableClientNotification:notificationsActions.enableClientNotifications(get,set),
})

export default notificationSlice;