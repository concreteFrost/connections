import useStore from "../../../../../store/store";
import s from "./FlowsList.module.scss";
import { useEffect, useState } from "react";
import { getFlowListApi } from "../../../../../api/flow";
import { UpdateFlowProcedures } from "../../../../Modals/UpdateFlowModal";

interface ILoadedFlow {
    flowId: string;
    name: string;
    createdBy: string;
    dateCreated: string;
}

interface FlowListProps {
    closeSelecFlowModal: () => void;
    setFlowToLoad: (flowID: string) => void;
    defineUpdateFlowProcedure: (procedure: UpdateFlowProcedures) => void;
}

function FlowsList(props: FlowListProps) {

    const [loadedFlows, setLoadedFlows] = useState<Array<ILoadedFlow>>([]);

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
                            props.setFlowToLoad(flow.flowId);
                            props.defineUpdateFlowProcedure(UpdateFlowProcedures.Load)
                        }}>{flow.name}</td>
                        <td>{flow.createdBy}</td>
                        <td>{flow.dateCreated}</td>
                    </tr>) : null}
                </tbody>

            </table>
        </div>
        <div className={s.footer}><button onClick={props.closeSelecFlowModal}>Close</button></div>
    </div>)
}

export default FlowsList;