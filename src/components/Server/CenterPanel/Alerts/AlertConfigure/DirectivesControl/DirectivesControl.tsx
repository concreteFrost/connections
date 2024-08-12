import { useState, useEffect } from "react";
import AddDirectiveForm from "./AddDirectiveForm/AddDirectiveForm";
import DirectivesTable from "./DirectivesTable/DirectivesTable";
import useStore from "store/store";
import { Directive } from "store/interfaces/IAlerts";
import { FlowConfig } from "store/interfaces/Iflow";
import { getFlowListApi } from "../../../../../../api/flow";
import s from "./DirectivesControl.module.scss"
import { getDirectivesApi } from "api/ehd";

function DirectivesControl() {
  const [isAddDirectiveVisible, setAddDirectiveVisible] = useState<boolean>(false);
  // const { getDirectives } = useStore((state) => state.alertSlice);
  const [directives, setDirectives] = useState<Array<Directive>>([]);
  const [flowList, setFlowList] = useState<Array<FlowConfig>>([])

  async function fetchFlowList() {
    try {
      const res: any = await getFlowListApi();
      setFlowList(res.data);
    } catch (e) {
      console.log("error fetching flows", e);
    }
  }

  async function fetchDirectives() {
    try {
      const res: any = await getDirectivesApi();
      
      setDirectives(res.data);
      return res;
    } catch (e) {
      console.log('error getting directives');
    }
  }

  useEffect(() => {
    fetchFlowList();
    fetchDirectives();
  }, []);

  return (
    <section className={s.wrapper}>
      <header><h3>Directives Control</h3></header>
      <div className={s.header_btn_wrapper}><button onClick={() => setAddDirectiveVisible(true)}>ADD</button></div>
      {isAddDirectiveVisible ? <AddDirectiveForm
      directives={directives}
        flowList={flowList}
        setDirectives={setDirectives}
        setAddDirectiveFormVisible={setAddDirectiveVisible}></AddDirectiveForm> : null}
      <DirectivesTable
      fetchDirectives={fetchDirectives}
        setDirectives={setDirectives}
        directives={directives}
        flowList={flowList}
      ></DirectivesTable>
    </section>)
}

export default DirectivesControl;