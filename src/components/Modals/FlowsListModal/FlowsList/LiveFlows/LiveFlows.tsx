import s from "./LiveFlows.module.scss";
import { useEffect, useState } from "react";
import { getFlowListApi } from "api/flow";
import useStore from "store/store";
import CreateTemplateFlowModal from "components/Modals/CreateTemplateFlowModal";
import moment from "moment";
import { FlowConfig } from "store/interfaces/Iflow";


function LiveFlows() {

  const [loadedLiveFlows, setLoadedLiveFlows] = useState<Array<FlowConfig>>([]);
  const toggleCreateTemplateFlowModal = useStore((state) => state.modalWindowsSlice.toggleCreateTemplateFlowModal);
  const setTooltipText = useStore((state) => state.designerVisualElementsSlice.setTooltipText)

  const flowSlice = useStore((state) => state.flowSlice);
  const modalSlice = useStore((state) => state.modalWindowsSlice);

  const saveAndLoadLive = async (flowIdToLoad: string) => {
    try {
      const res:any =await flowSlice.createUpdateDraftFromLiveTemplate(flowIdToLoad);

      if(res.data.success){
        modalSlice.toggleLoadFlowModal(false)    
      }
    } catch (error) {
      // modalSlice.setModalMessage("Something went wrong");
      modalSlice.toggleMessageModal("Something went wrong");
    }

    modalSlice.toggleUpdateFlowModal(false);
    
  };

  const loadLiveWithoutSaving = async (flowIdToLoad: string) => {

    try {
      const res:any=await flowSlice.createUpdateDraftFromLiveTemplate(flowIdToLoad);

      if(res.data.success){
        modalSlice.toggleLoadFlowModal(false)
      }
    } catch (error) {
      
      // modalSlice.setModalMessage("Something went wrong");
      modalSlice.toggleMessageModal("Something went wrong");
    }

    modalSlice.toggleUpdateFlowModal(false);

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
              <th>Version</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadedLiveFlows.length > 0 ? loadedLiveFlows.map((loadedFlow: FlowConfig) => <tr key={loadedFlow.flowId}>
              <td className={s.flow_name}>{loadedFlow.name}</td>
              <td>{loadedFlow.createdBy}</td>
              <td>{moment(loadedFlow.dateCreated).calendar()}</td>
              <td>{loadedFlow.version}</td>
              <td>
                <div className={s.actions_wrapper}>
                  <button className={`${s.action_confirm_btn} tooltip-item`}
                    onMouseEnter={() => setTooltipText('Returns a new draft structure based on a live server flow configuration')}
                    onClick={() => {
                      setTooltipText("")
                      toggleCreateTemplateFlowModal(true, loadedFlow.flowId, loadedFlow.name)}}
                  >Template</button>
                  {/*LOAD */}
                  <button className={`${s.action_confirm_btn} tooltip-item`}
                    onMouseEnter={() => setTooltipText('Returns a draft copy structure from a live server flow configuration for updating purposes')}
                    onClick={() => {
                      setTooltipText("")
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
