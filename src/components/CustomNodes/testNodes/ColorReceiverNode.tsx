import { Handle, NodeProps, Position } from 'react-flow-renderer';

export default function ColorReceiverNode({ data }: NodeProps) {

  return (
    <div style={{ backgroundColor: data.color, borderRadius: 10 }}>
      <Handle type="target" position={Position.Top} />
      <div style={{ padding: 5 }}>
        <p>Color Receiver</p>
      </div>

    </div>
  );
}
