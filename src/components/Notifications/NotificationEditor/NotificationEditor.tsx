import s from "./NotificationEditor.module.scss";
import useStore from "store/store";
import { NotificationType } from "store/interfaces/INotification";
import { User, Group } from "store/interfaces/ISecurity";
import { removeNotificationAPI, updateNotificationAPI } from "api/notification";

function NotificationEditor() {

  const { currentNotification,
    notificationsTypes,
    setCurrentNotificationProps,
    // deleteNotification,
    setCurrentNotification,
    getNotificationsList,
    // updateNotification,
  } = useStore((state) => state.notificationSlice);
  const { userList, groupList } = useStore((state) => state.securitySlice);
  const modalSlice = useStore((state) => state.modalWindowsSlice);
  const { setConfirmationModalActions, toggleConfirmationModal } = useStore((state) => state.modalWindowsSlice)

  async function performDeletion() {
    try {
      if (currentNotification?.notificationId) {
        await  removeNotificationAPI(currentNotification?.notificationId)
        await setCurrentNotification(null);
        await getNotificationsList()
      }
    }
    catch (e) {
      console.log('error on deleting notification', e)
    }
  }

  async function performUpdate() {
    try {
      if (currentNotification) {
        const res: any = await updateNotificationAPI(currentNotification);
        if (res.data.success) {
          await modalSlice.toggleMessageModal("success!!!");
          await getNotificationsList();
        }
        else {
          await modalSlice.toggleMessageModal(res.data.message);
        }
      }
    } catch (e) {
      console.log('error updating notification', e)
    }

  }

  return (
    <div className={s.wrapper}>
      <ul>
        <li className={s.list_item}>
          <div className={s.list_item_title}>Name:</div>
          <div className={s.list_item_value}><input type="text" value={currentNotification?.name}
            onChange={(e) => setCurrentNotificationProps("name", e.target.value)}
          /></div>
        </li>
        <li className={s.list_item}>
          <div className={s.list_item_title}>Description:</div>
          <div className={s.list_item_value}>
            <input type="text" value={currentNotification?.description} onChange={(e) => setCurrentNotificationProps("description", e.target.value)} />
          </div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>Type:</div>
          <div className={s.list_item_value}> <select
            value={currentNotification?.notificationTypeId}
            onChange={(e) => setCurrentNotificationProps("notificationTypeId", e.target.value)}
          >
            {notificationsTypes.length > 0 ? notificationsTypes.map((notification: NotificationType) =>
              <option value={notification.notificationTypeId} key={notification.notificationTypeId}>{notification.name}</option>) : null}
          </select></div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>User/Group:</div>
          <div className={s.list_item_value}>
            <select value={currentNotification?.userOrGroupId}
              onChange={(e) => setCurrentNotificationProps("userOrGroupId", e.target.value)}
            >
              <optgroup label="USERS">
                {userList.length > 0 ? userList.map((user: User) =>
                  <option key={user.userId} value={user.userId}>{user.userName}</option>) : null}
              </optgroup>
              <optgroup label="GROUPS">
                {groupList.length > 0 ? groupList.map((group: Group) =>
                  <option key={group.groupId} value={group.groupId}>{group.name}</option>) : null}
              </optgroup>
            </select></div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>Media:</div>
          <div className={s.list_item_value}>
            <label>Dashboard:</label>
            <input type="checkbox" checked={currentNotification?.notifyDashboard}
              onChange={(e) => setCurrentNotificationProps("notifyDashboard", !currentNotification?.notifyDashboard)}
            />
            <label>Email:</label>
            <input type="checkbox" checked={currentNotification?.notifyByEmail}
              onChange={(e) => setCurrentNotificationProps("notifyByEmail", !currentNotification?.notifyByEmail)}
            />
            <label>Sms:</label>
            <input type="checkbox" checked={currentNotification?.notifyBySMS}
              onChange={(e) => setCurrentNotificationProps("notifyBySMS", !currentNotification?.notifyBySMS)}
            />
          </div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>Active:</div>
          <div className={s.list_item_value}> <input type="checkbox" checked={currentNotification?.active}
            onChange={(e) => setCurrentNotificationProps("active", !currentNotification?.active)}
          /></div>
        </li>
      </ul>

      <div className={s.message_wrapper}>
        <header className={s.message_header}>Message:</header>
        <div className={s.message_body}>
          <textarea value={currentNotification?.userMessage}
            onChange={(e) => setCurrentNotificationProps("userMessage", e.target.value)}
          ></textarea>
        </div>
      </div>

      <footer className={s.editor_footer}>
        <button onClick={performUpdate}>Update</button>
        <button onClick={() => setCurrentNotification(null)}>Close</button>
        <button className={s.delete_notification_btn} onClick={() => {
          toggleConfirmationModal(true, `Would you like to delete ${currentNotification?.name}?`)
          setConfirmationModalActions(() => performDeletion())
        }}>Delete</button>
      </footer>
    </div>
  );
}

export default NotificationEditor;
