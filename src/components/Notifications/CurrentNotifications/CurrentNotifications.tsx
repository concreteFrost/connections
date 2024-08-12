import { useEffect, useState } from "react";
import s from "./CurrentNotifications.module.scss";
import useStore from "store/store";
import { Notification } from "store/interfaces/INotification";
import { removeNotificationAPI } from "api/notification";

function CurrentNotifications() {
  const {
    currentNotification,
    notificationsList,
    getNotificationsList,
    setCurrentNotification,
    // deleteNotification,
  } = useStore((state) => state.notificationSlice);

  const [selectedNotifications, setSelectedNotifications] = useState<
    Array<Notification>
  >([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const { setConfirmationModalActions, toggleConfirmationModal } = useStore(
    (state) => state.modalWindowsSlice
  );

  async function fetchData() {
    try {
      await getNotificationsList();
    } catch (e) {
      console.log("error getting list of notifications", e);
    }
  }

  async function performSingleDeletion(notificationId: number) {
    try {
      await removeNotificationAPI(notificationId);
      await getNotificationsList();
    } catch (e) {
      console.log("error deleting notification", e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const toggleAddNotification = (newNotification: Notification) => {
    setSelectedNotifications((prevNotifications) => {
      const notificationExists = prevNotifications.some(
        (notification) =>
          notification.notificationId === newNotification.notificationId
      );

      if (notificationExists) {
        return prevNotifications.filter(
          (notification) =>
            notification.notificationId !== newNotification.notificationId
        );
      } else {
        return [...prevNotifications, newNotification];
      }
    });
  };

  const toggleAllAddNotification = () => {
    setIsAllSelected(!isAllSelected);

    if (!isAllSelected) {
      setSelectedNotifications([...notificationsList]);
    } else {
      setSelectedNotifications([]);
    }
  };

  async function performDeleteSelected() {
    try {
      await Promise.all(
        selectedNotifications.map(async (note: Notification) => {
          if (note.notificationId === currentNotification?.notificationId) {
            setCurrentNotification(null);
          }
          await removeNotificationAPI(note.notificationId);
        })
      );

      await getNotificationsList();

      setSelectedNotifications([]);
      setIsAllSelected(false);
    } catch (error) {
      console.log("Error deleting notifications", error);
    }
  }

  return (
    <div className={s.wrapper}>
      <header className={s.panel_header}>Notifications</header>
      <section className={s.actions_wrapper}>
        <header className={s.actions_header}>Select All</header>
        <input
          type="checkbox"
          checked={isAllSelected}
          onChange={toggleAllAddNotification}
        />
      </section>
      <ul>
        {notificationsList.length > 0
          ? notificationsList.map((notification: Notification) => (
              <li key={notification.notificationId}>
                <div>{notification.name}</div>
                <div className={s.notification_actions}>
                  <button
                    className={s.edit_btn}
                    onClick={() => setCurrentNotification(notification)}
                  >
                    EDIT
                  </button>
                  <button
                    className={s.delete_btn}
                    onClick={() => {
                      toggleConfirmationModal(
                        true,
                        `Would you like to delete ${notification.name}?`
                      );
                      setConfirmationModalActions(() =>
                        performSingleDeletion(notification.notificationId)
                      );
                    }}
                  >
                    X
                  </button>
                  <input
                    type="checkbox"
                    checked={selectedNotifications.some(
                      (selectedNotification) =>
                        selectedNotification.notificationId ===
                        notification.notificationId
                    )}
                    onChange={() => toggleAddNotification(notification)}
                  />
                </div>
              </li>
            ))
          : null}
      </ul>

      <footer className={s.panel_footer}>
        <button
          onClick={() => {
            if (selectedNotifications.length > 0) {
              toggleConfirmationModal(
                true,
                `Would you like to delete selected notifications?`
              );
              setConfirmationModalActions(() => performDeleteSelected());
            }
          }}
        >
          DELETE SELECTED
        </button>
      </footer>
    </div>
  );
}

export default CurrentNotifications;
