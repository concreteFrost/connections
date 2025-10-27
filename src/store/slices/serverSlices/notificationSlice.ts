import notificationsActions from "store/actions/serverActions/notificationsActions";
import {
  Notification,
  NotificationType,
} from "shared/interfaces/INotification";
import { RFState } from "shared/types/rfState";

export type NotificationSlice = {
  notificationsList: Array<Notification>;
  notificationsTypes: Array<NotificationType>;
  currentNotification: Notification | null;
  haveCheckedNotifications: boolean;
  getNotificationsList: (userId?: string, groupId?: string) => void;
  getNotificationsTypes: () => void;
  setCurrentNotification: (notification: Notification | null) => void;
  setCurrentNotificationProps: (propName: any, value: any) => void;
  toggleHaveCheckedNotifications: (haveChecked: boolean) => void;

  // deleteNotification: (notificationId: number) => void;
  // updateNotification: (notification: Notification) => void;
  // registerClientNotification:(notificationId:number,callbackURI:string,userName:string,password:string)=>void;
  // testClientCallback: (yourCallbackUrl: string, user: string, pass: string, anyText: string) => void;
  // enableClientNotification:(subscription:Subscription)=>void;
  // disableClientNotifications:()=>void;
  // addNewNotifications:(notificationRecord:Notification)=>void;
};

const notificationSlice = (
  get: () => RFState,
  set: any
): NotificationSlice => ({
  notificationsList: [],
  notificationsTypes: [],
  currentNotification: null,
  haveCheckedNotifications: false,
  getNotificationsList: notificationsActions(get, set).getNotificationList,
  getNotificationsTypes: notificationsActions(get, set).getNotificationTypes,
  setCurrentNotification: notificationsActions(get, set).setCurrentNotification,
  toggleHaveCheckedNotifications: notificationsActions(get, set)
    .toggleHaveCheckedNotifications,
  setCurrentNotificationProps: notificationsActions(get, set)
    .setCurrentNotificationProps,

  // deleteNotification: notificationsActions.deleteNotification(get, set),
  // updateNotification: notificationsActions.updateNotification(get, set),
  // testClientCallback: notificationsActions.testClientCallback(get, set),
  // addNewNotifications:notificationsActions.addNewNotifications(get,set),
  // registerClientNotification: notificationsActions.registerClientNotification(get,set),
  // enableClientNotification:notificationsActions.enableClientNotifications(get,set),
  // disableClientNotifications:notificationsActions.disableClientNotifications(get,set)
});

export default notificationSlice;
