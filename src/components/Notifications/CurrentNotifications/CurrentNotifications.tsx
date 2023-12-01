import { useEffect, useState } from "react";
import s from "./CurrentNotifications.module.scss";
import useStore from "../../../store/store";
import { INotification } from "../../../store/interfaces/INotification";

function CurrentNotifications() {

  const { currentNotification, notificationsList, getNotificationsList, setCurrentNotification, deleteNotification } = useStore((state) => state.notificationSlice);

  const [selectedNotifications, setSelectedNotifications] = useState<Array<INotification>>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

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

  const toggleAddNotification = (newNotification: INotification) => {
    setSelectedNotifications(prevNotifications => {
      const notificationExists = prevNotifications.some(notification => notification.notificationId === newNotification.notificationId);

      if (notificationExists) {
        return prevNotifications.filter(notification => notification.notificationId !== newNotification.notificationId);
      } else {
        return [...prevNotifications, newNotification];
      }
    });
  };

  const toggleAllAddNotification = () => {
    setIsAllSelected(!isAllSelected)

    if (!isAllSelected) {
      // Select All: Add all notifications to the selectedNotifications array
      setSelectedNotifications([...notificationsList]);
    } else {
      // Select None: Clear the selectedNotifications array
      setSelectedNotifications([]);
    }
  };

  async function performDeleteSelected() {
    try {

      await Promise.all(selectedNotifications.map(async (note: INotification) => {
        //closes editor if id match
        if (note.notificationId === currentNotification?.notificationId) {
          setCurrentNotification(null)
        }
        await deleteNotification(note.notificationId);
      }));

      await getNotificationsList();

      setSelectedNotifications([]);
    } catch (error) {
      console.log('Error deleting notifications', error);
    }
  }




  return (
    <div className={s.wrapper}>
      <header className={s.panel_header}>Notifications</header>
      <section className={s.actions_wrapper}>
        <header className={s.actions_header}>Select All</header>
        <input type="checkbox" checked={isAllSelected} onChange={toggleAllAddNotification} />
      </section>
      <ul>
        {notificationsList.length > 0 ? notificationsList.map((notification: INotification) =>
          <li key={notification.notificationId}><div>{notification.name}</div>
            <div className={s.notification_actions}>
              <button className={s.edit_btn} onClick={() => setCurrentNotification(notification)}>EDIT</button>
              <button className={s.delete_btn} onClick={() => performSingleDeletion(notification.notificationId)} >X</button>
              <input type="checkbox"
                checked={selectedNotifications.some(selectedNotification => selectedNotification.notificationId === notification.notificationId)}
                onChange={() => toggleAddNotification(notification)}
              />
            </div>
          </li>) : null}
      </ul>

      <footer className={s.panel_footer}>
        <button onClick={performDeleteSelected}>DELETE SELECTED</button>
      </footer>
    </div>
  );
}

export default CurrentNotifications;
