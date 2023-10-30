import { useEffect, useState } from "react";
import s from "./FilteredResults.module.scss";
import useStore from "../../../../store/store";

interface FilteredResultsProps {
  inputValue: string;
  onSubstitutionSelect: (value: string) => void;
}

function FilteredResults(props: FilteredResultsProps) {
  const [filteredSubstitutions, setFilteredSubstitutions] = useState<any[]>([]);

  const substitutions = useStore((state) => state.flow.substitutions);
  useEffect(() => {
    function handleClickOutside(event: any) {
      const suggestionList = document.querySelector(".suggestion-list-wrapper");

      if (suggestionList && !suggestionList.contains(event.target)) {
        clearFilteredSubstitutions();
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const inputValue = props.inputValue;

    if (typeof inputValue !== 'string') {
      clearFilteredSubstitutions();
      return;
    }

    if (inputValue.length <= 1) {
      clearFilteredSubstitutions();
      return;
    }

    const searchTerm = inputValue.substring(1).toLowerCase();

    const res = substitutions.filter((sub) => {
      const substitution = sub.subKey.toLowerCase();
      return substitution.startsWith(searchTerm);
    });

    if (inputValue.startsWith("{")) {
      setFilteredSubstitutions(res);
    } else {
      clearFilteredSubstitutions();
    }
  }, [props.inputValue]);


  function clearFilteredSubstitutions() {
    setFilteredSubstitutions([]);
  }

  return (
    <div className={s.suggestion_list}>
      {filteredSubstitutions.length > 0 ? (
        <ul className="suggestion-list-wrapper">
          {filteredSubstitutions.map((sub: any) => (
            <li
              key={filteredSubstitutions.indexOf(sub)}
              onClick={() => props.onSubstitutionSelect(sub.subKey)}
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
