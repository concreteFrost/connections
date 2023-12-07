import { getNotificationTypesAPI, newNotificationAPI } from "../../../api/notification";
import s from "./AddNotificationForm.module.scss";
import { useState, useEffect } from "react";
import { INotification, INotificationType } from "../../../store/interfaces/INotification";
import { v4 as uuid } from "uuid"
import useStore from "../../../store/store";
import { IGroup, IUser } from "../../../store/interfaces/ISecurity";
import MessageModal from "../../Modals/MessageModal";


const defaultFormState = {
  notificationId: uuid(),
  name: '',
  description: '',
  userMessage: '',
  notificationTypeId: '',
  userOrGroupId: '',
  notifyDashboard: false,
  notifyByEmail: false,
  notifyBySMS: false,
  active: false
}

function AddNotificationForm() {

  const { notificationsTypes, getNotificationsList, getNotificationsTypes } = useStore((state) => state.notificationSlice)
  const { userList, groupList, getUserList, getGroupList } = useStore((state) => state.securitySlice);
  const modalSlice = useStore((state) => state.modalWindowsSlice);

  const [isFormActive, setIsFormActive] = useState<boolean>(false);
  const [formElements, setFormElements] = useState<INotification>(defaultFormState)


  async function fetchData() {
    try {
      await getNotificationsTypes();
      await getUserList();
      await getGroupList();
    }
    catch (e) {
      console.log('error fetching data', e)
    }

  }

  useEffect(() => {
    fetchData()
    //insert api here
  }, [isFormActive])

  function submitForm(e: any) {
    e.preventDefault()

    newNotificationAPI(formElements).then((res: any) => {
      if (res.data.success) {
        setFormElements(defaultFormState)
        getNotificationsList()
      }
      modalSlice.toggleMessageModal()
      modalSlice.setModalMessage(res.data.message.length > 0 ? res.data.message : 'success!!!')

    }).catch((e) => {
      console.log('new notification error', e)
    })
  }

  const formWrapperClasses = `${s.form_wrapper} ${isFormActive ? s["opened"] : s["closed"]}`;

  return (
    <div className={s.wrapper}>
      <div className={s.toggle_btn_wrapper}>
        {!isFormActive ? (
          <button onClick={() => setIsFormActive(true)}>
            NEW NOTIFICATION
          </button>
        ) : (
          <button onClick={() => setIsFormActive(false)}>CLOSE</button>
        )}
      </div>

      <div className={formWrapperClasses}>
        <header>ADD NEW NOTIFICATION</header>
        {/*FORM */}

        <form className={s.new_notification_form} onSubmit={submitForm}>
          <div className={s.first_column}>
            <section>
              <label>Name:</label>
              <input type="text" value={formElements.name} onChange={(e) => setFormElements({ ...formElements, name: e.target.value })} required />
            </section>

            <section>
              <label>Description:</label>
              <textarea value={formElements.description} onChange={(e) => setFormElements({ ...formElements, description: e.target.value })} required></textarea>
            </section>

            <section>
              <label>Message:</label>
              <textarea value={formElements.userMessage} onChange={(e) => setFormElements({ ...formElements, userMessage: e.target.value })} required ></textarea>
            </section>
          </div>

          <div className={s.second_column}>
            <section>
              <label>Type:</label>
              <select
                value={formElements.notificationTypeId}
                onChange={(e) => setFormElements({ ...formElements, notificationTypeId: e.target.value })}
              >
                <option value={-1}>Select Type</option>
                {notificationsTypes.length > 0 ? notificationsTypes.map((notification: INotificationType) =>
                  <option value={notification.notificationTypeId} key={notification.notificationTypeId}>{notification.name}</option>) : null}
              </select>
            </section>

            <section>
              <label>User/Group:</label>
              <select
                value={formElements.userOrGroupId}
                onChange={(e) => setFormElements({ ...formElements, userOrGroupId: e.target.value })}
              >
                <option value={-1}>Select User/Group</option>
                <optgroup label="USERS">
                  {userList.length > 0 ? userList.map((user: IUser) =>
                    <option key={user.userId} value={user.userId}>{user.userName}</option>) : null}
                </optgroup>
                <optgroup label="GROUPS">
                  {groupList.length > 0 ? groupList.map((group: IGroup) =>
                    <option key={group.groupId} value={group.groupId}>{group.name}</option>) : null}
                </optgroup>
              </select>
            </section>

            <section>
              <label>Media:</label>
              <div>
                <label>Dashboard</label>
                <input type="checkbox" checked={formElements.notifyDashboard}
                  onChange={(e: any) => {
                    setFormElements({ ...formElements, notifyDashboard: !formElements.notifyDashboard })
                  }} />
                <label>Email</label>
                <input type="checkbox" checked={formElements.notifyByEmail}
                  onChange={(e: any) => {
                    setFormElements({ ...formElements, notifyByEmail: !formElements.notifyByEmail })
                  }} />
                <label>Sms</label>
                <input type="checkbox" checked={formElements.notifyBySMS}
                  onChange={(e: any) => {
                    setFormElements({ ...formElements, notifyBySMS: !formElements.notifyBySMS })
                  }} />
              </div>
            </section>
          </div>

          <div className={s.double_row}>
            <section>
              <label>Is Active:</label>
              <input type="checkbox" checked={formElements.active}
                onChange={(e: any) => {
                  setFormElements({ ...formElements, active: !formElements.active })
                }} />
            </section>
            <section>
              <button>ADD</button>
            </section>
          </div>
        </form>
      </div>

    </div>
  );
}

export default AddNotificationForm;
