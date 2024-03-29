import s from "./LiveFlows.module.scss";
import { useEffect, useState } from "react";
import { getFlowListApi } from "../../../../../api/flow";
import useStore from "../../../../../store/store";
import CreateTemplateFlowModal from "../../../CreateTemplateFlowModal";
import moment from "moment";
import { IFlowConfig } from "../../../../../store/interfaces/Iflow";


function LiveFlows() {

  const [loadedLiveFlows, setLoadedLiveFlows] = useState<Array<IFlowConfig>>([]);
  const toggleCreateTemplateFlowModal = useStore((state) => state.modalWindowsSlice.toggleCreateTemplateFlowModal);
  const setTooltipText = useStore((state) => state.designerVisualElementsSlice.setTooltipText)

  const flowSlice = useStore((state) => state.flowSlice);
  const modalSlice = useStore((state) => state.modalWindowsSlice);

  const saveAndLoadLive = async (flowIdToLoad: string) => {
    flowSlice.createUpdateDraftFromLiveTemplate(flowIdToLoad);
    modalSlice.toggleUpdateFlowModal(false)
    modalSlice.toggleLoadFlowModal(false)

  };

  const loadLiveWithoutSaving = async (flowIdToLoad: string) => {
    flowSlice.createUpdateDraftFromLiveTemplate(flowIdToLoad);
    modalSlice.toggleUpdateFlowModal(false)
    modalSlice.toggleLoadFlowModal(false)
  };

  useEffect(() => {
    getFlowListApi().then((res: any) => {
      const data = res.data;
      setLoadedLiveFlows(res.data)
    }).catch((e) => {
      console.log('error loading live flows', e)
    })
  }, [])

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadedLiveFlows.length > 0 ? loadedLiveFlows.map((loadedFlow: IFlowConfig) => <tr key={loadedFlow.flowId}>
              <td className={s.flow_name}>{loadedFlow.name}</td>
              <td>{loadedFlow.createdBy}</td>
              <td>{moment(loadedFlow.dateCreated).calendar()}</td>
              <td>
                <div className={s.actions_wrapper}>
                  <button className={`${s.action_confirm_btn} tooltip-item`}
                    onMouseEnter={() => setTooltipText('Returns a new draft structure based on a live server flow configuration')}
                    onClick={() => toggleCreateTemplateFlowModal(true, loadedFlow.flowId, loadedFlow.name)}
                  >Template</button>
                  {/*LOAD */}
                  <button className={`${s.action_confirm_btn} tooltip-item`}
                    onMouseEnter={() => setTooltipText('Returns a draft copy structure from a live server flow configuration for updating purposes')}
                    onClick={() => {
                      if (flowSlice.flow.flowIdentifier) {
                        modalSlice.toggleUpdateFlowModal(true);
                        modalSlice.setUpdateFlowModalActions({ save: () => saveAndLoadLive(loadedFlow.flowId), discard: () => loadLiveWithoutSaving(loadedFlow.flowId) })
                      }
                      else {
                        flowSlice.createUpdateDraftFromLiveTemplate(loadedFlow.flowId);
                        modalSlice.toggleLoadFlowModal(false)
                      }

                    }}
                  >Update</button>
                </div>
              </td>
            </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <CreateTemplateFlowModal></CreateTemplateFlowModal>
    </div>

  );
}

export default LiveFlows;
