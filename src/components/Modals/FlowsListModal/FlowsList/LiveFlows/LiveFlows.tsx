import s from "./LiveFlows.module.scss";
import { useEffect, useState } from "react";
import { getFlowListApi } from "api/flow";
import useStore from "store/store";
import CreateTemplateFlowModal from "components/Modals/Designer/CreateTemplateFlowModal";
import moment from "moment";
import { FlowConfig } from "shared/interfaces/Iflow";
import { createUpdateDraftFromLiveAPI } from "api/draft";

function LiveFlows() {
  const [loadedLiveFlows, setLoadedLiveFlows] = useState<Array<FlowConfig>>([]);
  const setTooltipText = useStore(
    (state) => state.designerVisualElementsSlice.setTooltipText
  );
  const { createUpdateDraftFromLiveTemplate, addFlowToTabs } = useStore(
    (state) => state.flowSlice
  );
  const {
    toggleLoadFlowModal,
    toggleMessageModal,
    toggleCreateTemplateFlowModal,
  } = useStore((state) => state.modalWindowsSlice);

  async function handleCreateUpdate(loadedFlow: FlowConfig) {
    try {
      const res: any = await createUpdateDraftFromLiveAPI(loadedFlow.flowId);
      if (res.data.success) {
        createUpdateDraftFromLiveTemplate(res.data.flowConfiguration);
        addFlowToTabs(res.data.flowConfiguration);
        toggleLoadFlowModal(false);
      }
    } catch (error) {
      toggleMessageModal("something went wrong");
    }
  }

  useEffect(() => {
    const fetchFlowList = async () => {
      try {
        const res: any = await getFlowListApi();
        setLoadedLiveFlows(res.data);
      } catch (error) {
        console.log("error loading live flows", error);
      }
    };

    fetchFlowList();
  }, []);

  return (
    <div className={s.wrapper}>
      <header>Live</header>
      <div className={s.table_wrapper}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Created</th>
              <th>Version</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadedLiveFlows.length > 0
              ? loadedLiveFlows.map((loadedFlow: FlowConfig) => (
                  <tr key={loadedFlow.flowId}>
                    <td className={s.flow_name}>{loadedFlow.name}</td>
                    <td>{loadedFlow.createdBy}</td>
                    <td>{moment(loadedFlow.dateCreated).calendar()}</td>
                    <td>{loadedFlow.version}</td>
                    <td>
                      <div className={s.actions_wrapper}>
                        <button
                          className={`${s.action_confirm_btn} tooltip-item`}
                          onMouseEnter={() =>
                            setTooltipText(
                              "Returns a new draft structure based on a live server flow configuration"
                            )
                          }
                          onClick={() => {
                            toggleCreateTemplateFlowModal(
                              true,
                              loadedFlow.flowId,
                              loadedFlow.name
                            );
                          }}
                        >
                          Template
                        </button>
                        {/*LOAD */}
                        <button
                          className={`${s.action_confirm_btn} tooltip-item`}
                          onMouseEnter={() =>
                            setTooltipText(
                              "Returns a draft copy structure from a live server flow configuration for updating purposes"
                            )
                          }
                          onClick={() => handleCreateUpdate(loadedFlow)}
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>

      <CreateTemplateFlowModal></CreateTemplateFlowModal>
    </div>
  );
}

export default LiveFlows;
