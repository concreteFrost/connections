import Header from "./Header/Header";
import s from "./Notifications.module.scss";
import CurrentNotifications from "./CurrentNotifications/CurrentNotifications";
import NofificationEditor from "./NotificationEditor/NotificationEditor";
import AddNotificationForm from "./AddNotificationForm/AddNotificationForm";
import useStore from "../../store/store";
import { useEffect } from "react";

function Nofifications() {
  const currentNote = useStore(
    (state) => state.notificationSlice.currentNotification
  );
  const { testClientCallback } = useStore((state) => state.notificationSlice);

  async function testCallback() {
    try {
      const res: any = await testClientCallback(
        "https://smee.io/r1YmYlXurF6r5uWv",
        "iliaM",
        "cre4min9Tuff",
        "sample text 22"
      );
      console.log(res);
    } catch (e) {
      console.log("error testing callback", e);
    }
  }

  useEffect(() => {
    // testCallback()
  });

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
