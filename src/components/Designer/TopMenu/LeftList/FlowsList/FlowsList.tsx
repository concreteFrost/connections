import useStore from "../../../../../store/store";
import s from "./FlowsList.module.scss";


interface ILoadedFlow {
    flowId: string;
    name: string;
    createdBy: string;
    dateCreated: string;
}

interface FlowListProps {
    loadedFlows: any;
    closeSelecFlowModal: () => void;
}

function FlowsList(props: FlowListProps) {

    const loadSelectedFlow = useStore((state) => state.flowSlice.loadFlow);

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
                    {props.loadedFlows.length > 0 ? props.loadedFlows.map((flow: ILoadedFlow) => <tr key={props.loadedFlows.indexOf(flow)}>
                        <td className={s.flow_name} onClick={() => {
                            loadSelectedFlow(flow.flowId)
                            props.closeSelecFlowModal()
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