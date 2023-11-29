import { getNotificationsAPI } from "../../api/notification";
import { RFState } from "../types/rfState";

export const getNotificationList = (get: () => RFState, set: any) => async (userId?: string, userGroup?: string) => {
    try {
        const res: any = await getNotificationsAPI(userId, userGroup);
        set((state: RFState) => ({
            notificationSlice: {
                ...state.notificationSlice,
                notificationsList: res.data.notifications
            }
        }))
    } catch (e) {
        console.log('error loading notifications', e);

    }

}

const notificationsActions = {
    getNotificationList: getNotificationList
}

export default notificationsActions