import s from "./SettingsDropdown.module.scss";
import useStore from "../../../../store/store";
import { clearUserData } from "../../../../store/actions/storageActions";
import { useNavigate } from "react-router-dom"

function SettingsDropdown() {
  const isSnapped = useStore((store) => store.topPanel.settings.snapToGrid);
  const toggleGrid = useStore((store) => store.setSnapToGrid);
  const toggleMinimap = useStore((store) => store.showMiniMap);
  const sliderVal = useStore((store) => store.topPanel.settings.snapStep);
  const setSliderVal = useStore((store) => store.setSnapStep);
  const showMiniMap = useStore((store) => store.topPanel.settings.showMiniMap)
  const navigate = useNavigate();

  function logout() {
    clearUserData();
    navigate('/login')
  }


  return (
    <div className={s.wrapper}>
      <div className={s.settings_title}>Grid</div>
      <ul>
        <li className={s.settings_list_item}>
          <div>Snap to grid</div>
          <div className={s.check_input}>
            <input
              type="checkbox"
              name="checkSnap"
              id="checkSnap"
              checked={isSnapped}
              onChange={toggleGrid}
            />
          </div>
        </li>
        <li className={s.slider_container}>
          <div>Snap step</div>
          <div>
            <span className={s.slider_value}>{`${sliderVal[0]} x ${sliderVal[0]}`}</span>
            <input
              type="range"
              value={sliderVal[0]}
              onChange={(e: any) => {
                setSliderVal([e.target.value, e.target.value])
              }}
              min="5"
              max="100"
              step="5"
            />
          </div>
        </li>
      </ul>
      <div className={s.settings_title}>Minimap</div>
      <ul>
        <li className={s.settings_list_item}>
          <div>Show Minimap</div>
          <div className={s.check_input}>
            <input type="checkbox" checked={showMiniMap} onChange={toggleMinimap} />
          </div>
        </li>
      </ul>
      <div className={s.logout_container}>
        <button onClick={logout}>Logout</button>
      </div>

    </div>
  );
}

export default SettingsDropdown;
