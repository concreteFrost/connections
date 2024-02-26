import useStore from "../../../../../../../store/store";
import { useState } from "react";
import s from "./DirectivesTable.module.scss"
import { IDirective, IDirectiveConfig } from "../../../../../../../store/interfaces/IAlerts";
import { IFlowConfig } from "../../../../../../../store/interfaces/Iflow";
import { connectionsIcons } from "../../../../../../../icons/icons";

interface DirectivesTableProps {
  setAddDirectiveFormVisible: (isVisible: boolean) => void;
  fetchDirectives:()=>void;
  setDirectives:(directives:Array<IDirective>)=>void;
  
  directives: Array<IDirective>;
  flowList: Array<IFlowConfig>;
  
}

const initialDirectiveConfig: IDirectiveConfig = {
  optionId: 1,
  inputValue: 0,
  alertFormatId: 1,
  preventProcessing: false,
  stopFlow: 0,
  startFlow: "",
  runScript: "",
  addToCounter: false,
  clearCounter: false
};

function DirectivesTable(props: DirectivesTableProps) {

  const { setModalMessage, toggleMessageModal, setConfirmationModalActions, toggleConfirmationModal } = useStore((state) => state.modalWindowsSlice);
  const { updateDirective, deleteDirective } = useStore((state) => state.alertSlice);
  const [currentDirectiveIndex, setCurrentDirectiveIndex] = useState<Number>(-1);

  async function handleDirectiveUpdate(directive: IDirective) {
    try {
      const res: any = await updateDirective(directive);
      setModalMessage(res.data.success ? 'sucess!!!' : res.data.message)
      toggleMessageModal()
      await props.fetchDirectives()
    }
    catch (e) {
      setModalMessage("Internal Server Error")
      toggleMessageModal()
    }
  }

  async function handleDirectiveDelete(ehControlId: number) {
    try {
      const res: any = await deleteDirective(ehControlId);
      setModalMessage(res.data.success ? 'sucess!!!' : res.data.message)
      toggleMessageModal()
      await props.fetchDirectives();
    } catch (error) {
      console.log('error deleting directive', error);
    }
  }

  function editDirective(id: number, key: keyof IDirective, value: any) {
    if (!props.directives) return;

    const updatedDirectives = props.directives.map((directive: IDirective, index: number) =>
      index === id ? { ...directive, [key]: value } : directive
    );
    props.setDirectives(updatedDirectives);
  }

  function editDirectiveConfig(directiveIndex: number, configIndex: number, key: keyof IDirectiveConfig, value: any) {
    if (!props.directives) return;

    const updatedDirectives = [...props.directives];
    const updatedConfig = { ...updatedDirectives[directiveIndex].directives[configIndex], [key]: value };
    updatedDirectives[directiveIndex].directives[configIndex] = updatedConfig;
    props.setDirectives(updatedDirectives);
  }

  function deleteDirectiveConfig(directiveIndex: number, configIndex: number) {
    if (!props.directives) return;

    const updatedDirectives = [...props.directives];

    if (props.directives[directiveIndex].directives.length > 1) {
      updatedDirectives[directiveIndex].directives.splice(configIndex, 1);
      props.setDirectives(updatedDirectives)
    }
    else {
      setModalMessage("Directive needs to have at least 1 configuration");
      toggleMessageModal()
    }
  }

  function addDirectiveConfig(directiveIndex: number) {
    if (!props.directives) return;

    const updatedDirectives = [...props.directives];
    updatedDirectives[directiveIndex].directives.push(initialDirectiveConfig);
    props.setDirectives(updatedDirectives);
  }

  //resets unsaved changes in edited directive
  function checkCurrentDirectives(index: Number) {
    if (currentDirectiveIndex !== index) {
      setCurrentDirectiveIndex(index);
    }
  }

  function showConfirmationOnDelete(ehControlId: number, directiveName: string) {
    setConfirmationModalActions(() => handleDirectiveDelete(ehControlId));
    toggleConfirmationModal(true, `Would you like to delete ${directiveName}?`);
  }

  return (<section className={s.wrapper}>
    <h3>Directives Control</h3>
    <main>
      <div className={s.add_new_directive}><button onClick={() => props.setAddDirectiveFormVisible(true)}>ADD</button></div>
      <table className={s.table}>
        <thead>
          <tr>
            <th colSpan={3}>Directive</th>
            <th colSpan={3}>Directives</th>
            <th colSpan={1}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.directives && props.directives.map((directive: IDirective, index: any) => (
            <tr key={index}>
              <td colSpan={3} onFocus={() => { checkCurrentDirectives(index) }} className={s.directive}>
                <div className={s.directive_item}><label >name:</label>
                  <input
                    type="text"
                    value={directive.name}
                    onChange={(e: any) => editDirective(index, "name", e.target.value)}
                  />
                  <span>{connectionsIcons.pen}</span>
                </div>
                <div className={s.directive_item}><label>description:</label>
                  <textarea
                    value={directive.description}
                    onChange={(e: any) => editDirective(index, "description", e.target.value)}
                  />
                </div>
                <div className={s.directive_item}><label>category:</label>
                  <input type="number"
                    value={directive.category}
                    readOnly
                  />
                </div>
                <div className={s.directive_item}><label>date created:</label>
                  <input type="datetime-local"
                    value={directive.dateCreated}
                    readOnly
                  /></div>
                <div className={s.directive_item}><label>last amended:</label>
                  <input type="datetime-local"
                    value={directive.lastAmended}
                    readOnly
                  /></div>
              </td>
              <td colSpan={3} onFocus={() => { checkCurrentDirectives(index) }}>
                <ul>
                  {directive.directives.length > 0 ? directive.directives.map((config: IDirectiveConfig, config_index: number) => (
                    <li key={config_index}>
                      <header>CONFIG: {config_index}</header>
                      <span className={s.delete_config_btn}><button onClick={() => deleteDirectiveConfig(index, config_index)}>x</button></span>
                      <div className={s.directive_item}>
                        <label htmlFor={`startFlow-${config_index}`} className={s.label}>Start Flow:</label>
                        <select id={`startFlow-${config_index}`} value={config.startFlow ? config.startFlow : 0} onChange={(e) => editDirectiveConfig(index, config_index, "startFlow", e.target.value)} >
                          <option value={0}>null</option>
                          {props.flowList && props.flowList.length > 0 ?
                            props.flowList.map((flow: IFlowConfig, index: number) => <option key={index} value={flow.flowId}>{flow.name}</option>) : <option>No Flows Available</option>}
                        </select>
                      </div>
                      <div className={s.directive_item}>
                        <label htmlFor={`stopFlow-${config_index}`} className={s.label}>Stop Flow:</label>
                        <input type="number" id={`stopFlow-${config_index}`} value={config.stopFlow} onChange={(e) => editDirectiveConfig(index, config_index, "stopFlow", e.target.value)} />
                        <span>{connectionsIcons.pen}</span>
                      </div>
                      <div className={s.directive_item}>
                        <label htmlFor={`optionId-${config_index}`} className={s.label}>Option ID:</label>
                        <input type="number" id={`optionId-${config_index}`} value={config.optionId} onChange={(e) => editDirectiveConfig(index, config_index, "optionId", e.target.value)} />
                        <span>{connectionsIcons.pen}</span>
                      </div>
                      <div className={s.directive_item}>
                        <label htmlFor={`inputValue-${config_index}`} className={s.label}>Input Value:</label>
                        <input type="number" id={`inputValue-${config_index}`} value={config.inputValue ?? ''} onChange={(e) => editDirectiveConfig(index, config_index, "inputValue", e.target.value)} />
                        <span>{connectionsIcons.pen}</span>
                      </div>
                      <div className={s.directive_item}>
                        <label htmlFor={`alertFormatId-${config_index}`} className={s.label}>Alert Format ID:</label>
                        <input type="text" id={`alertFormatId-${config_index}`} value={config.alertFormatId ?? ''} onChange={(e) => editDirectiveConfig(index, config_index, "alertFormatId", e.target.value)} />
                        <span>{connectionsIcons.pen}</span>
                      </div>
                      <div className={s.directive_item}>
                        <label htmlFor={`runScript-${config_index}`} className={s.label}>Run Script:</label>
                        <input type="text" id={`runScript-${config_index}`} value={config.runScript ?? ''} onChange={(e) => editDirectiveConfig(index, config_index, "runScript", e.target.value)} />
                        <span>{connectionsIcons.pen}</span>
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
                  <span className={s.add_directive_btn}><button onClick={() => addDirectiveConfig(index)}>ADD</button></span>
                </ul>
              </td>
              <td colSpan={1}>
                <div className={s.action_btns_wrapper}>
                  {/*Save button is only visible on the component that is currently editing */}
                  {currentDirectiveIndex === index ? (
                    <button className={s.save_btn} onClick={() => handleDirectiveUpdate(directive)}>Save</button>
                  ) : null}
                  <button className={s.delete_btn} onClick={() => showConfirmationOnDelete(directive.ehControlId, directive.name)}>DELETE</button></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  </section>)
}

export default DirectivesTable;