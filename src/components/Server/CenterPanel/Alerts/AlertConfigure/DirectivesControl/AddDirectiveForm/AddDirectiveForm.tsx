import {useState } from "react";
import useStore from "../../../../../../../store/store";
import { IFlowConfig } from "../../../../../../../store/interfaces/Iflow";
import s from "./AddDirectiveForm.module.scss"
import { IDirective, IDirectiveConfig } from "../../../../../../../store/interfaces/IAlerts";
import moment from "moment";

const initialDirectiveConfig: IDirectiveConfig = {
  ehControlId: 0,
  ehDirectiveId: 0,
  optionId: 2,
  inputValue: 0,
  alertFormatId: 1,
  preventProcessing: false,
  stopFlow: 0,
  startFlow: "",
  runScript: "",
  addToCounter: false,
  clearCounter: false
};


const initialDirective: IDirective = {
  name: "New Directive",
  description: "",
  category: 0,
  ehControlId: 0,
  dateCreated: moment().format('DD/MM/YYYY HH:mm:ss:SSS'),
  lastAmended: moment().format('DD/MM/YYYY HH:mm:ss:SSS'),
  directives: [initialDirectiveConfig]
};

interface DirectiveFormProps {
  setAddDirectiveFormVisible: (isVisible: boolean) => void;
  setDirectives: (directives: Array<IDirective>) => void;
  directives: IDirective[];
  flowList: Array<IFlowConfig>;
}

