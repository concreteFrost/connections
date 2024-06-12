import s from "./View.module.scss";
import { connectionsIcons } from "assets/icons/icons";
import useStore from "store/store";
import { BackgroundVariant } from "react-flow-renderer";

function View() {
  const setBgView = useStore((store) => store.topPanelSlice.setBgView);

  function _setBgView(view: BackgroundVariant) {
    setBgView(view);
  }
  return (
    <div className={s.wrapper}>
      <div className={s.settings_title}>Grid View</div>
      <ul>
        <li
          onClick={() => {
            _setBgView(BackgroundVariant.Dots);
          }}
        >
          dots{" "}
          <div className={s.settings_icon}>{connectionsIcons.dotsView}</div>
        </li>
        <li
          onClick={() => {
            _setBgView(BackgroundVariant.Lines);
          }}
        >
          lines{" "}
          <div className={s.settings_icon}>{connectionsIcons.lineView}</div>
        </li>
      </ul>
    </div>
  );
}

export default View;
