import s from "./NotificationEditor.module.scss";

function NotificationEditor() {
  return (
    <div className={s.wrapper}>
      <ul>
        <li className={s.list_item}>
          <div className={s.list_item_title}>Name:</div>
          <div className={s.list_item_value}>GFlow5 Queue Alert</div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>Description:</div>
          <div className={s.list_item_value}>
            GFlow5 Input3 unprocessed file drop queue monitor
          </div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>Type:</div>
          <div className={s.list_item_value}>FlowQueueCount</div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>Media:</div>
          <div className={s.list_item_value}>
            <label>Dashboard:</label>
            <input type="checkbox" />
            <label>Email:</label>
            <input type="checkbox" />
            <label>Sms:</label>
            <input type="checkbox" />
          </div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>User/Group:</div>
          <div className={s.list_item_value}>MonitorGrp</div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>Active:</div>
          <div className={s.list_item_value}> <input type="checkbox" /></div>
        </li>
      </ul>

      <div className={s.message_wrapper}>
        <header className={s.message_header}>Message:</header>
        <div className={s.message_body}>
        Queue size for flowName has reached or exceeded targetLevel at alertTime 
        </div>
      </div>

      <footer className={s.editor_footer}>
          <button>Update</button>
          <button>Close</button>
          <button className={s.delete_notification_btn}>Delete</button>
      </footer>
    </div>
  );
}

export default NotificationEditor;
