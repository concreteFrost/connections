import s from "./Substitutions.module.scss";
import { connectionsIcons } from "../../../assets/icons/icons";
import useStore from "../../../store/store";
import SubstitutionsTable from "./SubstitutionsTable/SubstitutionsTable";
import { useState } from "react";

function Substitutions() {

  const substitutionsPanel = useStore(state => state.designerVisualElementsSlice.substitutionsPanel);
  const addSubstitutionKey = useStore(state => state.flowSlice.addSubstitutionKey);
  const togglePanel = useStore(state => state.designerVisualElementsSlice.toggleSubstitutionsPanel);
  const substitutionAddError = useStore(state => state.designerVisualElementsSlice.errorMessages.substitutionAddError);
  const [substKey, setSubstKey] = useState('');

  function _togglePanel() {
    togglePanel();
  }

  function _addSubstitution(e: any) {
    e.preventDefault();
    addSubstitutionKey(e.target[0].value)
    setSubstKey('')
  }
  function _setSubstKey(e: string) {
    setSubstKey(e);
  }

  const expandableClasses = `${s.expandable_content} ${substitutionsPanel.isCollapsed ? s['collapsed'] : s['expanded']}`
  const subHeaderClasses = `${s.sub_header} ${substitutionsPanel.isCollapsed ? s['collapsed'] : s['expanded']}`
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.icon} onClick={_togglePanel}>{substitutionsPanel.isCollapsed ? connectionsIcons.upCaret : connectionsIcons.downCaret}</div>
        <div className={s.header}>Substitutions</div>
        <div className={expandableClasses}>
          <div className={subHeaderClasses}>

            <form onSubmit={(e: any) => _addSubstitution(e)}>
              <input type="text" value={substKey} onChange={(e: any) => _setSubstKey(e.target.value)} />
              <button>Add</button>
              <span>{substitutionAddError}</span>
            </form>

            <ul>
              <li>Save</li>
            </ul>
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
