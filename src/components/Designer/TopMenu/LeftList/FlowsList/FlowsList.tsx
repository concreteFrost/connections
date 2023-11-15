import s from "./FlowsList.module.scss";
import { useEffect, useState } from "react";
import { UpdateFlowActions, UpdateFlowProps } from "../../../../Modals/UpdateFlowModal";
import { getDraftListApi } from "../../../../../api/draft";
import DraftFlows from "./DraftFlows/DraftFlows";
import LiveFlows from "./LiveFlows/LiveFlows";

interface ILoadedFlow {
  flowId: string;
  flowName: string;
  createdBy: string;
  createdOn: string;
}

interface FlowListProps {
  closeSelecFlowModal: () => void;
  toggleUpdateFlowModal: (isVisible: boolean) => void;
  setCurrentActions: (actions: UpdateFlowActions) => void;
  setFlowIdToLoad: (flowId: string) => void;
}

interface ISectionToOpen {
  folders: boolean;
  flows: boolean;
}

function FlowsList(props: FlowListProps) {

  const [currentDraftFolder, setCurrentDraftFolder] = useState<string>("");
  const [loadedFlowFolders, setLoadedFlowFolders] = useState<Array<any>>([]);
  const [draftSectionToOpen, setDraftSectionToOpen] = useState<ISectionToOpen>({
    folders: true,
    flows: false,
  });
  const [liveSectionToOpen, setLiveSectionToOpen] = useState<ISectionToOpen>({
    folders: true,
    flows: false,
  });

  function handleDraftClick(flowIdToLoad: string) {
    props.toggleUpdateFlowModal(true);
    props.setFlowIdToLoad(flowIdToLoad);
    props.setCurrentActions(UpdateFlowActions.Load);
  }

  function loadDraftFlowList() {
    getDraftListApi()
      .then((res: any) => {
        setLoadedFlowFolders(res.data.draftFlows);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    loadDraftFlowList();
  }, []);

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h3>Select Flow</h3>
      </div>
      <div className={s.body}>
        <div className={s.grid_element}>
          <DraftFlows
            loadDraftFlowList={loadDraftFlowList}
            loadedFlowFolders={loadedFlowFolders}
            sectionToOpen={draftSectionToOpen}
            currentFolder={currentDraftFolder}
            setSectionToOpen={setDraftSectionToOpen}
            setCurrentFolder={setCurrentDraftFolder}
            handleDraftClick={handleDraftClick}
          />
        </div>
        <div className={s.grid_element}>
          <LiveFlows
            sectionToOpen={liveSectionToOpen}
            setSectionToOpen={setLiveSectionToOpen}
          /></div>
      </div>
      <div className={s.footer}>

        <button onClick={props.closeSelecFlowModal}>Close</button>
      </div>
    </div>
  );
}

export default FlowsList;
