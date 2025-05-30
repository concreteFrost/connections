import { useState, ChangeEvent } from "react";
import useStore from "store/store";
import s from "./ValueEditor.module.scss";
import { connectionsIcons } from "assets/icons/icons";
import FilteredResults from "../FilteredResults/FilteredResults";

function ValueEditor() {
  // State
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { setParameterValue, valueEditor } = useStore(
    (state) => state.designerVisualElementsSlice
  );
  //Filtered results
  const [selection, setSelection] = useState({
    index: 0,
    value: "",
  });

  // Handlers
  const handleSetCurrentParameter = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setParameterValue(valueEditor.parameterToModify, e.target.value);
  const onSubstitutionSelect = (e: string) =>
    setParameterValue(valueEditor.parameterToModify, e);

  const setSelectionIndex = (e: any) => {
    if (e.key === "{")
      setSelection({ ...selection, index: e.target.selectionStart });
  };

  function setSelectionValue(e: any) {
    const res = e.target.value.slice(selection.index, e.target.value.length);
    const cleanedRes = res.replace(/\s.*$/, "");
    setSelection({ ...selection, value: cleanedRes });
  }

  // CSS Classes
  const containerClasses = `${s.text_area_container} ${
    isExpanded ? s.expanded : s.collapsed
  }`;

  return (
    <section>
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
          value={valueEditor.valueToEdit}
          onChange={(e) => {
            handleSetCurrentParameter(e);
            setSelectionValue(e);
          }}
          onKeyDown={(e: any) => setSelectionIndex(e)}
        ></textarea>
      </div>
      <FilteredResults
        onSubstitutionSelect={onSubstitutionSelect}
        defaultInput={valueEditor.valueToEdit}
        selection={selection}
      />
    </section>
  );
}

export default ValueEditor;
