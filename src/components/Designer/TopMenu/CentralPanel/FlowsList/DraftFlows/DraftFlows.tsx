import useStore from "../../../../../../store/store";
import { UpdateFlowActions } from "../../../../../Modals/UpdateFlowModal";
import { getDraftListApi } from "../../../../../../api/draft";
import s from "./DrafFlows.module.scss";
import { useState, useEffect } from "react";
import moment from "moment";

interface ILoadedFlow {
  flowId: string;
  draftId: string;
  flowName: string;
  createdBy: string;
  createdOn: string;
}

interface ISectionToOpen {
  folders: boolean;
  flows: boolean;
}

interface DrafFlowsProps {
  handleDraftClick: (flowIdToLoad: string) => void;
}

function DraftFlows(props: DrafFlowsProps) {

  const deleteDraftFlow = useStore((state) => state.flowSlice.deleteDraftFlow);
  const [loadedFlowFolders, setLoadedFlowFolders] = useState<any>([]);
  const [currentDraftFolder, setCurrentDraftFolder] = useState<string>("");
  const [draftSectionToOpen, setDraftSectionToOpen] = useState<ISectionToOpen>({
    folders: true,
    flows: false,
  });

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

  async function deleteDraftAndUpdate(draftId: string) {
    try {
      await deleteDraftFlow(draftId);
      await loadDraftFlowList();
    }
    catch (e) {
      console.log(e)
    }
  }
  return (
    <div className={s.wrapper}>
      <header>Drafts</header>
      {/*FLOWS TABLE */}
      {draftSectionToOpen.flows === true ? (
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
            {loadedFlowFolders[currentDraftFolder]?.map(
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
      {/*FOLDERS */}
      <ul>
        {Object.entries(loadedFlowFolders).length > 0 &&
          draftSectionToOpen.folders === true
          ? Object.entries(loadedFlowFolders).map(([key, val]) => (
            <li
              key={key}
              onClick={() => {
                setDraftSectionToOpen({ folders: false, flows: true });
                setCurrentDraftFolder(key);
              }}
            >
              {key}
            </li>
          ))
          : null}
      </ul>
      <button
        onClick={() => setDraftSectionToOpen({ folders: true, flows: false })}
      >
        Back
      </button>
    </div>
  );
}

export default DraftFlows;
