import { useState,useEffect } from "react";
import AddDirectiveForm from "./AddDirectiveForm/AddDirectiveForm";
import DirectivesTable from "./DirectivesTable/DirectivesTable";
import useStore from "../../../../../../store/store";
import { IDirective } from "../../../../../../store/interfaces/IAlerts";
import { IFlowConfig } from "../../../../../../store/interfaces/Iflow";
import { getFlowListApi } from "../../../../../../api/flow";

function DirectivesControl() {
    const [isAddDirectiveVisible, setAddDirectiveVisible] = useState<boolean>(false);
    const { getDirectives} = useStore((state) => state.alertSlice);
    const [directives, setDirectives] = useState<Array<IDirective>>([]);
    const [flowList, setFlowList] = useState<Array<IFlowConfig>>([])
  
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
        const res: IDirective[] = await getDirectives();
        setDirectives(res);
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
        <>
            {isAddDirectiveVisible ? <AddDirectiveForm
            flowList={flowList}
            fetchDirectives={fetchDirectives}
            setAddDirectiveFormVisible={setAddDirectiveVisible}></AddDirectiveForm> : null}
            <DirectivesTable
             setAddDirectiveFormVisible={setAddDirectiveVisible}
             fetchDirectives={fetchDirectives}
             setDirectives={setDirectives}
             directives={directives}
             flowList={flowList}
             ></DirectivesTable>
        </>)
}

export default DirectivesControl;