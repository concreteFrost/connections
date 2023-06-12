import { Handle, NodeProps, Position } from 'react-flow-renderer';
import useStore from '../../../store/store';
import { NumberSetter } from '../../../store/nodeTypes';

export default function NumberSetterNode({ id, data }: NodeProps<NumberSetter>) {

    const setNum = useStore((state) => state.setNum)
    function setNumber(e: any) {
        setNum(id, parseInt(e.target.value))
    }

    return (
        <div style={{ backgroundColor: "#cfe1ff", borderRadius: 10 }}>
            <div style={{ padding: 10 }}>
                <div>
                    <input type="number" value={data.number} onChange={setNumber}></input>
                </div>
            </div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}
