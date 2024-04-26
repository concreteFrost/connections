import { useState, useEffect, ChangeEvent } from "react";
import useStore from "../../../../store/store";
import s from "./ValueEditor.module.scss";
import { connectionsIcons } from "../../../../icons/icons";
import FilteredResults from "../FilteredResults/FilteredResults";

interface ISelection {
  index: number,
  value: string
}

function ValueEditor() {
  // State
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const setCurrentParameter = useStore((state) => state.designerVisualElementsSlice.setParameterValue);

  const valueToEdit = useStore((state) => state.designerVisualElementsSlice.valueEditor.valueToEdit)
  const parameterToModify = useStore((state) => state.designerVisualElementsSlice.valueEditor.parameterToModify);

  //Filtered results
  const [selection, setSelection] = useState<ISelection>({ index: 0, value: '' })

  // Handlers
  const _setCurrentParameter = (e: ChangeEvent<HTMLTextAreaElement>) => setCurrentParameter(parameterToModify, e.target.value);
  const onSubstitutionSelect = (e: string) => setCurrentParameter(parameterToModify, e);

  const setSelectionIndex = (e: any) => {
    if (e.key === "{")
      setSelection({ ...selection, index: e.target.selectionStart })
  }

  function setSelectionValue(e: any) {

    const res = e.target.value.slice(selection.index, e.target.value.length)
    const cleanedRes = res.replace(/\s.*$/, '');
    setSelection({ ...selection, value: cleanedRes })
  }

  // CSS Classes
  const containerClasses = `${s.text_area_container} ${isExpanded ? s.expanded : s.collapsed
    }`;

  return (
    <section >
      <div
        className={s.section_header}
      onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>
          {isExpanded ? connectionsIcons.collapse : connectionsIcons.expand}
        </span>
        VALUE EDITOR
      </div>
      <div className={containerClasses}>
        <textarea
          value={valueToEdit}
          onChange={(e) => {
            _setCurrentParameter(e);
            setSelectionValue(e);
          }}
          onKeyDown={(e: any) => setSelectionIndex(e)}
        ></textarea>
      </div>
      <FilteredResults
        onSubstitutionSelect={onSubstitutionSelect}
        defaultInput={valueToEdit}
        selection={selection}
      />

    </section>
  );
}

export default ValueEditor;
