import s from "./FlowsList.module.scss";
import { useEffect, useState } from "react";
import { getFlowListApi } from "../../../../../api/flow";
import useStore from "../../../../../store/store";
import { checkExistingFlowInDataBase } from "../../../../../store/actions/utils/flowUtils";
import { UpdateFlowProps } from "../../../../Modals/UpdateFlowModal";

interface ILoadedFlow {
    flowId: string;
    name: string;
    createdBy: string;
    dateCreated: string;
}

interface FlowListProps {
    closeSelecFlowModal: () => void;
    setFunctionsToPass: (functions: UpdateFlowProps) => void;
}

function FlowsList(props: FlowListProps) {

    const flow = useStore((state) => state.flowSlice.flow);
    const updateFlow = useStore((state) => state.flowSlice.updateFlow);
    const saveFlow = useStore((state) => state.flowSlice.saveFlow);
    const loadFlow = useStore((state) => state.flowSlice.loadFlow);
    const toggleUpdateFlowModal = useStore((state) => state.modalWindowsSlice.toggleUpdateFlowModal);
    const [loadedFlows, setLoadedFlows] = useState<Array<ILoadedFlow>>([]);

    function setFlowIDToLoad(id: string) {
        localStorage.setItem('flowIdToLoad', id);
    }

    const handleFlowClick = (flowId: string) => {
        setFlowIDToLoad(flowId);
        props.setFunctionsToPass({ confirm: saveAndLoad, decline: loadWithoutSaving });
        toggleUpdateFlowModal(true);
    }

    async function tryToSaveFlow() {
        try {
            const match = await checkExistingFlowInDataBase(flow.flowName);
            if (match) {
                await updateFlow(match)
            } else {
                await saveFlow();
            }
            await toggleUpdateFlowModal(false);
        } catch (error) {
            console.error('error on trying to save load', error);
        }
    }

    const saveAndLoad = async () => {
        try {
            await tryToSaveFlow();
            await loadFlow(localStorage.getItem('flowIdToLoad')?.toString()!);
            await toggleUpdateFlowModal(false);
        } catch (e) {
            console.log(e);
        }
    }

    const loadWithoutSaving = async () => {
        try {
            await loadFlow(localStorage.getItem('flowIdToLoad')?.toString()!);
            await toggleUpdateFlowModal(false);
        } catch (e) {
            console.log(e);
        }
    }

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
                    {loadedFlows.length > 0 ? loadedFlows.map((flow: ILoadedFlow) => <tr key={flow.flowId}>
                        <td className={s.flow_name}
                            onClick={() => {
                                handleFlowClick(flow.flowId);
                            }}
                        >{flow.name}</td>
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