function AddDirectiveForm(props: DirectiveFormProps) {
  const { addDirective } = useStore((state) => state.alertSlice);
  const [newDirective, setNewDirective] = useState<IDirective>(initialDirective);
  const { setModalMessage, toggleMessageModal } = useStore((state) => state.modalWindowsSlice);


  const editDirective = (key: keyof IDirective, value: any) => {
    setNewDirective(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const editDirectiveConfig = (configIndex: number, key: keyof IDirectiveConfig, value: any) => {
    setNewDirective(prevState => {
      const updatedDirectives = [...prevState.directives];
      updatedDirectives[configIndex] = {
        ...updatedDirectives[configIndex],
        [key]: value
      };
      return {
        ...prevState,
        directives: updatedDirectives
      };
    });
  };

  function addDirectiveConfig() {
    setNewDirective(prevState => {
      const updatedDirective = {
        ...prevState,
        directives: [...prevState.directives, initialDirectiveConfig]
      };
      return updatedDirective;
    });
  }

  function deleteDirectiveConfig(configIndex: number) {
    if (newDirective.directives.length > 1) {
      setNewDirective(prevState => {
        const updatedDirectives = [...prevState.directives];
        updatedDirectives.splice(configIndex, 1);
        return {
          ...prevState,
          directives: updatedDirectives
        };
      });
    } else {
      setModalMessage("Directive needs to have at least 1 configuration");
      toggleMessageModal();
    }
  }

  async function handleAddDirective() {
    try {
      const res: any = await addDirective(newDirective);
    
      if (res.data.success === false) {
        setModalMessage(res.data.message);
        toggleMessageModal();
        return;
      }

      const data : IDirective = res.data

      setModalMessage("success!!!");
      toggleMessageModal();
      props.setAddDirectiveFormVisible(false)

      props.setDirectives([...props.directives, data])

      // await props.fetchDirectives();
    } catch (error) {
      setModalMessage("error while adding new directive");
      toggleMessageModal();
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleAddDirective();
  };

  return (
    <div className={s.wrapper}>
      <div className={s.modal_window}>
        <div className={s.modal_header}><header>ADD DIRECTIVE</header>
          <span className={s.close_modal}><button type="button" onClick={() => props.setAddDirectiveFormVisible(false)}>x</button></span>
        </div>

        <div className={s.modal_body}>
          <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.directive}>
              <div className={s.directive_item}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={newDirective.name}
                  onChange={(e) => editDirective("name", e.target.value)}
                />
              </div>
              <div className={s.directive_item}>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={newDirective.description}
                  onChange={(e) => editDirective("description", e.target.value)}
                />
              </div>
            </div>
            <span className={s.add_config_wrapper}><button type="button" onClick={() => addDirectiveConfig()}>ADD CONFIG</button></span>
            <div className={s.directive}>
              <ul>
                {newDirective.directives.map((config, config_index) => (
                  <li key={config_index}>
                    <header><h3>CONFIG: {config_index}</h3> </header>
                    <span className={s.delete_config_btn}><button type="button" onClick={() => deleteDirectiveConfig(config_index)}>x</button></span>
                    <div className={s.directive_item}>
                      <label htmlFor={`optionId-${config_index}`} className={s.label}>Option ID:</label>
                     <select  id={`optionId-${config_index}`} value={config.optionId}  onChange={(e) => editDirectiveConfig(config_index, "optionId", e.target.value)}>
                     <option value={1}>Terminate</option>
                     <option value={2}>Pause Current</option>
                     <option value={3}>Retry</option>
                     </select>
                    </div>
                    <div className={s.directive_item}>
                      <label htmlFor={`inputValue-${config_index}`} className={s.label}>Input Value:</label>
                      <input type="number" id={`inputValue-${config_index}`} value={config.inputValue ?? ''} onChange={(e) => editDirectiveConfig(config_index, "inputValue", e.target.value)} />
                    </div>
                    
                    <div className={s.directive_item}>
                      <label htmlFor={`alertFormatId-${config_index}`} className={s.label}>Alert Format ID:</label>
                      <select id={`alertFormatId-${config_index}`} value={config.alertFormatId}  onChange={(e) => editDirectiveConfig(config_index, "alertFormatId", e.target.value)} >
                        <option value={0}>Default</option>
                        <option value={1}>User</option>
                      </select>    
                    </div>
                    <div className={s.directive_item}>
                      <label htmlFor={`preventProcessing-${config_index}`} className={s.label}>Prevent Processing:</label>
                      <input type="checkBox" id={`preventProcessing-${config_index}`} checked={config.preventProcessing} onChange={(e) => editDirectiveConfig(config_index, "preventProcessing", !config.preventProcessing)} />
                    </div>
                    <div className={s.directive_item}>
                      <label htmlFor={`stopFlow-${config_index}`} className={s.label}>Stop Flow:</label>
                      <input type="number" id={`stopFlow-${config_index}`} value={config.stopFlow} onChange={(e) => editDirectiveConfig(config_index, "stopFlow", e.target.value)} />
                    </div>
                    <div className={s.directive_item}>
                      <label htmlFor={`startFlow-${config_index}`} className={s.label}>
                        Start Flow:
                      </label>
                      <select
                        id={`startFlow-${config_index}`}
                        value={config.startFlow ? config.startFlow : 0}
                        onChange={(e) => editDirectiveConfig(config_index, "startFlow", e.target.value)}
                      >
                        <option value={0}>null</option>
                        {props.flowList && props.flowList.length > 0 ? (
                          props.flowList.map((flow: IFlowConfig, index: number) => (
                            <option key={index} value={flow.flowId}>
                              {flow.name}
                            </option>
                          ))
                        ) : (
                          <option>No Flows Available</option>
                        )}
                      </select>
                    </div>
                    <div className={s.directive_item}>
                      <label htmlFor={`runScript-${config_index}`} className={s.label}>Run Script:</label>
                      <input type="text" id={`runScript-${config_index}`} value={config.runScript ?? ''} onChange={(e) => editDirectiveConfig(config_index, "runScript", e.target.value)} />
                    </div>

                    <div className={s.directive_item}>
                      <label htmlFor={`addToCounter-${config_index}`} className={s.label}>Add To Counter:</label>
                      <input type="checkBox" id={`addToCounter-${config_index}`} checked={config.addToCounter} onChange={(e) => editDirectiveConfig(config_index, "addToCounter", !config.addToCounter)} />
                    </div>
                    <div className={s.directive_item}>
                      <label htmlFor={`clearCounter-${config_index}`} className={s.label}>Clear Counter:</label>
                      <input type="checkBox" id={`clearCounter-${config_index}`} checked={config.clearCounter} onChange={(e) => editDirectiveConfig(config_index, "clearCounter", !config.clearCounter)} />
                    </div>
                  </li>
                ))}
              </ul>
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

export default AddDirectiveForm;
