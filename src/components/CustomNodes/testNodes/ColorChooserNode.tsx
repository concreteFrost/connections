import { Handle, NodeProps, Position } from 'react-flow-renderer';
import useStore from '../../../store/store';
import { ColorSetter } from '../../../store/nodeTypes';

export default function ColorChooserNode({ id, data }: NodeProps<ColorSetter>) {
  const updateNodeColor = useStore((state) => state.updateNodeColor);
  const edg = useStore(state => state.edges)

  const handleColorChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    edg.forEach(e => {
      if (e.source === id) {
        updateNodeColor(e.target, evt.target.value)
      }
    })
  };

  return (
    <div style={{ backgroundColor: '#4287f5', borderRadius: 10 }}>
      <div style={{ padding: 20 }}>
        <input
          type="color"
          defaultValue={data.color}
          onChange={handleColorChange}
          className="nodrag"
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
