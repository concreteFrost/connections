import s from "./Substitutions.module.scss";
import { connectionsIcons } from "../../icons/icons";
import useStore from "../../store/store";
import SubstitutionsTable from "./SubstitutionsTable/SubstitutionsTable";

function Substitutions() {

  const substitutionsPanel = useStore(state=>state.substitutionsPanel);
  const addSubstitutionKey =useStore(state=>state.addSubstitutionKey);
  const togglePanel = useStore(state=>state.toggleSubstitutionsPanel);

  function _togglePanel(){
    togglePanel();
  }

  function _addSubstitution(e : any){
    e.preventDefault();
    addSubstitutionKey(e.target[0].value)
  }

  const expandableClasses = `${s.expandable_content} ${substitutionsPanel.isCollapsed ? s['collapsed'] : s['expanded']}`
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.icon} onClick={_togglePanel}>{substitutionsPanel.isCollapsed ? connectionsIcons.upCaret : connectionsIcons.downCaret}</div>
      <div className={s.header}>Substitutions</div>
      <div className={expandableClasses}>
      <div className={s.sub_header}>
        <ul>
          <li>Pagination</li>
          <li>Save</li>
        </ul>
        <form onSubmit={(e:any)=>_addSubstitution(e)}>
          <input type="text"/>
          <button>Add</button>
        </form>
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
