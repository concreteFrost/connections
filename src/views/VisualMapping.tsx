import Header from "components/VisualMapping/Header/Header";
import VisualTree from "components/VisualMapping/Tree/VisualTree";
import s from "./style/VisualMapping.module.scss";
import { useFileUpload } from "hooks/useFileUpload";

export default function VisualMapping() {
  const input = useFileUpload();
  const output = useFileUpload();

  return (
    <div className={s.wrapper}>
      <div className={s.navbar}>
        <Header></Header>
      </div>

      <div className={s.content}>
        <div className={s.column}>
          <input
            type="file"
            accept=".json,.xml"
            onChange={input.handleFileChange}
          />
          <VisualTree treeNode={input.data}></VisualTree>
        </div>
        <div className={s.column}>Operations</div>
        <div className={s.column}>
          <input
            type="file"
            accept=".json,.xml"
            onChange={output.handleFileChange}
          />
          <VisualTree treeNode={output.data}></VisualTree>
        </div>
      </div>
    </div>
  );
}

{
  /* <ControlButtons></ControlButtons> */
}
{
  /* <Canvas
        setCanvasInstance={setCanvasInstance}
        canvasWrapper={canvasWrapper}
      ></Canvas>
      <ContextMenu
        canvasInstance={canvasInstance}
        canvasWrapper={canvasWrapper}
      ></ContextMenu> */
}
