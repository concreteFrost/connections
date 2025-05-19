import s from "./style/Login.module.scss";
import getToken from "../api/token";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../store/actions/storageActions";
import ConnectionsLogo from "../assets/connections_logo";
import CocoonLogo from "../assets/cocoon_logo";
import useStore from "../store/store";

function Login() {
  const [userName, setUserName] = useState<string>(
    localStorage.getItem("iCon_username") ?? "iliaM"
  );
  const { setAppUserPassword, appUserPassword } = useStore(
    (state) => state.securitySlice
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  async function checkSubscription() {
    try {
      if ("serviceWorker" in navigator) {
        await navigator.serviceWorker.register("/sw.js");
        // console.log('Service worker registered', sw)
        const registration = await navigator.serviceWorker.ready;
        // Check for existing subscription
        const existingSubscription =
          await registration.pushManager.getSubscription();

        if (existingSubscription) {
          console.log("subscription found");
          existingSubscription.unsubscribe();
        }
      }
    } catch (error) {
      console.error("Error registering service worker:", error);
    }
  }

  useEffect(() => {
    checkSubscription();
  }, []);

  async function submit(e: any) {
    e.preventDefault();
    if (appUserPassword && userName)
      try {
        const res: any = await getToken(userName, appUserPassword);

        await setAccessToken(res.data, userName);
        await navigate("/dashboard/server/servers");
      } catch (e) {
        handleSetErrorMessage("something went wrong...");
      }
  }

  function handleSetErrorMessage(msg: string) {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(""), 3000);
  }

  return (
    <div className={s.wrapper}>
      <div className={s.logo_wrapper}>
        <ConnectionsLogo></ConnectionsLogo>
      </div>

      <div className={s.form_wrapper}>
        <form onSubmit={submit}>
          <div>
            <label htmlFor="">username</label>
            <input
              type="text"
              value={userName}
              onChange={(e: any) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">password</label>
            <input
              type="password"
              value={appUserPassword}
              onChange={(e: any) => setAppUserPassword(e.target.value)}
            />
          </div>
          <div className={s.error_message}>{errorMessage}</div>
          <div className={s.btn_wrapper}>
            <button>LOGIN</button>
          </div>
        </form>
      </div>

      <div className={s.cocoon_logo_wrapper}>
        <CocoonLogo></CocoonLogo>
      </div>
    </div>
  );
}

export default Login;
