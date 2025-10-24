import Header from "components/VisualMapping/Header/Header";
import VisualTree from "components/VisualMapping/Tree/VisualTree";
import s from "./style/VisualMapping.module.scss";
import { convertXSDToTreeNode } from "utils/visualMapping/fileToTree";
import OperationsTable from "components/VisualMapping/Tree/OperationsTable/OperationsTable";
import { generateStructureFromSample } from "api/mapping";
import { useMemo } from "react";
import useStore from "store/store";
import { IconVariants, TreeType } from "shared/enums/enums";
import ContextMenu from "components/VisualMapping/ContextMenu/ContextMenu";
import MapListModal from "components/Modals/VisualMapping/MapListModal/MapListModal";
import OverwriteMappingModal from "components/Modals/VisualMapping/OverwriteMappingModal/OverwriteMappingModal";
import MonacoEditor from "components/MonacoEditor/MonacoEditor";

export default function VisualMapping() {
  const { toggleMessageModal } = useStore((state) => state.modalWindowsSlice);
  const { setIsLoading } = useStore((state) => state.loaderSlice);

  const { mappingState, clearRowsByType, setXsdContent } = useStore(
    (state) => state.visualMappingSlice
  );

  // Преобразуем XSD в дерево только если есть контент
  const inputTree = useMemo(() => {
    return mappingState.inputXsdContent?.content
      ? convertXSDToTreeNode(mappingState.inputXsdContent.content)
      : null;
  }, [mappingState.inputXsdContent]);

  const outputTree = useMemo(() => {
    return mappingState.outputXsdContent?.content
      ? convertXSDToTreeNode(mappingState.outputXsdContent.content)
      : null;
  }, [mappingState.outputXsdContent]);

  async function handleFileUpload(file: File, type: TreeType) {
    setIsLoading(true);

    try {
      const res = await generateStructureFromSample(file);

      // показать модалку с сообщением, если есть
      if (res.data.message.length > 0) toggleMessageModal(res.data.message);

      const schema = res.data.xsd;
      const fieldToUpdate =
        type === TreeType.Input ? "inputXsdContent" : "outputXsdContent";

      // обновляем стор
      setXsdContent(schema, fieldToUpdate);

      // очищаем строки маппинга
      clearRowsByType(type);
    } catch (error) {
      console.error("error occurred", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={s.wrapper}>
      <MapListModal />
      <OverwriteMappingModal />
      <div className={s.navbar}>
        <Header />
      </div>

      <div className={s.content}>
        {/* INPUT COLUMN */}
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
          {inputTree && (
            <VisualTree treeNode={inputTree} type={TreeType.Input} />
          )}
        </div>

        {/* OPERATIONS TABLE */}
        <div className={s.column}>
          <OperationsTable />
        </div>

        {/* OUTPUT COLUMN */}
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
          {outputTree && (
            <VisualTree treeNode={outputTree} type={TreeType.Output} />
          )}
        </div>
      </div>

      <ContextMenu />
      <MonacoEditor themeColor={IconVariants.Dark}></MonacoEditor>
    </div>
  );
}
