import { NotificationType } from "store/interfaces/INotification";

const mockNotificationTypes: NotificationType[] = [
  {
    defaultText: 'Default text 1',
    name: 'Notification type 1',
    notificationTypeId: 'Type 1'
  },
  {
    defaultText: 'Default text 2',
    name: 'Notification type 2',
    notificationTypeId: 'Type 2'
  },
  {
    defaultText: 'Default text 3',
    name: 'Notification type 3',
    notificationTypeId: 'Type 3'
  }
];

export default mockNotificationTypes;