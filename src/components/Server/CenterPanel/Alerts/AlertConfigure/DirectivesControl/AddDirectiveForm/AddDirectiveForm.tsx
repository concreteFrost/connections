import { useState } from "react";
import useStore from "../../../../../../../store/store";
import { FlowConfig } from "../../../../../../../store/interfaces/IFlow";
import s from "./AddDirectiveForm.module.scss";
import {
  Directive,
  DirectiveConfig,
} from "../../../../../../../store/interfaces/IAlerts";
import DirectiveConfigItem from "./DirectiveConfigItem/DirectiveConfigItem";
import moment from "moment";

const initialDirectiveConfig: DirectiveConfig = {
  directiveOrder: 1,
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
  clearCounter: false,
};

const initialDirective: Directive = {
  name: "New Directive",
  description: "",
  category: 0,
  ehControlId: 0,
  dateCreated: moment().format("DD/MM/YYYY HH:mm:ss:SSS"),
  lastAmended: moment().format("DD/MM/YYYY HH:mm:ss:SSS"),
  directives: [initialDirectiveConfig],
};

interface DirectiveFormProps {
  setAddDirectiveFormVisible: (isVisible: boolean) => void;
  setDirectives: (directives: Array<Directive>) => void;
  directives: Directive[];
  flowList: Array<FlowConfig>;
}

function AddDirectiveForm(props: DirectiveFormProps) {
  const { addDirective } = useStore((state) => state.alertSlice);
  const [newDirective, setNewDirective] =
    useState<Directive>(initialDirective);
  const { toggleMessageModal } = useStore((state) => state.modalWindowsSlice);

  const editDirective = (key: keyof Directive, value: any) => {
    setNewDirective((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const editDirectiveConfig = (
    directive: Directive,
    configIndex: number,
    key: keyof DirectiveConfig,
    value: any
  ) => {
    setNewDirective((prevState) => {
      const updatedDirectives = [...prevState.directives];
      updatedDirectives[configIndex] = {
        ...updatedDirectives[configIndex],
        [key]: value,
      };

      if (key === "optionId") {
        if (value == 3) {
          updatedDirectives[configIndex].stopFlow =
            initialDirectiveConfig.stopFlow;
          updatedDirectives[configIndex].addToCounter =
            initialDirectiveConfig.addToCounter;
          updatedDirectives[configIndex].clearCounter =
            initialDirectiveConfig.clearCounter;
        }
        if (value == 1) {
          updatedDirectives[configIndex].inputValue =
            initialDirectiveConfig.inputValue;
          updatedDirectives[configIndex].preventProcessing =
            initialDirectiveConfig.preventProcessing;
        }
      }

      return {
        ...prevState,
        directives: updatedDirectives,
      };
    });
  };

  function deleteDirectiveConfig(directive: Directive, configIndex: number) {
    if (directive.directives.length > 1) {
      setNewDirective((prevState) => {
        const updatedDirectives = prevState.directives.filter(
          (_, index) => index !== configIndex
        );
  
        // updating directive order
        const reorderedDirectives = updatedDirectives.map((directive, index) => ({
          ...directive,
          directiveOrder: index + 1,
        }));
  
        return {
          ...prevState,
          directives: reorderedDirectives,
        };
      });
    } else {
      toggleMessageModal("Directive needs to have at least 1 configuration");
    }
  }
  

  function addDirectiveConfig() {
    setNewDirective((prevState) => {
      const updatedDirective = {
        ...prevState,
        directives: [...prevState.directives, {...initialDirectiveConfig, directiveOrder: prevState.directives.length+1}],
      };
      return updatedDirective;
    });
  }

  async function handleAddDirective() {
    try {
      const res: any = await addDirective(newDirective);

      if (res.data.success === false) {
        toggleMessageModal(res.data.message);
        return;
      }

      const data: Directive = res.data;

      toggleMessageModal("success!!!");
      props.setAddDirectiveFormVisible(false);

      props.setDirectives([...props.directives, data]);

      // await props.fetchDirectives();
    } catch (error) {
      toggleMessageModal("error while adding new directive");
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleAddDirective();
  };

  return (
    <div className={s.wrapper}>
      <div className={s.modal_window}>
        <div className={s.modal_header}>
          <header>ADD DIRECTIVE</header>
          <span className={s.close_modal}>
            <button
              type="button"
              onClick={() => props.setAddDirectiveFormVisible(false)}
            >
              x
            </button>
          </span>
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
            <span className={s.add_config_wrapper}>
              <button type="button" onClick={() => addDirectiveConfig()}>
                ADD CONFIG
              </button>
            </span>
            <div className={s.directive}>
              <ul>
                {/* Используйте DirectiveConfigItem для каждой конфигурации */}
                {newDirective.directives.map((config, config_index) => (
                  <DirectiveConfigItem
                    directive={newDirective}
                    key={config_index}
                    config={config}
                    config_index={config_index}
                    editDirectiveConfig={editDirectiveConfig}
                    deleteDirectiveConfig={deleteDirectiveConfig}
                    flowList={props.flowList}
                    s={s}
                  />
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
