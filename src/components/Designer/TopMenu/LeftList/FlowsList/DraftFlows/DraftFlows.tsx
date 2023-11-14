import s from "./DrafFlows.module.scss"
import moment from "moment";

interface ILoadedFlow {
  flowId: string;
  flowName: string;
  createdBy: string;
  createdOn: string;
}

interface DrafFlowsProps {
  loadedFlowFolders: any;
  sectionToOpen: any;
  currentFolder: any;
  handleDraftFlowClick: (flowId: string) => void;
  setSectionToOpen: (sections: any) => void;
  setCurrentFolder: (folderName: string) => void;
}

function DraftFlows(props: DrafFlowsProps) {
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
              <th>Name</th>
              <th>Author</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {props.loadedFlowFolders[props.currentFolder]?.map(
              (flow: any) => (
                <tr key={flow.draftId}>
                  <td
                  className={s.flow_name}
                    onClick={() => {
                      props.handleDraftFlowClick(flow.draftId);
                    }}
                  >
                    {flow.flowName}
                  </td>
                  <td>{flow.createdBy}</td>
                  <td>{moment(flow.createdOn).calendar() }</td>
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
