import useStore from "../../../../../../../store/store";
import { useState, useEffect } from "react";
import s from "./DirectivesTable.module.scss"
import { IDirective, IDirectiveConfig } from "../../../../../../../store/interfaces/IAlerts";
import { IFlowConfig } from "../../../../../../../store/interfaces/Iflow";
import { connectionsIcons } from "../../../../../../../icons/icons";

const initialDirectiveConfig: IDirectiveConfig = {
  ehControlId: 0,
  ehDirectiveId: 0,
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

interface DirectivesTableProps {
  setDirectives: (directives: Array<IDirective>) => void;
  fetchDirectives:()=>void;
  directives: Array<IDirective>;
  flowList: Array<IFlowConfig>;
}

const PAGE_SIZE = 3;

function DirectivesTable(props: DirectivesTableProps) {

  const { setModalMessage, toggleMessageModal, setConfirmationModalActions, toggleConfirmationModal } = useStore((state) => state.modalWindowsSlice);
  const { updateDirective, deleteDirective } = useStore((state) => state.alertSlice);
  const [currentDirectiveIndex, setCurrentDirectiveIndex] = useState<Number>(-1);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [displayedDirectives, setDisplayedDirectives] = useState<Array<IDirective>>([]);

  useEffect(() => {
    if (props.directives) {
      const totalPagesCount = Math.ceil(props.directives.length / PAGE_SIZE);
      setTotalPages(totalPagesCount);
    }
  }, [props.directives]);

  useEffect(() => {
    if (props.directives) {
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = Math.min(startIndex + PAGE_SIZE, props.directives.length);
      setDisplayedDirectives(props.directives.slice(startIndex, endIndex));
    }
  }, [props.directives, currentPage]);

  async function handleDirectiveUpdate(directive: IDirective) {
    try {
      const res: any = await updateDirective(directive);
      setModalMessage(res.data.success ? 'sucess!!!' : res.data.message)
      toggleMessageModal()

      if (!res.data.success) {
        await props.fetchDirectives()
      }

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

      if (res.data.success) {
        const filteredDirectives = props.directives.filter((dir: IDirective) => dir.ehControlId != ehControlId);
        props.setDirectives(filteredDirectives);
      }

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
    setCurrentDirectiveIndex(index);
  }

  function showConfirmationOnDelete(ehControlId: number, directiveName: string) {
    setConfirmationModalActions(() => handleDirectiveDelete(ehControlId));
    toggleConfirmationModal(true, `Would you like to delete ${directiveName}?`);
  }

  return (<section className={s.wrapper}>
    <main>
      <div className={s.table_wrapper}>
        <table className={s.table}>
          <thead>
            <tr>
              <th colSpan={3}>Directive</th>
              <th colSpan={3}>Directives</th>
              <th colSpan={1}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedDirectives && displayedDirectives.map((directive: IDirective, index: any) => (
              <tr key={index} onClick={() => { checkCurrentDirectives(index) }}>
                <td colSpan={3} className={s.directive}>
                  <div className={s.directive_item}><label >name:</label>
                    <input
                      type="text"
                      value={directive.name}
                      onChange={(e: any) => editDirective(props.directives.indexOf(directive), "name", e.target.value)}
                    />
                    <span>{connectionsIcons.pen}</span>
                  </div>
                  <div className={s.directive_item}><label>description:</label>
                    <textarea
                      value={directive.description}
                      onChange={(e: any) => editDirective(props.directives.indexOf(directive), "description", e.target.value)}
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
                <td colSpan={3}>
                  <ul>
                    {directive.directives.length > 0 ? directive.directives.map((config: IDirectiveConfig, config_index: number) => (
                      <li key={config_index}>
                        <header>CONFIG: {config_index}</header>
                        <span className={s.delete_config_btn}><button onClick={() => deleteDirectiveConfig(props.directives.indexOf(directive), config_index)}>x</button></span>
                        <div className={s.directive_item}>
                          <label htmlFor={`startFlow-${config_index}`} className={s.label}>Start Flow:</label>
                          <select id={`startFlow-${config_index}`} value={config.startFlow ? config.startFlow : 0} onChange={(e) => editDirectiveConfig(props.directives.indexOf(directive), config_index, "startFlow", e.target.value)} >
                            <option value={0}>null</option>
                            {props.flowList && props.flowList.length > 0 ?
                              props.flowList.map((flow: IFlowConfig, index: number) => <option key={index} value={flow.flowId}>{flow.name}</option>) : <option>No Flows Available</option>}
                          </select>
                        </div>
                        <div className={s.directive_item}>
                          <label className={s.label}>Stop Flow:</label>
                          <input type="number" value={config.stopFlow} onChange={(e) => editDirectiveConfig(props.directives.indexOf(directive), config_index, "stopFlow", e.target.value)} />
                          <span>{connectionsIcons.pen}</span>
                        </div>

                        <div className={s.directive_item}>
                          <label className={s.label}>Option ID:</label>
                          <input type="number" value={config.optionId} onChange={(e) => editDirectiveConfig(props.directives.indexOf(directive), config_index, "optionId", e.target.value)} />
                          <span>{connectionsIcons.pen}</span>
                        </div>
                        <div className={s.directive_item}>
                          <label className={s.label}>Input Value:</label>
                          <input type="number" value={config.inputValue ?? ''} onChange={(e) => editDirectiveConfig(props.directives.indexOf(directive), config_index, "inputValue", e.target.value)} />
                          <span>{connectionsIcons.pen}</span>
                        </div>
                        <div className={s.directive_item}>
                          <label className={s.label}>Alert Format ID:</label>
                          <input type="text" value={config.alertFormatId ?? ''} onChange={(e) => editDirectiveConfig(props.directives.indexOf(directive), config_index, "alertFormatId", e.target.value)} />
                          <span>{connectionsIcons.pen}</span>
                        </div>
                        <div className={s.directive_item}>
                          <label className={s.label}>Run Script:</label>
                          <input type="text" value={config.runScript ?? ''} onChange={(e) => editDirectiveConfig(props.directives.indexOf(directive), config_index, "runScript", e.target.value)} />
                          <span>{connectionsIcons.pen}</span>
                        </div>
                        <div className={s.directive_item}>
                          <label className={s.label}>EH Control ID:</label>
                          <input type="number" value={config.ehControlId} readOnly />
                        </div>
                        <div className={s.directive_item}>
                          <label className={s.label}>EH Directive ID:</label>
                          <input type="number" value={config.ehDirectiveId} readOnly />
                        </div>
                        <div className={s.directive_item}>
                          <label className={s.label}>Prevent Processing:</label>
                          <input type="checkBox" checked={config.preventProcessing} onChange={(e) => editDirectiveConfig(props.directives.indexOf(directive), config_index, "preventProcessing", !config.preventProcessing)} />
                        </div>
                        <div className={s.directive_item}>
                          <label className={s.label}>Add To Counter:</label>
                          <input type="checkBox" checked={config.addToCounter} onChange={(e) => editDirectiveConfig(props.directives.indexOf(directive), config_index, "addToCounter", !config.addToCounter)} />
                        </div>
                        <div className={s.directive_item}>
                          <label className={s.label}>Clear Counter:</label>
                          <input type="checkBox" checked={config.clearCounter} onChange={(e) => editDirectiveConfig(props.directives.indexOf(directive), config_index, "clearCounter", !config.clearCounter)} />
                        </div>
                      </li>
                    )) : <div className={s.empty_directives}>No directives available</div>}
                    <span className={s.add_directive_btn}><button onClick={() => addDirectiveConfig(props.directives.indexOf(directive))}>ADD</button></span>
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
      </div>
      <div className={s.pagination}>
        <button disabled={currentPage === 1} onClick={() => {
          setCurrentPage(currentPage - 1)
          checkCurrentDirectives(-1) // hides save button when changing the page
        }}>Previous</button>
        <span>{currentPage}/{totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => {
          setCurrentPage(currentPage + 1)
          checkCurrentDirectives(-1) // hides save button when changing the page
        }
        }>Next</button>
      </div>
    </main>
  </section>)
}

export default DirectivesTable;