import s from "./View.module.scss";
import button_style from "../../DesignerNav.module.scss";
import { connectionsIcons } from "assets/icons/icons";
import useStore from "store/store";
import { BackgroundVariant } from "react-flow-renderer";
import useEscapeKeyHandler from "hooks/useEscapeKeyHandler";
import useOutsideMouseClick from "hooks/useOutsideMouseClick";
import { useRef, useState } from "react";

function View() {
  const setBgView = useStore((store) => store.topPanelSlice.setBgView);
  const [isViewSectionVisible, setViewSectionVisible] =
    useState<boolean>(false);
  const viewRef: any = useRef();

  function _setBgView(view: BackgroundVariant) {
    setBgView(view);
  }

  useEscapeKeyHandler(() => setViewSectionVisible(false));
  useOutsideMouseClick(viewRef, () => setViewSectionVisible(false));

  return (
    <li ref={viewRef} className={button_style.central_nav_btn}>
      <div onClick={() => setViewSectionVisible(!isViewSectionVisible)}>
        View
      </div>
      {isViewSectionVisible ? (
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
      ) : null}
    </li>
  );
}

export default View;
