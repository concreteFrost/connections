import { disableFlowAPI, enableFlowAPI } from "../../../../../api/flow";
import { IFlowData } from "../../../../../store/interfaces/Iflow";
import useStore from "../../../../../store/store"

interface FlowControlProps {
    className: any
}

function FlowControl(props: FlowControlProps) {

    const currentFlow = useStore((state) => state.serverSlice.currentFlow) as IFlowData;
    const toggleFlowControlState = useStore((state) => state.serverSlice.toggleFlowControlState);

    function enableFlow() {
        enableFlowAPI(currentFlow.flowIdentifier).then((res) => {
            console.log(res)
            toggleFlowControlState(true);
        }).catch((e) => { console.log(e) })
    }

    function disableFlow() {
        disableFlowAPI(currentFlow.flowIdentifier).then((res) => {
            console.log(res)
            toggleFlowControlState(false)
        }).catch((e) => {
            console.log(e)
        })
    }

    function defineAction(e: any) {
        const action = e.target.value;
        action === "enabled" ? enableFlow() : disableFlow();
    }

    console.log(currentFlow)
    return (<div className={props.className.flow_control}>
        <header>Flow Control</header>
        <select onChange={(e) => { defineAction(e) }} value={currentFlow.isEnabled ? 'enabled' : 'disabled'}>
            <option value="disabled" >Disabled</option>
            <option value="enabled" >Enabled</option>
        </select>
    </div>)
}

export default FlowControl;