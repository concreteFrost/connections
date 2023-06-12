import { Handle, NodeProps, Position, Node } from 'react-flow-renderer';
import useStore from '../../../store/store';
import { MathOperation } from '../../../store/nodeTypes';


export default function MathOperationNode({ id, data }: NodeProps<MathOperation>) {
    const setMathOperationType = useStore((state) => state.setMathOperationType);
    const mathOperation = useStore((state) => state.mathOperation);
    const nodes = useStore((state) => state.nodes)

    const edg = useStore(state => state.edges)

    const performMath = (evt: any) => {
        let res: any = []
        edg.forEach(e => {

            if (e.target === id) {
                const matchNode = nodes.find((x: Node) => x.id === e.source)!
                res.push(matchNode.data.number)
            }
        })

        console.log(res)
        const matchNode = nodes.find((x: Node) => x.id === id)!;
        matchNode.data.numbers = res
        mathOperation(id)
    };


    function handleChange(e: any): void {
        setMathOperationType(e.target.id, id);
    }

    return (
        <div style={{ backgroundColor: "#cfe1ff", borderRadius: 10 }} onClick={() => { console.log(id, data) }}>
            <div style={{ padding: 10 }}>
                <div>
                    <h3>Operation Type</h3>
                    <div style={{ display: 'inline-block' }}>
                        <div>
                            <label htmlFor="addition">Addition</label>
                            <input type="radio" name="addition" id="addition" checked={data.operationType === 'addition'} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="subtraction">Subtraction</label>
                            <input type="radio" name="subtraction" id="subtraction" checked={data.operationType === 'subtraction'} onChange={handleChange} />
                        </div>
                    </div>

                </div>
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <button onClick={performMath}>Calculate</button>
                </div>
                <div>
                    {data.number}
                </div>
            </div>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}
