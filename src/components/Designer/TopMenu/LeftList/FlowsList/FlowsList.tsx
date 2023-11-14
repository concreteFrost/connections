import s from "./FlowsList.module.scss";
import { useEffect, useState } from "react";
import { getFlowListApi } from "../../../../../api/flow";
import useStore from "../../../../../store/store";
import { checkExistingFlowInDataBase } from "../../../../../store/actions/utils/flowUtils";
import { UpdateFlowProps } from "../../../../Modals/UpdateFlowModal";
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
  setFunctionsToPass: (functions: UpdateFlowProps) => void;
  saveAndLoad:()=>void;
  loadWithoutSaving:()=>void;
  toggleUpdateFlowModal:(isVisible:boolean)=>void;
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
    

  function setFlowIDToLoad(id: string) {
    localStorage.setItem("flowIdToLoad", id);
  }

  const handleDraftFlowClick = (flowId: string) => {
    setFlowIDToLoad(flowId);
    props.setFunctionsToPass({
      confirm: props.saveAndLoad,
      decline: props.loadWithoutSaving,
    });
    props.closeSelecFlowModal();
    props.toggleUpdateFlowModal(true);
  };


  useEffect(() => {
    getDraftListApi()
      .then((res: any) => {
        setLoadedFlowFolders(res.data.draftFlows);
      })
      .catch((e) => {
        console.log(e);
      });
      
  }, []);


  return (
    <div className={s.container}>
      <div className={s.header}>
        <h3>Select Flow</h3>
      </div>
      <div className={s.body}>
        <div className={s.grid_element}> 
        <DraftFlows
        loadedFlowFolders={loadedFlowFolders}
        sectionToOpen={draftSectionToOpen}
        currentFolder={currentDraftFolder}
        handleDraftFlowClick={handleDraftFlowClick}
        setSectionToOpen={setDraftSectionToOpen}
        setCurrentFolder={setCurrentDraftFolder}
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
