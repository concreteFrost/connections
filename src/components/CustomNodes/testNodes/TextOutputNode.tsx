import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { TextGetter } from '../../../store/nodeTypes';

export default function TextOutputNode({ data }: NodeProps<TextGetter>) {

  return (
    <div style={{ backgroundColor: "red", borderRadius: 10 }}>
      <div style={{ padding: 20 }}>
        <div><p>Output</p></div>
        {data.text}
      </div>
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
