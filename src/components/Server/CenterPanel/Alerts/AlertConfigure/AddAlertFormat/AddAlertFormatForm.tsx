import { useState } from "react";
import useStore from "../../../../../../store/store";
import { IFlowConfig } from "../../../../../../store/interfaces/Iflow";
import s from "./AddAlertFormatForm.module.scss"
import { IAlertFormat, INewAlertFormat } from "../../../../../../store/interfaces/IAlerts";
import moment from "moment";
import { IGroup, IUser } from "../../../../../../store/interfaces/ISecurity";

const initialAlertFormat: INewAlertFormat = {
  name: "New Alert Format",
  description: "",
  notifyByValue: 1,
  isActive: false,
  userOrGroupId: "",

};

interface AlertFormatProps {
  setAlertFormatVisible: (isVisible: boolean) => void;
  userList: IUser[],
  groupList: IGroup[],
  alertFormats: IAlertFormat[],
  setAlertFormats: (alertFormats: IAlertFormat[]) => void;
}


function AddAlertFormatForm(props: AlertFormatProps) {
  const { addAlertFormat } = useStore((state) => state.alertSlice);
  const [newAlertFormat, setNewAlertFormat] = useState<INewAlertFormat>(initialAlertFormat);
  const { setModalMessage, toggleMessageModal } = useStore((state) => state.modalWindowsSlice);


  const editNewAlertValues = (key: keyof INewAlertFormat, value: any) => {
    setNewAlertFormat(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  async function handleAddAlertFormat() {
    try {
      const res: any = await addAlertFormat(newAlertFormat);
      
      if (res.data.success === false) {
        setModalMessage(res.data.message);
        toggleMessageModal();
        return;
      }

      const data : IAlertFormat = res.data;

      setModalMessage("success!!!");
      toggleMessageModal();
      props.setAlertFormatVisible(false);
      props.setAlertFormats([...props.alertFormats, data])

    } catch (error) {
      setModalMessage("error while adding new alert format");
      toggleMessageModal();
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
