import Header from "./Header/Header";
import s from "./Notifications.module.scss";
import CurrentNotifications from "./CurrentNotifications/CurrentNotifications";
import NofificationEditor from "./NotificationEditor/NotificationEditor";
import AddNotificationForm from "./AddNotificationForm/AddNotificationForm";
import useStore from "../../store/store";
import ConfirmationModal from "../Modals/ConfirmationModal";

function Nofifications() {

  const currentNote = useStore((state) => state.notificationSlice.currentNotification)

  return (
    <div className={s.wrapper}>
      <Header></Header>
      <AddNotificationForm></AddNotificationForm>
      <div className={s.content}>
        <CurrentNotifications></CurrentNotifications>
        {currentNote ? <NofificationEditor></NofificationEditor> : null}
      </div>
      <ConfirmationModal></ConfirmationModal>
    </div>
  );
}

export default Nofifications;
