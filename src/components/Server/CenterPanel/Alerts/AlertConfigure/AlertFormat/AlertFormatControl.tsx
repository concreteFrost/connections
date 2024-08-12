import AlertFormatTable from "./AlertFormatTable/AlertFormatTable";
import s from "./AlertFormat.module.scss";
import AddAlertFormatForm from "../AddAlertFormat/AddAlertFormatForm";
import { useEffect, useState } from "react";
import useStore from "store/store";
import { AlertFormat} from "store/interfaces/IAlerts";
import { getAlertFormatsApi } from "api/ehd";

function AlertFormatControl() {

  const [isAddAlertFormatVisible, setAddAlertFormatVisible] = useState<boolean>(false);
  const { getUserList, getGroupList, userList, groupList } = useStore((state) => state.securitySlice);
  // const { getAlertFormats } = useStore((state) => state.alertSlice);
  const [alertFormats, setAlertFormats] = useState<Array<AlertFormat>>([]);

  useEffect(() => {

    console.log('fetching data in alert format control')
    const fetchData = async () => {
      try {
        await getUserList();
        await getGroupList();
        const alertFormatsData : any = await getAlertFormatsApi();
        setAlertFormats(alertFormatsData.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [getUserList,getGroupList]); //remove this deps if will cause infinite loop


  return (<section className={s.wrapper}>
    <header><h3>Alert Format Control</h3></header>
    <div className={s.header_btn_wrapper}><button onClick={() => setAddAlertFormatVisible(true)}>ADD</button></div>

    {isAddAlertFormatVisible ? <AddAlertFormatForm setAlertFormatVisible={setAddAlertFormatVisible} userList={userList}
      groupList={groupList}
      alertFormats={alertFormats}
      setAlertFormats={setAlertFormats}></AddAlertFormatForm> : null}

    <AlertFormatTable
      alertFormats={alertFormats}
      groupList={groupList}
      userList={userList}
      setAlertFormats={setAlertFormats}
    ></AlertFormatTable>
  </section>)
}

export default AlertFormatControl;