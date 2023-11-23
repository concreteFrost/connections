import s from "./LiveFlows.module.scss";
import { useEffect, useState } from "react";
import { getFlowListApi } from "../../../../../api/flow";
import useStore from "../../../../../store/store";
import CreateTemplateFlowModal from "../../../CreateTemplateFlowModal";

interface IFlowConfig {
  config: string;
  createdBy: string;
  dateCreated: string;
  enabled: boolean;
  fileName: string;
  flowId: string;
  lastUpdateBy: string;
  lastUpdated: string | null;
  name: string;
  processBlockCollection: any; // You might want to replace 'any' with the actual type
  startBlock: string;
  status: number;
  version: string;
}

interface LiveFlowsProps {
  handleLiveFlowClick: (flowId: string) => void;
}

function LiveFlows(props: LiveFlowsProps) {

  const [loadedLiveFlows, setLoadedLiveFlows] = useState<Array<IFlowConfig>>([]);
  const toggleCreateTemplateFlowModal = useStore((state) => state.modalWindowsSlice.toggleCreateTemplateFlowModal);

  useEffect(() => {
    getFlowListApi().then((res: any) => {
      const data = res.data;
      setLoadedLiveFlows(res.data)
      console.log('loaded live flows', loadedLiveFlows)
    }).catch((e) => {
      console.log('error loading live flows', e)
    })
  }, [])

  return (
    <div className={s.wrapper}>
      <header>Live</header>
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
            <td>{loadedFlow.dateCreated}</td>
            <td>
              <div className={s.actions_wrapper}>
                <button className={s.action_confirm_btn}
                  onClick={() => toggleCreateTemplateFlowModal(true, loadedFlow.flowId, loadedFlow.name)}
                >Template</button>
                <button className={s.action_confirm_btn}
                  onClick={() => { props.handleLiveFlowClick(loadedFlow.flowId) }}
                >Update</button>
              </div>
            </td>
          </tr>
          ) : null}
        </tbody>
      </table>
      <CreateTemplateFlowModal></CreateTemplateFlowModal>
    </div>

  );
}

export default LiveFlows;
