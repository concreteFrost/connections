import { getDraftListApi } from "api/draft";
import s from "./DrafFlows.module.scss";
import { useState, useEffect } from "react";
import { connectionsIcons } from "assets/icons/icons";
import { AxiosResponse } from "axios";
import { DraftFlowsTable } from "./DraftFlowsTable/DraftFlowsTable";

interface ISectionToOpen {
  folders: boolean;
  flows: boolean;
}

const initialSectionState: ISectionToOpen = {
  folders: true,
  flows: false,
};

function DraftFlows() {
  const [loadedFlowFolders, setLoadedFlowFolders] = useState<any>([]);
  const [currentDraftFolder, setCurrentDraftFolder] = useState<string>("");
  const [draftSectionToOpen, setDraftSectionToOpen] =
    useState<ISectionToOpen>(initialSectionState);

  async function loadDraftFlowList() {
    try {
      const res: AxiosResponse = await getDraftListApi();
      if (res.status === 200) setLoadedFlowFolders(res.data.draftFlows);
    } catch (error) {
      console.log("error getting draft flows list");
    }
  }

  useEffect(() => {
    loadDraftFlowList();
  }, []);

  return (
    <div className={s.wrapper}>
      {/*FOLDERS */}
      <header>Drafts</header>
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
                <span>{connectionsIcons.folder}</span> {key}
              </li>
            ))
          : null}
      </ul>
      {/*FLOWS TABLE */}
      <div className={s.table_wrapper}>
        {draftSectionToOpen.flows === true ? (
          <DraftFlowsTable
            loadDraftFlowList={loadDraftFlowList}
            loadedFlowFolders={loadedFlowFolders}
            currentDraftFolder={currentDraftFolder}
          />
        ) : null}
      </div>
      {/*BACK BTN */}
      {draftSectionToOpen.flows == true ? (
        <button
          className={s.footer_btn}
          onClick={() => setDraftSectionToOpen({ folders: true, flows: false })}
        >
          Back
        </button>
      ) : null}
    </div>
  );
}

export default DraftFlows;
