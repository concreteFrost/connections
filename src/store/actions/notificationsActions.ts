import {
  getNotificationTypesAPI,
  getNotificationsAPI,
} from "../../api/notification";
import {
  Notification,
  NotificationType,
} from "../interfaces/INotification";
import { RFState } from "../types/rfState";

const getNotificationList =
  (get: () => RFState, set: any) =>
  async (userId?: string, userGroup?: string) => {
    try {
      const res: any = await getNotificationsAPI(userId, userGroup);
      const data: Array<Notification> = res.data.notifications.map(
        (notification: Notification) => {
          return { ...notification, isSelected: false };
        }
      );
      set((state: RFState) => ({
        notificationSlice: {
          ...state.notificationSlice,
          notificationsList: data,
        },
      }));
    } catch (e) {
      console.log("error loading notifications", e);
    }
  };

const toggleHaveCheckedNotifications =
  (get: () => RFState, set: any) => (haveCheckedNotifications: boolean) => {
    set((state: RFState) => ({
      notificationSlice: {
        ...state.notificationSlice,
        haveCheckedNotifications: haveCheckedNotifications,
      },
    }));
  };

const getNotificationTypes = (get: () => RFState, set: any) => async () => {
  try {
    const res: any = await getNotificationTypesAPI();
    const data: Array<NotificationType> = res.data;
    set((state: RFState) => ({
      notificationSlice: {
        ...state.notificationSlice,
        notificationsTypes: data,
      },
    }));
  } catch (e) {
    console.log("error loading notifications", e);
  }
};

const setCurrentNotification =
  (get: () => RFState, set: any) => (notification: Notification | null) => {
    set((state: RFState) => ({
      notificationSlice: {
        ...state.notificationSlice,
        currentNotification: notification,
      },
    }));
  };

const setCurrentNotificationProps =
  (get: () => RFState, set: any) => (propToChange: any, value: any) => {
    set((state: RFState) => ({
      notificationSlice: {
        ...state.notificationSlice,
        currentNotification: {
          ...state.notificationSlice.currentNotification,
          [propToChange]: value,
        },
      },
    }));
  };

const toggleSelectNotification =
  (get: () => RFState, set: any) => async (notificationId: number) => {
    const updatedNotifications = get().notificationSlice.notificationsList.map(
      (notification: any) => {
        if (notificationId === notification.notificationId) {
          return {
            ...notification,
            isSelected: !notification.isSelected,
          };
        } else return notification;
      }
    );

    set((state: RFState) => ({
      notificationSlice: {
        ...state.notificationSlice,
        notificationsList: updatedNotifications,
      },
    }));
  };

const notificationsActions = {
  getNotificationList: getNotificationList,
  getNotificationTypes: getNotificationTypes,
  setCurrentNotification: setCurrentNotification,
  setCurrentNotificationProps: setCurrentNotificationProps,
  toggleSelectNotification: toggleSelectNotification,
  toggleHaveCheckedNotifications: toggleHaveCheckedNotifications,
};

export default notificationsActions;

