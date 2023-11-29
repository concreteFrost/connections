import { useEffect } from "react";
import s from "./CurrentNotifications.module.scss";
import useStore from "../../../store/store";
import { INotification } from "../../../store/interfaces/INotification";

function CurrentNotifications() {

  const notificationsList = useStore((state) => state.notificationSlice.notificationsList);
  const getNotificationsList = useStore((state) => state.notificationSlice.getNotificationsList);
  useEffect(() => {
    getNotificationsList()
    console.log(notificationsList, 'notificationList')
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
          <li key={notification.notificationId}>{notification.name}</li>) : null}
      </ul>

      <footer className={s.panel_footer}>
        <button>DELETE SELECTED</button>
      </footer>
    </div>
  );
}

export default CurrentNotifications;

{/* <li>
<div>Flow2 Started</div>
<div className={s.notification_actions}>
  <button className={s.edit_btn}>EDIT</button>
  <button className={s.delete_btn}>X</button>
  <input type="checkbox" />
</div>
</li>
<li>
<div>Flow2 Stopped</div>
<div className={s.notification_actions}>
  <button className={s.edit_btn}>EDIT</button>
  <button className={s.delete_btn}>X</button>
  <input type="checkbox" />
</div>
</li>
<li>
<div>Server Started</div>
<div className={s.notification_actions}>
  <button className={s.edit_btn}>EDIT</button>
  <button className={s.delete_btn}>X</button>
  <input type="checkbox" />
</div>
</li> */}