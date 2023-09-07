import View from "./View/View";
import s from "./LeftList.module.scss";
import useStore from "../../../store/store";
function LeftList(props: any) {
  const loadFlow = useStore((state) => state.loadFlow);
  return (
    <ul className={s.nav_list}>
      <li className={s.nav_list_item}>New</li>
      <li className={s.nav_list_item} onClick={loadFlow}>Open</li>
      <li className={s.nav_list_item}>Save</li>
      <li className={s.nav_list_item} onClick={() => props.toggleDropdown("exportFlow")}>Export</li>
      <li className={s.nav_list_item}>
        <div onClick={() => props.toggleDropdown("view")}>View</div>
        <div
          className={
            props.dropdowns.view.isVisible ? null : s.view_section_hidden
          }
        >
          <View />
        </div>
      </li>
      <li className={s.nav_list_item}>Print</li>
    </ul>
  );
}

export default LeftList;
