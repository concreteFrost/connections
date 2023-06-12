import { Handle, NodeProps, Position } from 'react-flow-renderer';
import useStore from '../../../store/store';
import { TextSetter } from '../../../store/nodeTypes';

export default function ToUpperCaseNode({ id, data }: NodeProps<TextSetter>) {
  const updateNodeText = useStore((state) => state.updateNodeText);
  const edg = useStore(state => state.edges)

  const handleTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    edg.forEach(e => {
      if (e.source === id) {
        data.subType === "upperCase" ? updateNodeText(e.target, evt.target.value.toUpperCase()) :
          updateNodeText(e.target, evt.target.value.toLowerCase())
      }
    })
  };

  return (
    <div style={{ backgroundColor: "#cfe1ff", borderRadius: 10 }}>
      <div style={{ padding: 10 }}>
        <div>
          {data.subType === "upperCase" ? <p>UpperCase transform</p> : <p>LowerCase transform</p>}
        </div>
        <div>
          <input
            type="text"
            defaultValue={data.text}
            onChange={handleTextChange}
            className="nodrag"
          />
        </div>

      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
