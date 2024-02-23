import { useEffect, useState } from "react";
import useStore from "../../../../../../store/store";
import { getFlowListApi } from "../../../../../../api/flow";
import { IFlowConfig } from "../../../../../../store/interfaces/Iflow";
import s from "./AddDirectiveForm.module.scss"
import { IDirective, IDirectiveConfig } from "../../../../../../store/interfaces/IAlerts";

const initialDirectiveConfig: IDirectiveConfig = {
  optionId: 1,
  inputValue: 10,
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
  dateCreated: new Date(),
  lastAmended: new Date(),
  directives: [initialDirectiveConfig]
};

function AddDirectiveForm() {
  const { updateDirective, deleteDirective } = useStore((state) => state.alertSlice);
  const [newDirective, setNewDirective] = useState(initialDirective);
  const [flowList, setFlowList] = useState([]);

  useEffect(() => {
    async function fetchFlowList() {
      try {
        const res: any = await getFlowListApi();
        setFlowList(res.data);
      } catch (e) {
        console.log("error fetching flows", e);
      }
    }
    fetchFlowList();
  }, []);

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Действия по сохранению данных
  };

  return (
    <div className={s.wrapper}>
      <div className={s.modal_window}>
      <div className={s.modal_header}>ADD DIRECTIVE</div>
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
            <input
              type="text"
              id="description"
              value={newDirective.description}
              onChange={(e) => editDirective("description", e.target.value)}
            />
          </div>
          <div className={s.directive_item}>
            <label htmlFor="ehControlId">EH Control ID:</label>
            <input
              type="number"
              id="ehControlId"
              value={newDirective.ehControlId}
              onChange={(e) => editDirective("ehControlId", e.target.value)}
            />
          </div>
          <div className={s.directive_item}>
            <label htmlFor="category">Category:</label>
            <input
              type="number"
              id="category"
              value={newDirective.category}
              onChange={(e) => editDirective("category", e.target.value)}
            />
          </div>
          <div className={s.directive_item}>
            <label htmlFor="dateCreated">Date Created:</label>
            <input
              type="datetime-local"
              id="dateCreated"
              value={new Date().toLocaleString()}
              onChange={(e) => editDirective("dateCreated", e.target.value)}
            />
          </div>
          <div className={s.directive_item}>
            <label htmlFor="lastAmended">Last Amended:</label>
            <input
              type="datetime-local"
              id="lastAmended"
              value={new Date().toLocaleString()}
              onChange={(e) => editDirective("lastAmended", e.target.value)}
            />
          </div>
        </div>
        <div className={s.directive}>
          <ul>
            {newDirective.directives.map((config, config_index) => (
              <li key={config_index}>
                <header>CONFIG: {config_index}</header>
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
                    {flowList && flowList.length > 0 ? (
                      flowList.map((flow: IFlowConfig, index: number) => (
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
                  <label htmlFor={`stopFlow-${config_index}`} className={s.label}>Stop Flow:</label>
                  <input type="number" id={`stopFlow-${config_index}`} value={config.stopFlow} onChange={(e) => editDirectiveConfig(config_index, "stopFlow", e.target.value)} />
                </div>
                <div className={s.directive_item}>
                  <label htmlFor={`optionId-${config_index}`} className={s.label}>Option ID:</label>
                  <input type="text" id={`optionId-${config_index}`} value={config.optionId} onChange={(e) => editDirectiveConfig(config_index, "optionId", e.target.value)} />
                </div>
                <div className={s.directive_item}>
                  <label htmlFor={`inputValue-${config_index}`} className={s.label}>Input Value:</label>
                  <input type="number" id={`inputValue-${config_index}`} value={config.inputValue ?? ''} onChange={(e) => editDirectiveConfig(config_index, "inputValue", e.target.value)} />
                </div>
                <div className={s.directive_item}>
                  <label htmlFor={`alertFormatId-${config_index}`} className={s.label}>Alert Format ID:</label>
                  <input type="text" id={`alertFormatId-${config_index}`} value={config.alertFormatId ?? ''} onChange={(e) => editDirectiveConfig(config_index, "alertFormatId", e.target.value)} />
                </div>
                <div className={s.directive_item}>
                  <label htmlFor={`runScript-${config_index}`} className={s.label}>Run Script:</label>
                  <input type="text" id={`runScript-${config_index}`} value={config.runScript ?? ''} onChange={(e) => editDirectiveConfig(config_index, "runScript", e.target.value)} />
                </div>
                <div className={s.directive_item}>
                  <label htmlFor={`preventProcessing-${config_index}`} className={s.label}>Prevent Processing:</label>
                  <input type="checkBox" id={`preventProcessing-${config_index}`} checked={config.preventProcessing} onChange={(e) => editDirectiveConfig(config_index, "preventProcessing", !config.preventProcessing)} />
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
          <button type="submit">Save</button>
        </div>
      </form>
      </div>

      </div>
    </div>

  );
}

export default AddDirectiveForm;
