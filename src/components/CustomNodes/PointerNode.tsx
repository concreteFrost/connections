import { Handle, NodeProps, Position } from 'react-flow-renderer';
import BaseNode from './BaseNode';
import { FaMousePointer } from 'react-icons/fa';

export default function PointerNode({ id, data }: NodeProps) {

    return (
        <BaseNode id={id} data={data} icon={<FaMousePointer></FaMousePointer>} >
            <Handle type="source" position={Position.Right} />
        </BaseNode>
    );
}
