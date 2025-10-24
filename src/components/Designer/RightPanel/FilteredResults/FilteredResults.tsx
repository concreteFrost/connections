import { useEffect, useRef, useState } from "react";
import s from "./FilteredResults.module.scss";
import useStore from "store/store";
import { Substitutions } from "shared/interfaces/Iflow";
import useOutsideMouseClick from "hooks/useOutsideMouseClick";

interface ISelection {
  index: number;
  value: string;
}

interface FilteredResultsProps {
  defaultInput: string;
  selection: ISelection;
  onSubstitutionSelect: (value: string) => void;
}

function FilteredResults(props: FilteredResultsProps) {
  const [filteredSubstitutions, setFilteredSubstitutions] = useState<
    Substitutions[]
  >([]);
  const substitutions = useStore((state) => state.flowSlice.flow.substitutions);
  const listRef = useRef<HTMLUListElement>(null);
  useOutsideMouseClick(listRef, () => clearFilteredSubstitutions());

  useEffect(() => {
    const inputValue = props.selection.value;

    if (typeof inputValue !== "string") {
      clearFilteredSubstitutions();
      return;
    }

    if (inputValue.length <= 1) {
      clearFilteredSubstitutions();
      return;
    }

    const searchTerm = inputValue.substring(1).toLowerCase();

    const res = substitutions.filter((sub: Substitutions) => {
      const substitution = sub.subKey.toLowerCase();
      return substitution.startsWith(searchTerm);
    });

    setFilteredSubstitutions(res);
  }, [props.selection.value]);

  function clearFilteredSubstitutions() {
    setFilteredSubstitutions([]);
  }

  function insertSubstitution(subKey: string) {
    const start = props.defaultInput.slice(0, props.selection.index); //defines where the prompting is starting
    const end = props.defaultInput.slice(
      props.selection.index + props.selection.value.length
    );
    const newValue = start + `{${subKey}}` + end;
    props.onSubstitutionSelect(newValue);
    clearFilteredSubstitutions();
  }

  return (
    <div className={s.suggestion_list}>
      {filteredSubstitutions.length > 0 ? (
        <ul className="suggestion-list-wrapper" ref={listRef}>
          {filteredSubstitutions.map((sub: any) => (
            <li
              key={filteredSubstitutions.indexOf(sub)}
              onClick={() => insertSubstitution(sub.subKey)}
            >
              {sub.subKey}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default FilteredResults;
