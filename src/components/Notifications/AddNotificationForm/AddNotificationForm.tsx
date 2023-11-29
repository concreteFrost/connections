import { getNotificationTypesAPI, newNotificationAPI } from "../../../api/notification";
import s from "./AddNotificationForm.module.scss";
import { useState, useEffect } from "react";
import { INotification, INotificationType } from "../../../store/interfaces/INotification";
import { v4 as uuid } from "uuid"
import useStore from "../../../store/store";
function AddNotificationForm() {
  const [isFormActive, setIsFormActive] = useState<boolean>(false);
  const getNotificationList = useStore((state) => state.notificationSlice.getNotificationsList)

  const [formElements, setFormElements] = useState<INotification>({
    notificationId: uuid(),
    name: '',
    description: '',
    userMessage: '',
    notificationTypeId: '',
    userOrGroupId: '6bfd9258-0c22-4515-a605-aefad52858a2',
    notifyDashboard: false,
    notifyByEmail: false,
    notifyBySMS: false,
    active: false
  })

  const [notificationTypes, setNotificationType] = useState<Array<INotificationType>>([]);

  async function fetchNotificationTypes() {
    await getNotificationTypesAPI().then((res: any) => {
      setNotificationType(res.data);
      setFormElements({ ...formElements, notificationTypeId: res.data[0].notificationTypeId })
    }).catch((e) => {
      console.log(e)
    })
  }

  useEffect(() => {
    fetchNotificationTypes();
  }, [])

  function submitForm(e: any) {
    e.preventDefault()
    newNotificationAPI(formElements).then((res: any) => {
      console.log('new notification success', res);
      getNotificationList()
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
              <input type="text" value={formElements.name} onChange={(e) => setFormElements({ ...formElements, name: e.target.value })} />
            </section>

            <section>
              <label>Description:</label>
              <textarea value={formElements.description} onChange={(e) => setFormElements({ ...formElements, description: e.target.value })}></textarea>
            </section>

            <section>
              <label>Message:</label>
              <textarea value={formElements.userMessage} onChange={(e) => setFormElements({ ...formElements, userMessage: e.target.value })} ></textarea>
            </section>
          </div>

          <div className={s.second_column}>
            <section>
              <label>Type:</label>
              <select value={formElements.notificationTypeId} onChange={(e) => setFormElements({ ...formElements, notificationTypeId: e.target.value })}>
                {notificationTypes.length > 0 ? notificationTypes.map((notification: INotificationType) =>
                  <option value={notification.notificationTypeId} key={notification.notificationTypeId}>{notification.name}</option>) : null}
              </select>
            </section>

            <section>
              <label>User/Group:</label>
              {/* <select value={formElements.userOrGroupId} onChange={(e) => setFormElements({ ...formElements, userOrGroupId: e.target.value })}>
                <option value="1">1</option>
                <option value="2">2</option>
              </select> */}
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
