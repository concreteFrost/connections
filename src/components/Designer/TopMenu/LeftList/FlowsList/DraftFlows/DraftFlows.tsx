import useStore from "../../../../../../store/store";
import { UpdateFlowActions } from "../../../../../Modals/UpdateFlowModal";
import s from "./DrafFlows.module.scss"
import moment from "moment";

interface ILoadedFlow {
  flowId: string;
  draftId: string;
  flowName: string;
  createdBy: string;
  createdOn: string;
}

interface DrafFlowsProps {
  loadedFlowFolders: any;
  sectionToOpen: any;
  currentFolder: any;
  setSectionToOpen: (sections: any) => void;
  setCurrentFolder: (folderName: string) => void;
  handleDraftClick: (flowIdToLoad: string) => void;
  loadDraftFlowList: () => void;
}

function DraftFlows(props: DrafFlowsProps) {

  const deleteDraftFlow = useStore((state) => state.flowSlice.deleteDraftFlow);

  async function deleteDraftAndUpdate(draftId: string) {
    try {
      await deleteDraftFlow(draftId);
      await props.loadDraftFlowList();
    }
    catch (e) {
      console.log(e)
    }
  }
  return (
    <div className={s.wrapper}>
      <header>Drafts</header>
      <ul>
        {Object.entries(props.loadedFlowFolders).length > 0 &&
          props.sectionToOpen.folders === true
          ? Object.entries(props.loadedFlowFolders).map(([key, val]) => (
            <li
              key={key}
              onClick={() => {
                props.setSectionToOpen({ folders: false, flows: true });
                props.setCurrentFolder(key);
              }}
            >
              {key}
            </li>
          ))
          : null}
      </ul>
      {props.sectionToOpen.flows === true ? (
        <table>
          <thead>
            <tr>
              <th colSpan={2}>Name</th>
              <th>Author</th>
              <th>Created</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {props.loadedFlowFolders[props.currentFolder]?.map(
              (flow: ILoadedFlow) => (
                <tr key={flow.draftId}>
                  <td
                    className={s.flow_name}
                    onClick={() => {
                      props.handleDraftClick(flow.draftId);
                    }}
                    colSpan={2}
                  >
                    {flow.flowName}
                  </td>
                  <td>{flow.createdBy}</td>
                  <td>{moment(flow.createdOn).calendar()}</td>
                  <td className={s.actions_wrapper}>
                    <button onClick={() => {
                      deleteDraftAndUpdate(flow.draftId)
                    }}>X</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : null}
      <button
        onClick={() => props.setSectionToOpen({ folders: true, flows: false })}
      >
        Back
      </button>
    </div>
  );
}

export default DraftFlows;
