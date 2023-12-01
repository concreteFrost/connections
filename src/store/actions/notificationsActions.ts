import { getNotificationTypesAPI, getNotificationsAPI, removeNotificationAPI, updateNotificationAPI } from "../../api/notification";
import { INotification, INotificationType } from "../interfaces/INotification";
import { RFState } from "../types/rfState";

const getNotificationList = (get: () => RFState, set: any) => async (userId?: string, userGroup?: string) => {
    try {
        const res: any = await getNotificationsAPI(userId, userGroup);
        const data: Array<INotification> = res.data.notifications.map((notification: INotification) => { return { ...notification, isSelected: false } });
        set((state: RFState) => ({
            notificationSlice: {
                ...state.notificationSlice,
                notificationsList: data
            }
        }))
    } catch (e) {
        console.log('error loading notifications', e);

    }
}

const getNotificationTypes = (get: () => RFState, set: any) => async () => {
    try {
        const res: any = await getNotificationTypesAPI();
        const data: Array<INotificationType> = res.data;
        set((state: RFState) => ({
            notificationSlice: {
                ...state.notificationSlice,
                notificationsTypes: data
            }
        }))


    } catch (e) {
        console.log('error loading notifications', e);

    }
}

const setCurrentNotification = (get: () => RFState, set: any) => (notification: INotification | null) => {
    set((state: RFState) => ({
        notificationSlice: {
            ...state.notificationSlice,
            currentNotification: notification
        }
    }))
}

const setCurrentNotificationProps = (get: () => RFState, set: any) => (propToChange: any, value: any) => {
    set((state: RFState) => ({
        notificationSlice: {
            ...state.notificationSlice,
            currentNotification: {
                ...state.notificationSlice.currentNotification,
                [propToChange]: value
            }
        }
    }))
}

const deleteNotification = (get: () => RFState, set: any) => async (notificationId: string) => {
    try {
        const res = await removeNotificationAPI(notificationId);
        return res;

    }
    catch (e) {
        console.log('error on deleting notification', e)
    }
}

const updateNotification = (get: () => RFState, set: any) => async (notification: INotification) => {
    try {
        const res: any = await updateNotificationAPI(notification);
        return res

    }
    catch (e) {
        console.log('error on updating notification', e)
    }
}

const toggleSelectNotification = (get: () => RFState, set: any) => async (notificationId: string) => {
    const updatedNotifications = get().notificationSlice.notificationsList.map((notification: any) => {
        if (notificationId === notification.notificationId) {
            return {
                ...notification,
                isSelected: !notification.isSelected
            }
        }
        else return notification
    })

    set((state: RFState) => ({
        notificationSlice: {
            ...state.notificationSlice,
            notificationsList: updatedNotifications
        }
    }))
}

const notificationsActions = {
    getNotificationList: getNotificationList,
    getNotificationTypes: getNotificationTypes,
    setCurrentNotification: setCurrentNotification,
    deleteNotification: deleteNotification,
    setCurrentNotificationProps: setCurrentNotificationProps,
    updateNotification: updateNotification,
    toggleSelectNotification: toggleSelectNotification
}

export default notificationsActions