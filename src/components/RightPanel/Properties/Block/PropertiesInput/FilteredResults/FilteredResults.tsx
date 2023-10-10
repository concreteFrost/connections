import { useEffect } from "react";
import s from "./FilteredResults.module.scss";
import {v4 as uuidv4} from "uuid"

function FilteredResults(props: {
  filteredSubstitutions: Array<any>;
  onSubstitutionSelect: (e: any) => void;
  clearFilteredSubstitutions: () => void;
}) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      const suggestionList = document.querySelector(".suggestion-list-wrapper");

      if (suggestionList && !suggestionList.contains(event.target)) {
        props.clearFilteredSubstitutions();
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    
      <div className={s.suggestion_list}>
        {props.filteredSubstitutions.length > 0 ? (
          <ul className="suggestion-list-wrapper">
            {props.filteredSubstitutions.map((sub: any) => (
              <li
                key={props.filteredSubstitutions.indexOf(sub)}
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
