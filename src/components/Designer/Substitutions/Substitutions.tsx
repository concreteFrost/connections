import s from "./Substitutions.module.scss";
import { connectionsIcons } from "assets/icons/icons";
import useStore from "store/store";
import SubstitutionsTable from "./SubstitutionsTable/SubstitutionsTable";
import { ChangeEvent, FormEventHandler, useState } from "react";

function Substitutions() {
  const { substitutionsPanel, toggleSubstitutionsPanel, errorMessages } =
    useStore((state) => state.designerVisualElementsSlice);
  const addSubstitutionKey = useStore(
    (state) => state.flowSlice.addSubstitutionKey
  );

  const [substKey, setSubstKey] = useState("");

  function handleAddSubstitution(e: any) {
    e.preventDefault();
    addSubstitutionKey(e.target[0].value);
    setSubstKey("");
  }

  const expandableClasses = `${s.expandable_content} ${
    substitutionsPanel.isCollapsed ? s["collapsed"] : s["expanded"]
  }`;
  const subHeaderClasses = `${s.sub_header} ${
    substitutionsPanel.isCollapsed ? s["collapsed"] : s["expanded"]
  }`;
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.icon} onClick={toggleSubstitutionsPanel}>
          {substitutionsPanel.isCollapsed
            ? connectionsIcons.upCaret
            : connectionsIcons.downCaret}
        </div>
        <div className={s.header}>Substitutions</div>
        <div className={expandableClasses}>
          <div className={subHeaderClasses}>
            <form onSubmit={handleAddSubstitution}>
              <input
                type="text"
                value={substKey}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSubstKey(e.target.value)
                }
              />
              <button>Add</button>
              <span>{errorMessages.substitutionAddError}</span>
            </form>

            <ul>{/* <li>Save</li> */}</ul>
          </div>
          <div className={s.body}>
            <SubstitutionsTable></SubstitutionsTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Substitutions;
