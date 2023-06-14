import { Handle, NodeProps, Position } from 'react-flow-renderer';
import BaseNode from './BaseNode';

export default function PointerNode({ id, data }: NodeProps) {

    return (
        <BaseNode id={id} data={data} icon={data.icon} >
            <Handle type="source" position={Position.Right} />
        </BaseNode>
    );
}
