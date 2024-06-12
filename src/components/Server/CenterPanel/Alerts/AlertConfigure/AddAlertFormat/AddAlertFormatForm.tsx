import { useState } from "react";
import useStore from "store/store";
import s from "./AddAlertFormatForm.module.scss"
import { AlertFormat, NewAlertFormat } from "store/interfaces/IAlerts";
import { Group, User } from "store/interfaces/ISecurity";

const initialAlertFormat: NewAlertFormat = {
  name: "New Alert Format",
  description: "",
  notifyByValue: 1,
  isActive: false,
  userOrGroupId: "",

};

interface AlertFormatProps {
  setAlertFormatVisible: (isVisible: boolean) => void;
  userList: User[],
  groupList: Group[],
  alertFormats: AlertFormat[],
  setAlertFormats: (alertFormats: AlertFormat[]) => void;
}


function AddAlertFormatForm(props: AlertFormatProps) {
  const { addAlertFormat } = useStore((state) => state.alertSlice);
  const [newAlertFormat, setNewAlertFormat] = useState<NewAlertFormat>(initialAlertFormat);
  const {toggleMessageModal } = useStore((state) => state.modalWindowsSlice);


  const editNewAlertValues = (key: keyof NewAlertFormat, value: any) => {
    setNewAlertFormat(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  async function handleAddAlertFormat() {
    try {
      const res: any = await addAlertFormat(newAlertFormat);
      
      if (res.data.success === false) {
        
        toggleMessageModal(res.data.message);
        return;
      }

      const data : AlertFormat = res.data;

      toggleMessageModal("success!!!");

      props.setAlertFormatVisible(false);
      props.setAlertFormats([...props.alertFormats, data])

    } catch (error) {
      toggleMessageModal("error while adding new alert format");
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleAddAlertFormat();
  };

  return (
    <div className={s.wrapper}>
      <div className={s.modal_window}>
        <div className={s.modal_header}><header>ADD DIRECTIVE</header>
          <span className={s.close_modal}><button type="button" onClick={() => props.setAlertFormatVisible(false)}>x</button></span>
        </div>

        <div className={s.modal_body}>
          <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.alert_format}>
              <div className={s.alert_format_item}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={newAlertFormat.name}
                  onChange={(e) => editNewAlertValues("name", e.target.value)}
                />
              </div>
              <div className={s.alert_format_item}>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={newAlertFormat.description}
                  onChange={(e) => editNewAlertValues("description", e.target.value)}
                />
              </div>
              <div className={s.alert_format_item}>
                <label htmlFor="notifyByValue">Notify By Value:</label>
                <input
                  type="number"
                  id="notifyByValue"
                  value={newAlertFormat.notifyByValue}
                  onChange={(e) => editNewAlertValues("notifyByValue", e.target.value)}
                />
              </div>
              <div className={s.alert_format_item}>
                <label htmlFor="userOrGroupId">User or Group ID:</label>
                <select
                  value={newAlertFormat.userOrGroupId}
                  onChange={(e) => editNewAlertValues("userOrGroupId", e.target.value)}
                >
                  <optgroup label="Users">
                    {props.userList.map(user => (
                      <option key={user.userId} value={user.userId}>{user.userName}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Groups">
                    {props.groupList.map(group => (
                      <option key={group.groupId} value={group.groupId}>{group.name}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>
            <div className={s.action_btns_wrapper}>
              <button type="submit">SAVE</button>
            </div>
          </form>
        </div>

      </div>
    </div>

  );
}

export default AddAlertFormatForm;
