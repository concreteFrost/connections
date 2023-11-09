import useStore from "../../../../../store/store";
import s from "./FlowsList.module.scss";
import { useEffect, useState } from "react";
import { getFlowListApi } from "../../../../../api/flow";
import { UpdateFlowProcedures } from "../../../../Modals/UpdateFlowModal";
import UpdateFlowModal from "../../../../Modals/UpdateFlowModal";
import { flow } from "../../../../../testFlow/testFlow2";

interface ILoadedFlow {
    flowId: string;
    name: string;
    createdBy: string;
    dateCreated: string;
}

interface FlowListProps {
    closeSelecFlowModal: () => void;
}

function FlowsList(props: FlowListProps) {

    const toggleUpdateFlowModal = useStore((state) => state.modalWindowsSlice.toggleUpdateFlowModal)
    const [loadedFlows, setLoadedFlows] = useState<Array<ILoadedFlow>>([]);
    const [flowToLoad, setFlowToLoad] = useState<string>('');

    useEffect(() => {
        getFlowListApi().then((res: any) => {
            setLoadedFlows(res.data)
        }).catch((e) => {
            console.log(e)
        })
    }, [])

    return (<div className={s.container}>
        <div className={s.header}>
            <h3>Select Flow</h3>
        </div>
        <div className={s.body}>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {loadedFlows.length > 0 ? loadedFlows.map((flow: ILoadedFlow) => <tr key={loadedFlows.indexOf(flow)}>
                        <td className={s.flow_name} onClick={() => {
                            toggleUpdateFlowModal(true);
                            setFlowToLoad(flow.flowId)
                        }}>{flow.name}</td>
                        <td>{flow.createdBy}</td>
                        <td>{flow.dateCreated}</td>
                    </tr>) : null}
                </tbody>

            </table>
        </div>
        <div className={s.footer}><button onClick={props.closeSelecFlowModal}>Close</button></div>
        <UpdateFlowModal currentProcedure={UpdateFlowProcedures.Load} flowToLoadID={flowToLoad}></UpdateFlowModal>
    </div>)
}

export default FlowsList;