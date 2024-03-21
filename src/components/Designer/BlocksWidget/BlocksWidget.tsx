import s from "./BlocksWidget.module.scss";
import { useState } from "react";
import useStore from "../../../store/store";

function BlocksWidget() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { setSelectedBlocksColors ,allignSelectedBlocks,deleteMultupleBlocks } = useStore((state) => state.flowSlice);
  return (
    <div className={s.wrapper}>
      <div className={s.body}>
        <div className={s.header}>QUICK EDIT</div>
        <div className={s.expand_modal}>
          <button onClick={() => setExpanded(!expanded)}>EDIT</button>
        </div>

        {expanded ? (
          <div className={s.footer}>
            <section>
              <header>Set Color</header>
              <div className={s.input_wrapper}>
                <input
                  type="color"
                  onChange={(e: any) => setSelectedBlocksColors(e.target.value)}
                />
              </div>
            </section>
            <section>
              <header>Allignment</header>
              <div className={s.btn_wrapper}>
                <button onClick={()=>allignSelectedBlocks("x")}>Horizontal</button>
                <button onClick={()=>allignSelectedBlocks("y")}>Vertical</button>
              </div>
            </section>

            <section>
              <header>Actions</header>
              <div className={s.btn_wrapper}>
                <button onClick={deleteMultupleBlocks}>Delete</button>
                <button>New Group</button>
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default BlocksWidget;
