import React, { useState, ChangeEvent } from "react";
import useStore from "../../../../store/store";
import s from "./ValueEditor.module.scss";
import { connectionsIcons } from "../../../../icons/icons";
import FilteredResults from "../FilteredResults/FilteredResults";
import { IBlockData } from "../../../../store/interfaces/IBlock";
import { getParameterValue } from "../../../../store/actions/valueEditorActions";

function ValueEditor() {
  // State
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const setCurrentParameter = useStore((state) => state.setParameterValue);
  const valueToEdit = useStore((state) => state.valueEditor.valueToEdit)
  const parameterToModify = useStore(
    (state) => state.valueEditor.parameterToModify
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
          value={valueToEdit}
          onChange={(e) => {
            _setCurrentParameter(e);
          }}
        ></textarea>
      </div>
      <FilteredResults
        onSubstitutionSelect={onSubstitutionSelect}
        inputValue={'sss'}
      />
    </section>
  );
}

export default ValueEditor;
