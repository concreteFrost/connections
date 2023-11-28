import s from "./AlertEditor.module.scss";

function AlertEditor() {
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

        <li className={s.list_item}>
          <div className={s.list_item_title}>Amber1:</div>
          <div className={s.list_item_value}>3</div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>Amber2:</div>
          <div className={s.list_item_value}></div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>Amber3:</div>
          <div className={s.list_item_value}></div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>Amber4:</div>
          <div className={s.list_item_value}></div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>Amber5:</div>
          <div className={s.list_item_value}>5</div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>Red1 :</div>
          <div className={s.list_item_value}>10</div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>Red2 :</div>
          <div className={s.list_item_value}></div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>Red3 :</div>
          <div className={s.list_item_value}>20</div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>Red4 :</div>
          <div className={s.list_item_value}></div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>Red5 :</div>
          <div className={s.list_item_value}>30</div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>MaxAlerts:</div>
          <div className={s.list_item_value}>5</div>
        </li>

        <li className={s.list_item}>
          <div className={s.list_item_title}>PerInterval:</div>
          <div className={s.list_item_value}>1 H</div>
        </li>
      </ul>

      <div className={s.message_wrapper}>
        <header className={s.message_header}>Message:</header>
        <div className={s.message_body}>
        Queue size for flowName has reached or exceeded targetLevel at alertTime 
        </div>
      </div>
    </div>
  );
}

export default AlertEditor;
