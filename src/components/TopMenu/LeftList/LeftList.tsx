import useStore from "../../../store/store";
import View from "./View/View";
import { useEffect, useRef } from "react";
import s from "./LeftList.module.scss";

function LeftList() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdowns = useStore((state) => state.topPanel.dropdowns);
  const toggleDropdown = useStore((state) => state.toggleDropdown);
  const hideAllTopDropdowns = useStore((state) => state.hideAllTopMenus);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        hideAllTopDropdowns();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={s.nav_list}>
      <ul>
        <li>New</li>
        <li>Open</li>
        <li>Save</li>
        <li onClick={() => toggleDropdown("exportFlow")}>Export Flow</li>
        <li>
          <div onClick={() => toggleDropdown("view")} ref={dropdownRef}>
            View
            <div className={dropdowns.view.isVisible ? null: s.view_section_hidden}>       
              <View /> 
            </div>
          </div>
        </li>
        <li>Print</li>
      </ul>
    </div>
  );
}

export default LeftList;
