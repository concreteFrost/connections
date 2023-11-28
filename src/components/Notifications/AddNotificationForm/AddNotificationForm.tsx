import s from "./AddNotificationForm.module.scss";
import { useState } from "react";

function AddNotificationForm() {
  const [isFormActive, setIsFormActive] = useState<boolean>(false);
  const formWrapperClasses = `${s.form_wrapper} ${
    isFormActive ? s["opened"] : s["closed"]
  }`;

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
        <form className={s.new_notification_form}>
          <div className={s.first_column}>
            <section>
              <label>Name:</label>
              <input type="text" />
            </section>

            <section>
              <label>Description:</label>
              <textarea></textarea>
            </section>

            <section>
              <label>Message:</label>
              <textarea></textarea>
            </section>
          </div>

          <div className={s.second_column}>
            <section>
              <label>Type:</label>
              <select>
                <option value="1">1</option>
              </select>
            </section>

            <section>
              <label>User/Group:</label>
              <select>
                <option value="1">1</option>
              </select>
            </section>

            <section>
              <label>Media:</label>
              <div>
                <label>Dashboard</label>
                <input type="checkbox" />
                <label>Email</label>
                <input type="checkbox" />
                <label>Sms</label>
                <input type="checkbox" />
              </div>
            </section>
          </div>

          <div className={s.double_row}>
            <section>
              <label>Is Active:</label>
              <input type="checkbox" />
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
