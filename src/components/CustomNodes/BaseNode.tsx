import { Handle, NodeProps, Position } from 'react-flow-renderer';
import s from "./BaseNode.module.scss"
import useStore from '../../store/store';

export default function BaseNode(props: any) {

    const selectedNodeId = useStore(state => state.setSelectedNodeID);
    const getNodeData = useStore(state => state.getNodeBase);

    function _setSelectedNodeID() {
        selectedNodeId(props.id);
        getNodeData(props.data);
    }

    return (
        <div onClick={_setSelectedNodeID} className={s.node_body} style={{ backgroundColor: props.data.color }}>
            <div className={s.node_icon_container}>
                <div className={s.node_icon}>{props.icon}</div>
            </div>
            <div className={s.node_title}>{props.data.title}</div>
            {props.children}
        </div>
    );
}
