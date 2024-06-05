import { NodeProps } from 'react-flow-renderer';
import BaseNode from './BaseNode';
import { memo } from 'react';
function PointerNode({ id, data }: NodeProps) {
    return (
        <BaseNode id={id} data={data} icon={data.icon} >
        </BaseNode>
    );
}

export default memo(PointerNode);
