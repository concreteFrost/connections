import Header from "../components/Notifications/Header/Header";
import s from "./style/Notifications.module.scss";
import CurrentNotifications from "../components/Notifications/CurrentNotifications/CurrentNotifications";
import NofificationEditor from "../components/Notifications/NotificationEditor/NotificationEditor";
import AddNotificationForm from "../components/Notifications/AddNotificationForm/AddNotificationForm";
import useStore from "../store/store";

function Nofifications() {
  const currentNote = useStore(
    (state) => state.notificationSlice.currentNotification
  )

  return (
    <div className={s.wrapper}>
      <Header></Header>
      <AddNotificationForm></AddNotificationForm>
      <div className={s.content}>
        <CurrentNotifications></CurrentNotifications>
        {currentNote ? <NofificationEditor></NofificationEditor> : null}
      </div>
    </div>
  );
}

export default Nofifications;
