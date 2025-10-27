import { getNotificationTypesAPI, getNotificationsAPI } from "api/notification";
import { Notification, NotificationType } from "interfaces/INotification";
import { RFState } from "shared/types/rfState";

const notificationsActions = (get: () => RFState, set: any) => ({
  getNotificationList: async (userId?: string, userGroup?: string) => {
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
  },

  toggleHaveCheckedNotifications: (haveCheckedNotifications: boolean) => {
    set((state: RFState) => ({
      notificationSlice: {
        ...state.notificationSlice,
        haveCheckedNotifications: haveCheckedNotifications,
      },
    }));
  },

  getNotificationTypes: async () => {
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
  },

  setCurrentNotification: (notification: Notification | null) => {
    set((state: RFState) => ({
      notificationSlice: {
        ...state.notificationSlice,
        currentNotification: notification,
      },
    }));
  },

  setCurrentNotificationProps: (propToChange: any, value: any) => {
    set((state: RFState) => ({
      notificationSlice: {
        ...state.notificationSlice,
        currentNotification: {
          ...state.notificationSlice.currentNotification,
          [propToChange]: value,
        },
      },
    }));
  },

  toggleSelectNotification: async (notificationId: number) => {
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
  },
});

export default notificationsActions;
