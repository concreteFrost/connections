import { Notification } from "store/interfaces/INotification";

const mockNotifications: Notification[] = [
  {
    notificationId: 1,
    name: 'Notification 1',
    description: 'Description of notification 1.',
    notificationTypeId: 'Type 1',
    userOrGroupId: 'Group 1',
    active: true,
    userMessage: 'User message 1.',
    notifyDashboard: false,
    notifyByEmail: true,
    notifyBySMS: false
  },
  {
    notificationId: 2,
    name: 'Notification 2',
    description: 'Description of notification 2.',
    notificationTypeId: 'Type 2',
    userOrGroupId: 'Group 2',
    active: false,
    userMessage: '',
    notifyDashboard: true,
    notifyByEmail: false,
    notifyBySMS: true
  },
  {
    notificationId: 3,
    name: 'Notification 3',
    description: 'Description of notification 3.',
    notificationTypeId: 'Type 3',
    userOrGroupId: 'Group 3',
    active: true,
    userMessage: 'User message 3.',
    notifyDashboard: false,
    notifyByEmail: true,
    notifyBySMS: false
  }
];

export default mockNotifications;