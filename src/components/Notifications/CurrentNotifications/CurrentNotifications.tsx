import { useEffect } from "react";
import s from "./CurrentNotifications.module.scss";
import useStore from "../../../store/store";
import { INotification } from "../../../store/interfaces/INotification";

function CurrentNotifications() {

  const notificationsList = useStore((state) => state.notificationSlice.notificationsList);
  const currentNote = useStore((state) => state.notificationSlice.currentNotification);
  const { getNotificationsList, setCurrentNotification, deleteNotification } = useStore((state) => state.notificationSlice);

  async function fetchData() {
    try {
      await getNotificationsList()
    }
    catch (e) {
      console.log('error getting list of notifications', e)
    }
  }

  async function performSingleDeletion(notificationId: string) {
    try {
      await deleteNotification(notificationId);
      await getNotificationsList();
    }
    catch (e) {
      console.log('error deleting notification', e)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <div className={s.wrapper}>
      <header className={s.panel_header}>Notifications</header>
      <section className={s.actions_wrapper}>
        <header className={s.actions_header}>Select All</header>
        <input type="checkbox" />
      </section>
      <ul>
        {notificationsList.length > 0 ? notificationsList.map((notification: INotification) =>
          <li key={notification.notificationId}><div>{notification.name}</div>
            <div className={s.notification_actions}>
              <button className={s.edit_btn} onClick={() => setCurrentNotification(notification)}>EDIT</button>
              <button className={s.delete_btn} onClick={() => performSingleDeletion(notification.notificationId)} >X</button>
              <input type="checkbox" />
            </div>
          </li>) : null}
      </ul>

      <footer className={s.panel_footer}>
        <button>DELETE SELECTED</button>
      </footer>
    </div>
  );
}

export default CurrentNotifications;
