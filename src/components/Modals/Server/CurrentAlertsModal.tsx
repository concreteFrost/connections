import s from "../ModalWindow.module.scss";
import useStore from "store/store";
import { useEffect, useState } from "react";
import { getAlertsApi } from "api/ehd";
import { useNavigate } from "react-router";

function CurrentAlertsModal() {
  const { unreadAlerts, setUnreadAlerts } = useStore(
    (state) => state.alertSlice
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleGetAlerts() {
    try {
      const res: any = await getAlertsApi(true);

      if (res.data.length > 0) {
        setUnreadAlerts(res.data);
        setIsVisible(true);
      }
    } catch (error) {
      console.log("error getting alerts");
    }
  }

  useEffect(() => {
    handleGetAlerts();
  }, []);

  return (
    <>
      {isVisible ? (
        <div className={s.container}>
          <div className={s.modal_window}>
            <header className={s.modal_header}>
              <span className={s.close_btn_wrapper}>
                <button onClick={() => setIsVisible(false)}>x</button>
              </span>
            </header>
            <main className={s.modal_body}>
              You have {unreadAlerts.length} unreaded alerts
            </main>
            <footer className={s.modal_footer}>
              <div className={s.buttons_wrapper}>
                <button
                  onClick={() => {
                    setIsVisible(false);
                    navigate("/dashboard/server/alerts/");
                  }}
                >
                  VIEW
                </button>
              </div>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CurrentAlertsModal;
