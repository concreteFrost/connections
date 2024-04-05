import React from "react";
import { IFlowConfig } from "../../../../../../../../store/interfaces/Iflow";
import {
  IDirective,
  IDirectiveConfig,
} from "../../../../../../../../store/interfaces/IAlerts";

interface DirectiveConfigItemProps {
  directive: IDirective;
  config: IDirectiveConfig;
  config_index: number;
  editDirectiveConfig: (
    directive:IDirective,
    config_index: number,
    key: keyof IDirectiveConfig,
    value: any
  ) => void;
  deleteDirectiveConfig: (directive:IDirective,config_index: number) => void;
  flowList: Array<IFlowConfig>;
  s: any;
}

const DirectiveConfigItem: React.FC<DirectiveConfigItemProps> = ({
  directive,
  config,
  config_index,
  editDirectiveConfig,
  deleteDirectiveConfig,
  flowList,
  s,
}) => {
  return (
    <li key={config_index}>
      <header>
        <h3>CONFIG: {config_index}</h3>{" "}
      </header>
      <span className={s.delete_config_btn}>
        <button
          type="button"
          onClick={() =>
            deleteDirectiveConfig(
             directive, directive.directives.indexOf(directive.directives[config_index])
            )
          }
        >
          x
        </button>
      </span>
      <div className={s.directive_item}>
        <label htmlFor={`optionId-${config_index}`} className={s.label}>
          Option ID:
        </label>
        <select
          id={`optionId-${config_index}`}
          value={config.optionId}
          onChange={(e) =>
            editDirectiveConfig(directive,config_index, "optionId", e.target.value)
          }
        >
          <option value={1}>Terminate</option>
          <option value={2}>Pause Current</option>
          <option value={3}>Retry</option>
          <option value={4}>Continue Up To</option>
        </select>
      </div>

      {/**INPUT VALUE */}
      {config.optionId == 1 ? null : (
        <div className={s.directive_item}>
          <label htmlFor={`inputValue-${config_index}`} className={s.label}>
            Input Value:
          </label>
          <input
            type="number"
            id={`inputValue-${config_index}`}
            value={config.inputValue ?? ""}
            onChange={(e) =>
              editDirectiveConfig(directive,config_index, "inputValue", e.target.value)
            }
          />
        </div>
      )}

      <div className={s.directive_item}>
        <label htmlFor={`alertFormatId-${config_index}`} className={s.label}>
          Alert Format ID:
        </label>
        <select
          id={`alertFormatId-${config_index}`}
          value={config.alertFormatId}
          onChange={(e) =>
            editDirectiveConfig(directive,config_index, "alertFormatId", e.target.value)
          }
        >
          <option value={0}>Default</option>
          <option value={1}>User</option>
        </select>
      </div>

      {/**PREVENT PROCESSING */}
      {config.optionId == 1 ? null : (
        <div className={s.directive_item}>
          <label
            htmlFor={`preventProcessing-${config_index}`}
            className={s.label}
          >
            Prevent Processing:
          </label>
          <input
            type="checkBox"
            id={`preventProcessing-${config_index}`}
            checked={config.preventProcessing}
            onChange={(e) =>
              editDirectiveConfig(
                directive,
                config_index,
                "preventProcessing",
                !config.preventProcessing
              )
            }
          />
        </div>
      )}

      {/**STOP FLOW */}
      {config.optionId == 3 ? null : (
        <div className={s.directive_item}>
          <label htmlFor={`stopFlow-${config_index}`} className={s.label}>
            Stop Flow:
          </label>
          <input
            type="number"
            id={`stopFlow-${config_index}`}
            value={config.stopFlow}
            onChange={(e) =>
              editDirectiveConfig(directive,config_index, "stopFlow", e.target.value)
            }
          />
        </div>
      )}

      <div className={s.directive_item}>
        <label htmlFor={`startFlow-${config_index}`} className={s.label}>
          Start Flow:
        </label>
        <select
          id={`startFlow-${config_index}`}
          value={config.startFlow ? config.startFlow : 0}
          onChange={(e) =>
            editDirectiveConfig(directive,config_index, "startFlow", e.target.value)
          }
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
        <label htmlFor={`runScript-${config_index}`} className={s.label}>
          Run Script:
        </label>
        <input
          type="text"
          id={`runScript-${config_index}`}
          value={config.runScript ?? ""}
          onChange={(e) =>
            editDirectiveConfig(directive,config_index, "runScript", e.target.value)
          }
        />
      </div>
      {/**ADD TO COUNTER */}
      {config.optionId == 3 ? null : (
        <div className={s.directive_item}>
          <label htmlFor={`addToCounter-${config_index}`} className={s.label}>
            Add To Counter:
          </label>
          <input
            type="checkBox"
            id={`addToCounter-${config_index}`}
            checked={config.addToCounter}
            onChange={(e) =>
              editDirectiveConfig(
                directive,
                config_index,
                "addToCounter",
                !config.addToCounter
              )
            }
          />
        </div>
      )}
      {/**CELAR COUNTER */}

      {config.optionId == 3 ? null : (
        <div className={s.directive_item}>
          <label htmlFor={`clearCounter-${config_index}`} className={s.label}>
            Clear Counter:
          </label>
          <input
            type="checkBox"
            id={`clearCounter-${config_index}`}
            checked={config.clearCounter}
            onChange={(e) =>
              editDirectiveConfig(
                directive,
                config_index,
                "clearCounter",
                !config.clearCounter
              )
            }
          />
        </div>
      )}
    </li>
  );
};

export default DirectiveConfigItem;
