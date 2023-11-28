import s from "./CurrentNotifications.module.scss";

function CurrentNotifications() {
  return (
    <div className={s.wrapper}>
      <header className={s.panel_header}>Notifications</header>
      <section className={s.actions_wrapper}>
        <header className={s.actions_header}>Select All</header>
        <input type="checkbox" />
      </section>
      <ul>
        <li>
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
        </li>
      </ul>

      <footer className={s.panel_footer}>
        <button>DELETE SELECTED</button>
      </footer>
    </div>
  );
}

export default CurrentNotifications;
