import useStore from "../../../../../../store/store";
import { useEffect, useState } from "react";
import s from "./DirectivesTable.module.scss"
import { IDirective, IDirectiveConfig } from "../../../../../../store/interfaces/IAlerts";
import { getFlowListApi } from "../../../../../../api/flow";
import { IFlowConfig } from "../../../../../../store/interfaces/Iflow";

function DirectivesTable(){
    const { getDirectives, updateDirective,deleteDirective } = useStore((state) => state.alertSlice);
    const [directives, setDirectives] = useState<Array<IDirective>>();
    const [originalDirectives, setOriginalDirectives] = useState<Array<IDirective>>();
    const [currentDirectiveIndex, setCurrentDirectiveIndex] = useState<Number>(-1);
    const { setModalMessage, toggleMessageModal } = useStore((state) => state.modalWindowsSlice);
    const [flowList, setFlowList] = useState<Array<IFlowConfig>>()
  
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
        //setting temp directive to hold original state for editable directive
        //it will revert to previous state if save operation was caneled or was unsuccessfull
        setOriginalDirectives(res);
      } catch (e) {
        console.log('error getting directives');
      }
    }
  
    useEffect(() => {
      fetchFlowList();
      fetchDirectives();
    }, []);
  
    function editDirective(id: number, key: keyof IDirective, value: any) {
      if (!directives) return;
  
      const updatedDirectives = directives.map((directive: IDirective, index: number) =>
        index === id ? { ...directive, [key]: value } : directive
      );
      setDirectives(updatedDirectives);
    }
  
    function editDirectiveConfig(directiveIndex: number, configIndex: number, key: keyof IDirectiveConfig, value: any) {
      if (!directives) return;
  
      const updatedDirectives = [...directives];
      const updatedConfig = { ...updatedDirectives[directiveIndex].directives[configIndex], [key]: value };
      updatedDirectives[directiveIndex].directives[configIndex] = updatedConfig;
      setDirectives(updatedDirectives);
    }
  
  
    function checkCurrentDirectives(index: Number) {
      if (currentDirectiveIndex !== index) {
        setCurrentDirectiveIndex(index);
        setDirectives(originalDirectives);
      }
    }
  
    async function handleDirectiveUpdate(directive: IDirective) {
      try {
        const res: any = await updateDirective(directive);
        setModalMessage(res.data.success ? 'sucess!!!' : res.data.message)
        toggleMessageModal()
        await fetchDirectives()
      }
      catch (e) {
        console.log('error updating directive', e);
      }
    }
  
    async function handleDirectiveDelete(ehControlId:number){
      try {
        const res :any = await deleteDirective(ehControlId);
        setModalMessage(res.data.success ? 'sucess!!!' : res.data.message)
        toggleMessageModal()
        await fetchDirectives();
      } catch (error) {
        console.log('error deleting directive',error);
      }
    }
    return(<section className={s.wrapper}>
         <h3>Directives Control</h3>
      <main>
        <table className={s.table}>
          <thead>
            <tr>
              <th colSpan={3}>Directive</th>
              <th colSpan={3}>Directives</th>
              <th colSpan={1}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {directives && directives.map((directive: IDirective, index: any) => (
              <tr key={index}>
                <td colSpan={3} onFocus={() => { checkCurrentDirectives(index) }} className={s.directive}>
                  <div className={s.directive_item}><label >name:</label>
                    <input
                      type="text"
                      value={directive.name}
                      onChange={(e: any) => editDirective(index, "name", e.target.value)}
                    /></div>
                  <div className={s.directive_item}><label>description:</label>
                    <input type="text"
                      value={directive.description}
                      onChange={(e: any) => editDirective(index, "description", e.target.value)}
                    /></div>
                  <div className={s.directive_item}><label>eh control id:</label>
                    <input type="number"
                      value={directive.ehControlId}
                      onChange={(e: any) => editDirective(index, "ehControlId", e.target.value)}
                    /></div>
                  <div className={s.directive_item}><label>category:</label>
                    <input type="number"
                      value={directive.category}
                      onChange={(e: any) => editDirective(index, "category", e.target.value)}
                    /></div>
                  <div className={s.directive_item}><label>date created:</label>
                    <input type="datetime-local"
                      value={directive.dateCreated}
                      onChange={(e: any) => editDirective(index, "dateCreated", e.target.value)}
                    /></div>
                  <div className={s.directive_item}><label>last amended:</label>
                    <input type="datetime-local"
                      value={directive.lastAmended}
                      onChange={(e: any) => editDirective(index, "lastAmended", e.target.value)}
                    /></div>
                </td>
                <td colSpan={3} onFocus={() => { checkCurrentDirectives(index) }}>
                  <ul>
                    {directive.directives.length > 0 ? directive.directives.map((config: IDirectiveConfig, config_index: number) => (
                      <li key={config_index}>
                        <header>CONFIG: {config_index}</header>
                        <div className={s.directive_item}>
                          <label htmlFor={`startFlow-${config_index}`} className={s.label}>Start Flow:</label>
                          <select id={`startFlow-${config_index}`} value={config.startFlow ? config.startFlow : 0} onChange={(e) => editDirectiveConfig(index, config_index, "startFlow", e.target.value)} >
                            <option value={0}>null</option>
                            {flowList && flowList.length > 0 ?
                              flowList.map((flow: IFlowConfig, index: number) => <option key={index} value={flow.flowId}>{flow.name}</option>) : <option>No Flows Available</option>}
                          </select>
                        </div>
                        <div className={s.directive_item}>
                          <label htmlFor={`stopFlow-${config_index}`} className={s.label}>Stop Flow:</label>
                          <input type="number" id={`stopFlow-${config_index}`} value={config.stopFlow} onChange={(e) => editDirectiveConfig(index, config_index, "stopFlow", e.target.value)} />
                        </div>
                        <div className={s.directive_item}>
                          <label htmlFor={`optionId-${config_index}`} className={s.label}>Option ID:</label>
                          <input type="text" id={`optionId-${config_index}`} value={config.optionId} onChange={(e) => editDirectiveConfig(index, config_index, "optionId", e.target.value)} />
                        </div>
                        <div className={s.directive_item}>
                          <label htmlFor={`inputValue-${config_index}`} className={s.label}>Input Value:</label>
                          <input type="number" id={`inputValue-${config_index}`} value={config.inputValue ?? ''} onChange={(e) => editDirectiveConfig(index, config_index, "inputValue", e.target.value)} />
                        </div>
                        <div className={s.directive_item}>
                          <label htmlFor={`alertFormatId-${config_index}`} className={s.label}>Alert Format ID:</label>
                          <input type="text" id={`alertFormatId-${config_index}`} value={config.alertFormatId ?? ''} onChange={(e) => editDirectiveConfig(index, config_index, "alertFormatId", e.target.value)} />
                        </div>
                        <div className={s.directive_item}>
                          <label htmlFor={`runScript-${config_index}`} className={s.label}>Run Script:</label>
                          <input type="text" id={`runScript-${config_index}`} value={config.runScript ?? ''} onChange={(e) => editDirectiveConfig(index, config_index, "runScript", e.target.value)} />
                        </div>
                        <div className={s.directive_item}>
                          <label htmlFor={`preventProcessing-${config_index}`} className={s.label}>Prevent Processing:</label>
                          <input type="checkBox" id={`preventProcessing-${config_index}`} checked={config.preventProcessing} onChange={(e) => editDirectiveConfig(index, config_index, "preventProcessing", !config)} />
                        </div>
                        <div className={s.directive_item}>
                          <label htmlFor={`addToCounter-${config_index}`} className={s.label}>Add To Counter:</label>
                          <input type="checkBox" id={`addToCounter-${config_index}`} checked={config.addToCounter} onChange={(e) => editDirectiveConfig(index, config_index, "addToCounter", !config.addToCounter)} />
                        </div>
                        <div className={s.directive_item}>
                          <label htmlFor={`clearCounter-${config_index}`} className={s.label}>Clear Counter:</label>
                          <input type="checkBox" id={`clearCounter-${config_index}`} checked={config.clearCounter} onChange={(e) => editDirectiveConfig(index, config_index, "clearCounter", !config.clearCounter)} />
                        </div>
                      </li>
                    )) : <div className={s.empty_directives}>No directives available</div>}
                  </ul>
                </td>
                <td colSpan={1}>
                  <div className={s.action_btns_wrapper}>
                    {/*Save button is only visible on the component that is currently editing */}
                    {currentDirectiveIndex === index ? (
                      <button onClick={() => handleDirectiveUpdate(directive)}>Save</button>
                    ) : null}
                    <button onClick={()=>handleDirectiveDelete(directive.ehControlId)}>DELETE</button></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </section>)
}

export default DirectivesTable;