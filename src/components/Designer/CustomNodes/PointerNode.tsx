import { NodeProps } from 'react-flow-renderer';
import BaseNode from './BaseNode';
import { memo } from 'react';
function PointerNode(props: NodeProps) {
    return (
        <BaseNode {...props}>
        </BaseNode>
    );
}

export default memo(PointerNode);
