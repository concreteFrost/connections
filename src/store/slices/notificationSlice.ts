import notificationsActions from "../actions/notificationsActions";
import { INotification, INotificationType } from "../interfaces/INotification";
import { RFState } from "../types/rfState"

export type NotificationSlice = {
    notificationsList: Array<INotification>,
    notificationsTypes: Array<INotificationType>,
    currentNotification: INotification | null,
    getNotificationsList: (userId?: string, groupId?: string) => void;
    getNotificationsTypes: () => void;
    setCurrentNotification: (notification: INotification | null) => void;
    deleteNotification: (notificationId: string) => void;
    setCurrentNotificationProps: (propName: any, value: any) => void;
    updateNotification: (notification: INotification) => void;
}

const notificationSlice = (get: () => RFState, set: any): NotificationSlice => ({
    notificationsList: [],
    notificationsTypes: [],
    currentNotification: null,
    getNotificationsList: notificationsActions.getNotificationList(get, set),
    getNotificationsTypes: notificationsActions.getNotificationTypes(get, set),
    setCurrentNotification: notificationsActions.setCurrentNotification(get, set),
    deleteNotification: notificationsActions.deleteNotification(get, set),
    setCurrentNotificationProps: notificationsActions.setCurrentNotificationProps(get, set),
    updateNotification: notificationsActions.updateNotification(get, set)
})

export default notificationSlice;