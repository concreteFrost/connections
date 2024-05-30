import s from "./FlowBlock.module.scss"
import { getFlowListApi } from "../../../../../../api/flow";
import { getBlockLookupListAPI } from "../../../../../../api/data";
import { useEffect } from "react";
import { FlowConfig } from "../../../../../../store/interfaces/IFlow";
import { BlockLookup } from "../../../../../../store/interfaces/IBlock";

interface FlowBlockProps {
    setFlowId: (value: string) => void;
    setBlockId: (value: string) => void;
    setStatus: (value: number) => void;
    setType: (value: number) => void;
    setLoadedLiveFlows:(data: Array<FlowConfig>)=>void;
    setLoadedBlocks:(data: Array<BlockLookup>)=>void;
    loadedBlocks:Array<BlockLookup>;
    loadedLiveFlows:Array<FlowConfig>;
    flowId: string | undefined;
    blockId: string | undefined;
    type: number | undefined;
    status: number | undefined;
}

function FlowBlock(props: FlowBlockProps) {

    async function getFlowList() {
        try {
            const res: any = await getFlowListApi();
            const data = res.data;
            props.setLoadedLiveFlows(data);
        }
        catch (e) {
            console.log(e)
        }
    }

    async function getBlockList() {
        try {
            const res: any = await getBlockLookupListAPI();
            props.setLoadedBlocks(res.data);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getFlowList();
        getBlockList();
    }, [])

    return (
        <section className={s.wrapper}>
            <header>Flow/Block</header>
            <select value={props.flowId} onChange={(e:any)=>props.setFlowId(e.target.value)}>
                <option value={''}>All Flows</option>
                {props.loadedLiveFlows.length > 0 ? props.loadedLiveFlows.map((flow: FlowConfig) => <option key={props.loadedLiveFlows.indexOf(flow)} value={flow.flowId}>{flow.name}</option>) : null}
            </select>
            <select value={props.blockId} onChange={(e:any)=>props.setBlockId(e.target.value)}>
                <option value={''}>All Blocks</option>
                {props.loadedBlocks.length > 0 ? props.loadedBlocks.map((block: BlockLookup) => <option key={props.loadedBlocks.indexOf(block)} value={block.blockId}>{block.name}</option>) : null}
            </select>
            <select value={props.type} onChange={(e:any)=>props.setType(e.target.value)}>
                <option value={''}>All Types</option>
                <option value={0}>System</option>
                <option value={1}>Information</option>
                <option value={2}>Debug</option>
            </select>
            <select value={props.status} onChange={(e:any)=>props.setStatus(e.target.value)}>
                <option value={''}>Any Status</option>
                <option value={0}>Ok</option>
                <option value={1}>Warning</option>
                <option value={2}>Error</option>
                <option value={3}>Fatal Error</option>
            </select>
        </section >
    );
}

export default FlowBlock;
