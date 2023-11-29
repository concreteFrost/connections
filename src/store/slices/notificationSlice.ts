import notificationsActions from "../actions/notificationsActions";
import { INotification } from "../interfaces/INotification";
import { RFState } from "../types/rfState"

export type NotificationSlice = {
    notificationsList: Array<INotification>,
    getNotificationsList: (userId?: string, groupId?: string) => void;
}

const notificationSlice = (get: () => RFState, set: any): NotificationSlice => ({
    notificationsList: [],
    getNotificationsList: notificationsActions.getNotificationList(get, set)
})

export default notificationSlice;