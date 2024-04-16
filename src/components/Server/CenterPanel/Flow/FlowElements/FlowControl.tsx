import { useState } from "react";
import { disableFlowAPI, enableFlowAPI, startFlowAPI, stopFlowAPI } from "../../../../../api/flow";
import { IFlowData } from "../../../../../store/interfaces/Iflow";
import useStore from "../../../../../store/store"

interface FlowControlProps {
    className: any
}

function FlowControl(props: FlowControlProps) {

    const currentFlow = useStore((state) => state.serverSlice.currentFlow) as IFlowData;
    const toggleFlowControlState = useStore((state) => state.serverSlice.toggleFlowControlState);
    const { setModalMessage, toggleMessageModal } = useStore((state) => state.modalWindowsSlice);

    const [canStartFlow, setCanStartFlow] = useState<boolean>(true);

    async function enableFlow() {
        await enableFlowAPI(currentFlow.flowIdentifier).then((res) => {
            console.log("enable flow res", res)
            toggleFlowControlState(true);
        }).catch((e) => { console.log(e) })
    }

    async function disableFlow() {
        await disableFlowAPI(currentFlow.flowIdentifier).then((res) => {
            console.log('disable flow res', res)
            toggleFlowControlState(false)
        }).catch((e) => {
            console.log(e)
        })
    }

    async function startFlow() {
        setCanStartFlow(false);
        await startFlowAPI(currentFlow.flowIdentifier).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })


    }

    async function stopFlow() {
        setCanStartFlow(true);
        try {
            const res = await stopFlowAPI(currentFlow.flowIdentifier);
            console.log('result of stoping flow', res)
        } catch (error) {
            console.log('error stopping flow', error);
        }
    }


    function defineAction(e: any) {
        const action = e.target.value;
        action === "enabled" ? enableFlow() : disableFlow();
    }
    return (<div className={props.className.flow_control}>
        <header>Flow Control</header>
        <div className={props.className.start_stop_wrapper}>
            {currentFlow.isEnabled ? <>

                {canStartFlow ? <button onClick={startFlow}>START</button> : <button onClick={stopFlow}>STOP</button>}    </> : null}
        </div>
        <select onChange={(e) => { defineAction(e) }} value={currentFlow.isEnabled ? 'enabled' : 'disabled'}>
            <option value="disabled" >Disabled</option>
            <option value="enabled" >Enabled</option>
        </select>
    </div>)
}

export default FlowControl;