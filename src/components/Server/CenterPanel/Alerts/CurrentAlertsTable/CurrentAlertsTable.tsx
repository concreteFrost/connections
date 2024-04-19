import { useEffect, useState } from "react";
import s from "./CurrentAlertsTable.module.scss";
import { useNavigate } from "react-router";
import { getAlertsApi, alertMarkAsReadApi, alertRemoveApi } from "../../../../../api/ehd";
import { IAlert } from "../../../../../store/interfaces/IAlerts";
import useStore from "../../../../../store/store";

function CurrentAlertsTable() {

  const navigate = useNavigate();

  const [alerts, setAlerts] = useState<Array<IAlert>>();
  const {setModalMessage,toggleMessageModal} =useStore((state)=>state.modalWindowsSlice);

  useEffect(() => {
    getAlertsApi(true).then((res: any) => {
      setAlerts(res.data);
    })
  },[])

  async function removeAlertFromCache() {
   
    caches.keys().then(cacheNames=>{
      return Promise.all(cacheNames.map((cache)=>{
          if(cache === "alert"){
            // return caches.delete(cache)
          }
      }))
    })
}

  async function handleMarkAsRead(alertId : number){
    console.log('alert id :', alertId)
    try {
      const res : any = await alertMarkAsReadApi(alertId)
      console.log('result of reading alert',res.data)

      if(!res.data.success){
        toggleMessageModal()
        setModalMessage(res.data.message)
      }
    } catch (error) {
      console.log('error reading the alert',error);
    }
  }

  async function handleAlertDelete(alertId : number){
    console.log('alert id :', alertId)
    try {
      const res : any = await alertRemoveApi(alertId)
      console.log('result of reading alert',res.data)
    } catch (error) {
      console.log('error reading the alert',error);
    }
  }

  return (
    <section className={s.wrapper}>
      <h3>Current Alerts</h3>
      <header><button className={s.configure_btn} onClick={() => navigate('configure')}>CONFIGURE</button></header>
      <main>
        <table>
          <thead>
            <tr>
              <th colSpan={4}>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts && alerts?.length > 0 ? alerts?.map((element: IAlert) => <tr key={alerts.indexOf(element)}>
              <td colSpan={4}>{element.messageText}</td>
              <td><div className={s.actions_btn_wrapper}>
                <button className={s.read_btn} onClick={()=>handleMarkAsRead(element.alertId)}>READ</button>
                <button className={s.delete_btn} onClick={()=>handleAlertDelete(element.alertId)}>DELETE</button></div></td>
            </tr>) :
              <tr>
                <td colSpan={4}>-</td>
                
                <td></td>
              </tr>
            }
          </tbody>
        </table>
      </main>
    </section>
  );
}

export default CurrentAlertsTable;
