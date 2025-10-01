import Header from "components/VisualMapping/Header/Header";
import VisualTree from "components/VisualMapping/Tree/VisualTree";
import s from "./style/VisualMapping.module.scss";
import { convertXSDToTreeNode } from "utils/visualMapping/fileToTree";
import OperationsTable from "components/VisualMapping/Tree/OperationsTable/OperationsTable";
import { generateStructureFromSample } from "api/mapping";
import { useState } from "react";
import { TreeNode } from "store/interfaces/IVisualMapping";
import useStore from "store/store";
import { TreeType } from "store/enums/enums";

export default function VisualMapping() {
  const [input, setInput] = useState<TreeNode | null>(null);
  const [output, setOutput] = useState<TreeNode | null>(null);

  const { toggleMessageModal } = useStore((state) => state.modalWindowsSlice);
  const { setIsLoading } = useStore((state) => state.loaderSlice);
  const { clearRowsByType } = useStore((state) => state.visualMappingSlice);

  async function handleFileUpload(file: File, type: TreeType) {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("sampleDocument", file); //'sampleDocument' is a property that is expected

    try {
      const res = await generateStructureFromSample(file);

      //show error modal if there was a message
      if (res.data.message.length > 0) toggleMessageModal(res.data.message);

      const converted = convertXSDToTreeNode(res.data.xsdContent);

      type === "input" ? setInput(converted) : setOutput(converted);

      clearRowsByType(type);
    } catch (error) {
      console.log("error occured", error);
    } finally {
      setIsLoading(false);
    }
  }

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
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileUpload(e.target.files[0], TreeType.Input);
              }
            }}
          />
          {input && (
            <VisualTree treeNode={input} type={TreeType.Input}></VisualTree>
          )}
        </div>
        <div className={s.column}>
          <OperationsTable></OperationsTable>
        </div>
        <div className={s.column}>
          <input
            type="file"
            accept=".json,.xml"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileUpload(e.target.files[0], TreeType.Output);
              }
            }}
          />
          {output && (
            <VisualTree treeNode={output} type={TreeType.Output}></VisualTree>
          )}
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
