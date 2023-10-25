import React, { useState, ChangeEvent } from "react";
import useStore from "../../../../store/store";
import s from "./ValueEditor.module.scss";
import { connectionsIcons } from "../../../../icons/icons";
import FilteredResults from "../FilteredResults/FilteredResults";

function ValueEditor() {
  // State
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const inputValue = useStore(
    (state) => state.rightPanel.valueEditor.inputValue
  );
  const setCurrentParameter = useStore((state) => state.setParameterValue);
  const parameterToModify = useStore(
    (state) => state.rightPanel.valueEditor.parameterName
  );

  // Handlers
  const _setCurrentParameter = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentParameter(parameterToModify, e.target.value);
  };

  function onSubstitutionSelect(e: string) {
    setCurrentParameter(parameterToModify, `{${e}}`);
  }

  // CSS Classes
  const containerClasses = `${s.section_container} ${isExpanded ? s.expanded : s.collapsed
    }`;

  return (
    <section className={containerClasses}>
      <div
        className={s.section_header}
      // onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>
          {isExpanded ? connectionsIcons.collapse : connectionsIcons.expand}
        </span>
        VALUE EDITOR
      </div>
      <div className={s.text_area_container}>
        <textarea
          value={inputValue}
          onChange={(e) => {
            _setCurrentParameter(e);
          }}
        ></textarea>
      </div>
      <FilteredResults
        onSubstitutionSelect={onSubstitutionSelect}
        inputValue={inputValue}
      />
    </section>
  );
}

export default ValueEditor;
