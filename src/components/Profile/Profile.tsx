import { clearUserData } from "store/actions/storageActions";
import { useNavigate } from "react-router-dom";
import { connectionsIcons } from "assets/icons/icons";
import { useState, useRef } from "react";
import s from "./Profile.module.scss";
import { getMeAPI } from "api/security";
import EditUserModal from "../Modals/UserModals/EditUserModal/EditUserModal";
import useStore from "store/store";
import { IconVariants } from "store/enums/profile";
import useEscapeKeyHandler from "hooks/useEscapeKeyHandler";
import useOutsideMouseClick from "hooks/useOutsideMouseClick";
import { disableClientNotificationsAPI } from "api/notification";
import { disableClientFlowStatusAPI, disableClientMetricsApi } from "api/data";
import { disableClientAlertsApi } from "api/ehd";

interface ProfileProps {
  themeColor: IconVariants;
}

function Profile(props: ProfileProps) {
  const navigate = useNavigate();

  const [isProfileModalVisible, setProfileModalVisible] =
    useState<boolean>(false);
  const [isEditUserVisible, setEditUserVisible] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { userToEdit, getUser } = useStore((state) => state.securitySlice);

  async function getMe() {
    try {
      const res: any = await getMeAPI();
      await getUser(res.data.userRecord);
    } catch (e) {
      console.log("error getting me", e);
    }
  }

  async function logout() {
    // Clear user data and navigate to the login page
    try {
      await disableClientAlertsApi();
      await disableClientFlowStatusAPI();
      await disableClientNotificationsAPI();
      await disableClientMetricsApi();
    } catch (e) {
      console.log("access token is incorrect");
    } finally {
      await clearUserData();
      await navigate("/login");
    }
  }

  useOutsideMouseClick(modalRef, () => setProfileModalVisible(false));
  useEscapeKeyHandler(() => setProfileModalVisible(false));

  return (
    <div className={s.wrapper}>
      <span
        data-testid="profile-icon"
        style={{
          fontSize: "1.8rem",
          marginTop: "2px",
        }}
        className={`${s.icon}  ${
          props.themeColor === IconVariants.Dark ? s["dark"] : s["light"]
        }`}
        onClick={() => {
          getMe();
          setProfileModalVisible(!isProfileModalVisible);
        }}
      >
        {connectionsIcons.profile}
      </span>

      {isProfileModalVisible ? (
        <div className={s.profile_wrapper} ref={modalRef}>
          {/*ACCOUNT INFO */}
          <section className={s.account_info_wrapper}>
            <header>ACCOUNT</header>
            <p
              className={s.edit_btn}
              onClick={() => {
                setEditUserVisible(true);
                setProfileModalVisible(false);
              }}
            >
              edit
            </p>
            <main>
              <div className={s.account_info_item}>
                <label htmlFor="userName">Name:</label>
                <p>{userToEdit?.userName}</p>
              </div>
              <div className={s.account_info_item}>
                <label htmlFor="userLogin">Login:</label>
                <p>{userToEdit?.userLogin}</p>
              </div>
            </main>
          </section>
          {/*LOGOUT WRAPPER */}
          <section className={s.btn_wrapper}>
            <button onClick={logout}>Logout</button>
            <button
              className={s.close_btn}
              onClick={() => {
                setProfileModalVisible(false);
              }}
            >
              CLOSE
            </button>
          </section>
        </div>
      ) : null}
      <EditUserModal
        isVisible={isEditUserVisible}
        toggleEditUser={setEditUserVisible}
      ></EditUserModal>
    </div>
  );
}

export default Profile;
