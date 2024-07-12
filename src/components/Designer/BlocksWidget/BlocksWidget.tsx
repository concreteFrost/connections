import s from "./BlocksWidget.module.scss";
import { useState } from "react";
import useStore from "store/store";
import { getAllselectedBlockIDs } from "store/actions/groupActions";
import useEscapeKeyHandler from "hooks/useEscapeKeyHandler";

function BlocksWidget() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const flow  = useStore((store) => store.flowSlice.flow);
  const {resetSelectedBlocks} = useStore((state)=>state.flowSlice);
  const {
    setSelectedBlocksColors,
    allignSelectedBlocks,
    deleteMultupleBlocks,
  } = useStore((state) => state.flowSlice);

  useEscapeKeyHandler(()=>  resetSelectedBlocks())
  return (<>
      {getAllselectedBlockIDs(flow.visual.blocks) ? <div className={s.wrapper}>
      <div className={s.body}>
        <div className={s.header} >QUICK EDIT</div>
        <div className={s.expand_modal}>
          <button onClick={() => setExpanded(!expanded)}>EDIT</button>
        </div>

        {expanded ? (
          <div className={s.footer}>
            <section>
              <header>Set Color</header>
              <div className={s.input_wrapper}>
                <input
                  data-testid="test_set_group_color"
                  type="color"
                  onChange={(e: any) =>
                    setSelectedBlocksColors(e.target.value)
                  }
                />
              </div>
            </section>
            <section>
              <header>Allignment</header>
              <div className={s.btn_wrapper}>
                <button 
                data-testid = "test_allign_blocks_btn_x"
                onClick={() => allignSelectedBlocks("x")}>
                  Horizontal
                </button>
                <button
                   data-testid = "test_allign_blocks_btn_y"
                onClick={() => allignSelectedBlocks("y")}>
                  Vertical
                </button>
              </div>
            </section>

            <section>
              <header>Actions</header>
              <div className={s.btn_wrapper}>
                <button
                data-testid = "test_delete_blocks_group_btn"
                 onClick={deleteMultupleBlocks}>Delete</button>
                <button>New Group</button>
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </div> : null}
     </>

  );
}

export default BlocksWidget;
