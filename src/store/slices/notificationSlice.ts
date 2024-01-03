import notificationsActions from "../actions/notificationsActions";
import { INotification, INotificationType } from "../interfaces/INotification";
import { RFState } from "../types/rfState"

export type NotificationSlice = {
    notificationsList: Array<INotification>,
    notificationsTypes: Array<INotificationType>,
    currentNotification: INotification | null,
    haveCheckedNotifications: boolean,
    getNotificationsList: (userId?: string, groupId?: string) => void;
    getNotificationsTypes: () => void;
    setCurrentNotification: (notification: INotification | null) => void;
    deleteNotification: (notificationId: number) => void;
    setCurrentNotificationProps: (propName: any, value: any) => void;
    updateNotification: (notification: INotification) => void;
    testClientCallback: (yourCallbackUrl: string, user: string, pass: string, anyText: string) => void;
    addNewNotifications:(notificationRecord:INotification)=>void;
    registerClientNotification:(notificationId:number,callbackURI:string,userName:string,password:string)=>void;
    toggleHaveCheckedNotifications:(haveChecked:boolean)=>void;
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
    toggleHaveCheckedNotifications:notificationsActions.toggleHaveCheckedNotifications(get,set)
})

export default notificationSlice;