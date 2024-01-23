import s from "./FlowBlock.module.scss"
import { getFlowListApi } from "../../../../../../api/flow";
import { getBlocks } from "../../../../../../api/data";
import { useState, useEffect } from "react";
import { IFlowConfig } from "../../../../../../store/interfaces/Iflow";
import { IBlockData } from "../../../../../../store/interfaces/IBlock";

interface FlowBlockProps {
    setFlowId: (value: string) => void;
    setBlockId: (value: string) => void;
    setStatus: (value: number) => void;
    setType: (value: number) => void;
    flowId: string | undefined;
    blockId: string | undefined;
    type: number | undefined;
    status: number | undefined;
}

function FlowBlock(props: FlowBlockProps) {

    const [loadedLiveFlows, setLoadedLiveFlows] = useState<Array<IFlowConfig>>([]);
    const [loadedBlocks, setLoadedBlocks] = useState<Array<IBlockData>>([]);

    async function getFlowList() {
        try {
            const res: any = await getFlowListApi();
            const data = res.data;
            setLoadedLiveFlows(data);
        }
        catch (e) {
            console.log(e)
        }
    }

    async function getBlockList() {
        try {
            const res: any = await getBlocks();
            setLoadedBlocks(res);

            await loadedBlocks.forEach((block:IBlockData)=>{
                console.log('blockl',block)
            })
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
                {loadedLiveFlows.length > 0 ? loadedLiveFlows.map((flow: IFlowConfig) => <option key={loadedLiveFlows.indexOf(flow)} value={flow.flowId}>{flow.name}</option>) : null}
            </select>
            <select value={props.blockId} onChange={(e:any)=>props.setBlockId(e.target.value)}>
                <option value={''}>All Blocks</option>
                {loadedBlocks.length > 0 ? loadedBlocks.map((block: IBlockData) => <option key={loadedBlocks.indexOf(block)} value={block.blockIdentifier}>{block.name}</option>) : null}
            </select>
            <select value={props.type} onChange={(e:any)=>props.setType(e.target.value)}>
                <option value={''}>All Types</option>
                <option value={0}>System</option>
                <option value={1}>Infortmation</option>
                <option value={1}>Debug</option>
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
